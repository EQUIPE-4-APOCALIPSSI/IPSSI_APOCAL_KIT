"""
Factory de client LLM selon settings.LLM_BACKEND.

[Note pédagogique] Le « factory pattern » centralise le choix du fournisseur.
Le reste de l'application appelle get_llm_client() sans savoir lequel est branché.
Pour ajouter un fournisseur : créer un client (respectant LLMClient) puis
l'ajouter au dictionnaire _BACKENDS ci-dessous. Beaucoup de fournisseurs sont
au format OpenAI -> leur client tient en quelques lignes (cf. openai_compatible.py).
"""
import logging

from django.conf import settings

from .anthropic_client import AnthropicLLMClient
from .base import LLMClient
from .cerebras_client import CerebrasLLMClient
from .gemini_client import GeminiLLMClient
from .groq_client import GroqLLMClient
from .mistral_client import MistralLLMClient
from .mock_client import MockLLMClient
from .ollama_client import OllamaLLMClient
from .openai_client import OpenAILLMClient
from .openrouter_client import OpenRouterLLMClient

logger = logging.getLogger(__name__)

# Backends CLOUD : les données du cours sortent du serveur local (enjeu RGPD,
# cf. perturbation J3-bis). NB : Mistral est européen (données en UE), les
# autres sont surtout hors UE. En dev, on privilégie Ollama (local, souverain).
CLOUD_BACKENDS = {
    "openai", "anthropic", "gemini", "groq", "openrouter", "cerebras", "mistral",
}

# Parmi les backends cloud, ceux qui sont PAYANTS dès le 1er appel (crédit requis).
# Les autres proposent un free tier utilisable pour tester (gemini, groq,
# cerebras, mistral, et certains modèles « :free » d'openrouter).
PAID_BACKENDS = {"openai", "anthropic"}

_BACKENDS = {
    "mock":       MockLLMClient,
    "ollama":     OllamaLLMClient,
    "openai":     OpenAILLMClient,
    "anthropic":  AnthropicLLMClient,
    "gemini":     GeminiLLMClient,
    "groq":       GroqLLMClient,
    "openrouter": OpenRouterLLMClient,
    "cerebras":   CerebrasLLMClient,
    "mistral":    MistralLLMClient,
}


def get_llm_client() -> LLMClient:
    """Renvoie le client LLM correspondant à la configuration courante."""
    backend = (settings.LLM_BACKEND or "ollama").lower()

    if backend in CLOUD_BACKENDS:
        # Garde-fou pédagogique (on N'INTERROMPT PAS, c'est un choix assumé via .env).
        cout = "PAYANT (crédit requis)" if backend in PAID_BACKENDS else "free tier disponible"
        logger.warning(
            "[LLM] Backend CLOUD activé : '%s' (%s). Les données du cours quittent "
            "le serveur local (enjeu RGPD, cf. perturbation J3-bis). En développement, "
            "préférez LLM_BACKEND=ollama (local, gratuit, souverain).",
            backend, cout,
        )

    client_cls = _BACKENDS.get(backend)
    if client_cls is None:
        raise ValueError(
            f"LLM_BACKEND inconnu : '{backend}'. Valeurs autorisées : "
            "'ollama' | 'gemini' | 'groq' | 'cerebras' | 'mistral' | "
            "'openrouter' | 'openai' | 'anthropic' | 'mock'."
        )
    return client_cls()
