import random


def forecast_performance(historical_data: list[dict]) -> list[dict]:
    """Generate mock performance forecasts.
    
    In production, this would use Prophet or scikit-learn for real predictions.
    """
    forecasts = []
    for entry in historical_data:
        forecasts.append({
            **entry,
            "predicted_impressions": entry.get("impressions", 0) * random.uniform(1.1, 1.3),
            "predicted_clicks": entry.get("clicks", 0) * random.uniform(1.05, 1.25),
            "predicted_conversions": entry.get("conversions", 0) * random.uniform(1.1, 1.4),
            "confidence": round(random.uniform(0.7, 0.95), 2),
        })
    return forecasts


def get_campaign_insights(campaigns: list[dict]) -> list[str]:
    """Generate AI insights based on campaign data."""
    insights = [
        "Increase Facebook ad budget by 20% — highest ROI channel this quarter",
        "Best posting time for email campaigns: Tuesday 10 AM",
        "Ad copy with emotional triggers converts 34% better",
        "Video content outperforms static images by 2.3x",
    ]
    return insights
