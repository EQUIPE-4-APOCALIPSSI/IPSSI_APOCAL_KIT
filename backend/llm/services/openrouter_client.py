"""
Client OpenRouter — passerelle unique vers des CENTAINES de modèles.

[Note pédagogique] OpenRouter est un « routeur » : une seule clé donne accès à
des modèles de multiples fournisseurs (OpenAI, Anthropic, Meta, Mistral…) en
format OpenAI. Le nom du modèle suit la forme « éditeur/modèle » (ex.
« meta-llama/llama-3.1-8b-instruct »). Certains modèles sont gratuits (suffixe
« :free »). Données envoyées à un service cloud (enjeu RGPD, cf. J3-bis).

json_mode=False par défaut : tous les modèles routés ne supportent pas le mode
JSON strict. On s'appuie sur le prompt + le fallback d'extraction de quiz_prompt.
"""
from django.conf import settings

from .openai_compatible import OpenAICompatibleClient


class OpenRouterLLMClient(OpenAICompatibleClient):
    def __init__(self) -> None:
        super().__init__(
            api_key=settings.OPENROUTER_API_KEY,
            model=settings.OPENROUTER_MODEL,
            base_url="https://openrouter.ai/api/v1",
            provider_label="OpenRouter",
            hint="Clé sur https://openrouter.ai/keys (modèles « :free » disponibles).",
            json_mode=False,
            # En-têtes recommandés par OpenRouter pour identifier l'app (optionnels).
            extra_headers={
                "HTTP-Referer": "https://github.com/melafrit/IPSSI_APOCAL_KIT",
                "X-Title": "EduTutor IA",
            },
        )
