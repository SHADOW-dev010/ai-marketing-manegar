import os
from dotenv import load_dotenv

load_dotenv()

def _get_api_key(api_key: str | None = None) -> str:
    if api_key:
        return api_key
    key = os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY") or ""
    if not key:
        raise ValueError(
            "No API key found. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in .env file."
        )
    return key

def _is_anthropic(api_key: str | None = None) -> bool:
    if api_key:
        return api_key.startswith("sk-ant-")
    return bool(os.getenv("ANTHROPIC_API_KEY"))


def generate_content(prompt: str, content_type: str, tone: str | None = None, api_key: str | None = None) -> str:
    tone_instruction = f" Use a {tone} tone." if tone else ""
    system_prompt = (
        f"You are a professional marketing copywriter. "
        f"Generate a {content_type} based on the following brief.{tone_instruction}"
    )

    try:
        key = _get_api_key(api_key)
    except ValueError:
        return _mock_content(prompt, content_type)

    if _is_anthropic(api_key):
        return _anthropic_completion(system_prompt, prompt, api_key=key)
    return _openai_completion(system_prompt, prompt, api_key=key)


def chat_with_assistant(message: str, history: list[dict] | None = None, api_key: str | None = None) -> str:
    system_prompt = (
        "You are an expert AI marketing assistant. Help the user with marketing strategy, "
        "campaign optimization, content ideas, and best practices. Be concise and actionable."
    )

    try:
        key = _get_api_key(api_key)
    except ValueError:
        return _mock_chat(message)

    if _is_anthropic(api_key):
        return _anthropic_completion(system_prompt, message, api_key=key)
    return _openai_completion(system_prompt, message, api_key=key)


def _openai_completion(system: str, user: str, api_key: str | None = None) -> str:
    from openai import OpenAI
    client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        max_tokens=1000,
        temperature=0.7,
    )
    return resp.choices[0].message.content or ""


def _anthropic_completion(system: str, user: str, api_key: str | None = None) -> str:
    from anthropic import Anthropic
    client = Anthropic(api_key=api_key or os.getenv("ANTHROPIC_API_KEY"))
    resp = client.messages.create(
        model="claude-3-5-haiku-20241022",
        system=system,
        messages=[{"role": "user", "content": user}],
        max_tokens=1000,
        temperature=0.7,
    )
    return resp.content[0].text if resp.content else ""


def _mock_content(prompt: str, content_type: str) -> str:
    return (
        f"[MOCK] {content_type.upper()} generated for:\n\n"
        f"\"{prompt}\"\n\n"
        f"This is a placeholder response. Add your OpenAI or Anthropic API key "
        f"in the Settings page to enable real AI generation.\n\n"
        f"---\n\n"
        f"Headline: Transform Your Strategy Today\n\n"
        f"Body: Discover how our innovative solution can help you achieve "
        f"remarkable results. With cutting-edge technology and expert support, "
        f"you'll be able to reach your goals faster than ever before.\n\n"
        f"CTA: Get Started Now →"
    )


def _mock_chat(message: str) -> str:
    return (
        f"[MOCK] You asked: \"{message}\"\n\n"
        f"This is a placeholder response. Add your OpenAI or Anthropic API key "
        f"in the Settings page to enable the real AI assistant.\n\n"
        f"In the meantime, here's a general tip: Focus on your target audience's "
        f"pain points and craft messaging that speaks directly to their needs. "
        f"A/B test your campaigns to find what resonates best."
    )
