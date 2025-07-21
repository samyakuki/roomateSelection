import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load generated data
with open("match_data.json", "r") as f:
    data = json.load(f)

# Convert to flat features
rows = []
for entry in data:
    user = entry["user"]
    other = entry["other"]
    row = {
        "cleanliness": other["cleanliness"],
        "sleep": other["sleep"],
        "food": other["food"],
        "music": other["music"],
        "study": other["study"],
        "same_gender": 1 if user["gender"] == other["gender"] else 0,
        "same_degree": 1 if user["degree"] == other["degree"] else 0,
        "same_year": 1 if user["currentYear"] == other["currentYear"] else 0,
        "match": entry["match"]
    }
    rows.append(row)

df = pd.DataFrame(rows)

X = df.drop("match", axis=1)
y = df["match"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate accuracy
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {acc * 100:.2f}%")

# Save model
joblib.dump(model, "model.pkl")
print("✅ Saved trained model to model.pkl")
