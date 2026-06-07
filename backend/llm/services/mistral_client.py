"""
Client Mistral AI — API au format OpenAI, fournisseur EUROPÉEN (français).

[Note pédagogique] Atout RGPD : Mistral est une entreprise française, ses
serveurs sont en Europe — un argument de souveraineté des données face aux
fournisseurs américains (OpenAI, Anthropic, Gemini). API compatible OpenAI,
free tier disponible -> client minimal hérité.
"""
from django.conf import settings

from .openai_compatible import OpenAICompatibleClient


class MistralLLMClient(OpenAICompatibleClient):
    def __init__(self) -> None:
        super().__init__(
            api_key=settings.MISTRAL_API_KEY,
            model=settings.MISTRAL_MODEL,
            base_url="https://api.mistral.ai/v1",
            provider_label="Mistral",
            hint="Clé sur https://console.mistral.ai/ (free tier disponible).",
            json_mode=True,
        )
