"""
Factory de client LLM selon settings.LLM_BACKEND.

[Note pédagogique] Le « factory pattern » centralise le choix du fournisseur.
Le reste de l'application (views, services) appelle simplement get_llm_client()
sans savoir si c'est Ollama, OpenAI, Claude, Gemini ou le mock derrière. Pour
ajouter un nouveau fournisseur : écrire un client qui respecte LLMClient, puis
l'ajouter au dictionnaire _BACKENDS ci-dessous. Rien d'autre à changer.
"""
import logging

from django.conf import settings

from .anthropic_client import AnthropicLLMClient
from .base import LLMClient
from .gemini_client import GeminiLLMClient
from .mock_client import MockLLMClient
from .ollama_client import OllamaLLMClient
from .openai_client import OpenAILLMClient

logger = logging.getLogger(__name__)

# Backends CLOUD : les données du cours sont envoyées hors UE (enjeu RGPD,
# cf. perturbation J3-bis). En développement, on privilégie Ollama (local).
CLOUD_BACKENDS = {"openai", "anthropic", "gemini"}

# Parmi les backends cloud, ceux qui sont PAYANTS dès le premier appel
# (Gemini, lui, propose un free tier utilisable pour tester).
PAID_BACKENDS = {"openai", "anthropic"}

_BACKENDS = {
    "mock":      MockLLMClient,
    "ollama":    OllamaLLMClient,
    "openai":    OpenAILLMClient,
    "anthropic": AnthropicLLMClient,
    "gemini":    GeminiLLMClient,
}


def get_llm_client() -> LLMClient:
    """Renvoie le client LLM correspondant à la configuration courante."""
    backend = (settings.LLM_BACKEND or "ollama").lower()

    if backend in CLOUD_BACKENDS:
        # Garde-fou pédagogique (on N'INTERROMPT PAS, c'est un choix assumé via .env) :
        # on rappelle l'enjeu RGPD + le coût dans les logs.
        cout = "PAYANT" if backend in PAID_BACKENDS else "free tier disponible"
        logger.warning(
            "[LLM] Backend CLOUD activé : '%s' (%s). Les données du cours sont "
            "envoyées hors UE (enjeu RGPD, cf. perturbation J3-bis). En "
            "développement, préférez LLM_BACKEND=ollama (local, gratuit, souverain).",
            backend, cout,
        )

    client_cls = _BACKENDS.get(backend)
    if client_cls is None:
        raise ValueError(
            f"LLM_BACKEND inconnu : '{backend}'. "
            "Valeurs autorisées : 'ollama' | 'gemini' | 'openai' | 'anthropic' | 'mock'."
        )
    return client_cls()
