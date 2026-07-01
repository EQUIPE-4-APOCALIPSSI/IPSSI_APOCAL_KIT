"""Tests pédagogiques pour l'app accounts.

Ces tests servent d'exemples : signup, login, logout, accès protégé.
Lancez : pytest accounts/
"""

import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


@pytest.fixture
def client() -> APIClient:
    return APIClient()


@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(
        username="alice", email="alice@test.com", password="motdepasse123"
    )


def test_signup_creates_user(client):
    # Lot 3 : inscription par EMAIL (username = email en interne).
    response = client.post(
        "/api/accounts/signup/",
        {
            "email": "bob@test.com",
            "password": "motdepasse123",
        },
        format="json",
    )
    assert response.status_code == 201, response.data
    assert User.objects.filter(email="bob@test.com").exists()


def test_signup_requires_email(client):
    response = client.post(
        "/api/accounts/signup/",
        {"password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 400


def test_login_returns_token(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 200, response.data
    assert "token" in response.data
    assert response.data["user"]["email"] == "alice@test.com"


def test_login_with_wrong_password(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "wrong"},
        format="json",
    )
    assert response.status_code == 400


def test_me_requires_auth(client):
    response = client.get("/api/accounts/me/")
    assert response.status_code in (401, 403)


def test_me_with_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/")
    assert response.status_code == 200
    assert response.data["username"] == "alice"


def test_logout_invalidates_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.post("/api/accounts/logout/")
    assert response.status_code == 204
    # Le token n'existe plus
    assert not Token.objects.filter(key=token.key).exists()


# ---------------------------------------------------------------------------
# Export RGPD (US-15) — Droit d'accès Art. 15
# ---------------------------------------------------------------------------
def test_export_data_requires_auth(client):
    response = client.get("/api/accounts/me/export/")
    assert response.status_code in (401, 403)


def test_export_data_returns_zip(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")
    assert response.status_code == 200
    assert response["Content-Type"] == "application/zip"
    assert "edututor-export" in response["Content-Disposition"]


def test_export_data_zip_contains_expected_files(client, user):
    import io
    import json
    import zipfile

    from rest_framework.authtoken.models import Token

    from quizzes.models import Question, Quiz

    quiz = Quiz.objects.create(user=user, title="Test", source_text="Cours de test")
    for i in range(1, 11):
        Question.objects.create(
            quiz=quiz, index=i, prompt=f"Q{i}?", options=["A", "B", "C", "D"], correct_index=0
        )

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")

    zip_file = zipfile.ZipFile(io.BytesIO(response.content))
    names = zip_file.namelist()
    assert "user.json" in names
    assert "quizzes.json" in names
    assert "reponses.csv" in names
    assert "audit.json" in names

    quizzes_data = json.loads(zip_file.read("quizzes.json"))
    assert len(quizzes_data) == 1
    assert quizzes_data[0]["title"] == "Test"
    assert len(quizzes_data[0]["questions"]) == 10

    audit = json.loads(zip_file.read("audit.json"))
    assert audit["total_quizzes"] == 1
    assert audit["user_email"] == user.email

    csv_content = zip_file.read("reponses.csv").decode()
    assert "quiz_id,quiz_title" in csv_content
    assert "Test" in csv_content


def test_export_data_does_not_leak_other_users_data(client, user):
    import io
    import json
    import zipfile

    from django.contrib.auth.models import User
    from rest_framework.authtoken.models import Token

    from quizzes.models import Quiz

    other = User.objects.create_user(username="bob", email="bob@test.com")
    Quiz.objects.create(user=other, title="Quiz secret", source_text="Confidentiel")

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/export/")

    zip_file = zipfile.ZipFile(io.BytesIO(response.content))
    quizzes_data = json.loads(zip_file.read("quizzes.json"))
    assert len(quizzes_data) == 0  # pas de fuite
