import pymongo
import pandas as pd
import joblib
import random
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# === Configuration ===
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "your-db-name"  # <-- CHANGE THIS
USER_THRESHOLD = 50
COUNT_FILE = "last_user_count.txt"

# === Connect to MongoDB ===
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]

# === Fetch Users ===
users = list(db.users.find({
    "cleanliness": {"$exists": True},
    "sleep": {"$exists": True},
    "food": {"$exists": True},
    "music": {"$exists": True},
    "study": {"$exists": True},
    "degree": {"$exists": True},
    "currentYear": {"$exists": True},
    "gender": {"$exists": True}
}))

current_user_count = len(users)

# === Load last user count ===
if os.path.exists(COUNT_FILE):
    with open(COUNT_FILE, "r") as f:
        last_user_count = int(f.read())
else:
    last_user_count = 0

new_users = current_user_count - last_user_count

if new_users < USER_THRESHOLD:
    print(f"⚠️ Only {new_users} new users since last train. Need at least {USER_THRESHOLD}.")
    exit()

print(f"✅ Found {new_users} new users. Proceeding with retraining.")

# === Match Logic ===
def is_match(u1, u2):
    score = 0
    for key in ["cleanliness", "sleep", "food", "music", "study"]:
        if abs(u1[key] - u2[key]) <= 1:
            score += 1
    if u1["gender"] == u2["gender"]: score += 1
    if u1["degree"] == u2["degree"]: score += 1
    if u1["currentYear"] == u2["currentYear"]: score += 1
    return 1 if score >= 5 else 0

# === Build Training Data ===
data = []
for _ in range(1000):
    u1, u2 = random.sample(users, 2)
    row = {
        "cleanliness": u2["cleanliness"],
        "sleep": u2["sleep"],
        "food": u2["food"],
        "music": u2["music"],
        "study": u2["study"],
        "same_gender": int(u1["gender"] == u2["gender"]),
        "same_degree": int(u1["degree"] == u2["degree"]),
        "same_year": int(u1["currentYear"] == u2["currentYear"]),
        "match": is_match(u1, u2)
    }
    data.append(row)

df = pd.DataFrame(data)
X = df.drop("match", axis=1)
y = df["match"]

# === Train the Model ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

acc = accuracy_score(y_test, model.predict(X_test))
print(f"✅ Model Accuracy: {acc * 100:.2f}%")

# === Save the Model ===
joblib.dump(model, "model.pkl")
print("✅ model.pkl updated.")

# === Save new user count ===
with open(COUNT_FILE, "w") as f:
    f.write(str(current_user_count))
print(f"📌 Updated last_user_count.txt with value: {current_user_count}")
