import json
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib

# Load training data
with open('match_data.json') as f:
    data = json.load(f)

rows = []
for entry in data:
    user = entry['user']
    other = entry['other']
    row = {}

    for feature in ['cleanliness', 'sleep', 'food', 'music', 'study', 'currentYear']:
        row[f'{feature}_diff'] = abs(user[feature] - other[feature])

    for feature in ['degree', 'gender']:
        row[f'{feature}_same'] = int(user[feature] == other[feature])

    row['match'] = entry['match']
    rows.append(row)

df = pd.DataFrame(rows)

# Split features and label
X = df.drop(columns=['match'])
y = df['match']

# Train model
model = LogisticRegression()
model.fit(X, y)

# Save model
joblib.dump(model, 'model.pkl')

print("✅ Model trained and saved to ml/model.pkl")
