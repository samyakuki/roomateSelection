import random
import json

# Clamp value between 1 and 5
def clamp(val):
    return min(5, max(1, val))

# Create a random user profile
def random_profile():
    return {
        "cleanliness": random.randint(1, 5),
        "sleep": random.randint(1, 5),
        "food": random.randint(1, 5),
        "music": random.randint(1, 5),
        "study": random.randint(1, 5),
        "currentYear": random.randint(1, 4),
        "degree": random.choice(["btech", "mtech", "phd"]),
        "gender": random.choice(["male", "female", "other"])
    }

# Create a variant profile (slightly similar to base)
def user_variant(base):
    return {
        "cleanliness": clamp(base["cleanliness"] + random.choice([-1, 0, 1])),
        "sleep": clamp(base["sleep"] + random.choice([-1, 0, 1])),
        "food": clamp(base["food"] + random.choice([-1, 0, 1])),
        "music": clamp(base["music"] + random.choice([-1, 0, 1])),
        "study": clamp(base["study"] + random.choice([-1, 0, 1])),
        "currentYear": base["currentYear"],
        "degree": base["degree"],
        "gender": base["gender"]
    }

# Define match logic
def is_match(user, other):
    score = 0
    for key in ["cleanliness", "sleep", "food", "music", "study"]:
        if abs(user[key] - other[key]) <= 1:
            score += 1
    if user["gender"] == other["gender"]:
        score += 1
    if user["degree"] == other["degree"]:
        score += 1
    if user["currentYear"] == other["currentYear"]:
        score += 1
    return 1 if score >= 5 else 0  # relaxed match logic

# Generate dataset
data = []
for _ in range(1000):  # more samples = better model
    u1 = random_profile()
    u2 = random_profile() if random.random() < 0.5 else user_variant(u1)
    match = is_match(u1, u2)
    data.append({"user": u1, "other": u2, "match": match})

# Save to file
with open("match_data.json", "w") as f:
    json.dump(data, f, indent=2)

print("✅ Dataset generated: 1000 samples with normalized ranges and realistic variations.")
