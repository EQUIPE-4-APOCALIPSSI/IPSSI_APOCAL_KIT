"""
Modèles de l'app accounts.

[Note pédagogique] On garde le modèle User standard de Django (simple et
robuste), et on lui ajoute un Profil 1-pour-1 pour les infos métier qui ne sont
pas dans User — ici `email_verified` (l'utilisateur a-t-il cliqué le lien de
confirmation envoyé par email ?).

Choix d'architecture « email = identifiant » : à l'inscription, on met
username = email (voir SignupSerializer). Le login se fait donc par email, sans
backend d'authentification custom. C'est le compromis le plus simple pour un
kit pédagogique (un vrai produit utiliserait souvent un User personnalisé avec
USERNAME_FIELD = 'email').
"""

from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Informations complémentaires attachées à un utilisateur."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    # Validation "soft" : le compte fonctionne même si l'email n'est pas vérifié,
    # mais un bandeau invite l'utilisateur à cliquer le lien de confirmation.
    email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Profile<{self.user.email or self.user.username}>"


class DataRequest(models.Model):
    """Audit trail des demandes d'accès (SAR — Subject Access Request).

    Enregistre chaque export RGPD demandé par un utilisateur, avec son statut
    et le hash du fichier exporté, pour constituer la piste d'audit exigée
    par le RGPD (Art. 5.2 — Accountability).
    """

    class Status(models.TextChoices):
        RECEIVED = "received", "Reçue"
        IN_PROGRESS = "in_progress", "En cours"
        RESPONDED = "responded", "Répondue"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="data_requests",
        help_text="Utilisateur ayant fait la demande.",
    )
    requested_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Date et heure de la demande.",
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.RECEIVED,
        help_text="Statut de la demande.",
    )
    responded_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Date de réponse (export envoyé).",
    )
    exported_file_hash = models.CharField(
        max_length=64,
        blank=True,
        default="",
        help_text="SHA-256 du fichier ZIP exporté (intégrité).",
    )

    class Meta:
        ordering = ["-requested_at"]
        verbose_name = "Demande d'accès (SAR)"
        verbose_name_plural = "Demandes d'accès (SAR)"

    def __str__(self) -> str:
        return f"SAR<{self.user.email if self.user else '?'}> — {self.status}"


def get_or_create_profile(user) -> Profile:
    """Récupère (ou crée) le profil d'un utilisateur.

    Pratique pour les comptes créés AVANT l'ajout du modèle Profile (ils n'ont
    pas encore de profil) : on le crée à la volée plutôt que de planter.
    """
    profile, _ = Profile.objects.get_or_create(user=user)
    return profile
