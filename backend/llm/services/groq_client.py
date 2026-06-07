"""
Client Groq — API au format OpenAI, réputée pour sa VITESSE d'inférence (LPU).

[Note pédagogique] Groq propose un free tier généreux et des modèles open-source
(Llama, Mixtral…) servis très rapidement. Comme son API est compatible OpenAI,
ce client se résume à fixer l'URL et les clés — toute la logique est héritée.
Données envoyées à un service cloud (enjeu RGPD, cf. J3-bis).
"""
from django.conf import settings

from .openai_compatible import OpenAICompatibleClient


class GroqLLMClient(OpenAICompatibleClient):
    def __init__(self) -> None:
        super().__init__(
            api_key=settings.GROQ_API_KEY,
            model=settings.GROQ_MODEL,
            base_url="https://api.groq.com/openai/v1",
            provider_label="Groq",
            hint="Clé GRATUITE sur https://console.groq.com/keys.",
            json_mode=True,
        )
