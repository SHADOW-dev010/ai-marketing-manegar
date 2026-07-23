import random


def analyze_sentiment_text(text: str) -> dict:
    """Analyze sentiment of the given text.
    
    Returns a mock analysis by default. When a real NLP model is integrated,
    this will use HuggingFace transformers or a cloud API.
    """
    positive_words = ["great", "amazing", "excellent", "love", "wonderful", "fantastic", "good", "best"]
    negative_words = ["bad", "terrible", "awful", "hate", "worst", "poor", "horrible"]

    text_lower = text.lower()
    pos_count = sum(1 for w in positive_words if w in text_lower)
    neg_count = sum(1 for w in negative_words if w in text_lower)

    if pos_count > neg_count:
        sentiment = "positive"
        score = round(random.uniform(0.6, 0.95), 2)
    elif neg_count > pos_count:
        sentiment = "negative"
        score = round(random.uniform(-0.95, -0.6), 2)
    else:
        sentiment = "neutral"
        score = round(random.uniform(-0.3, 0.3), 2)

    return {"sentiment": sentiment, "score": score}
