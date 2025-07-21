from pymongo import MongoClient

def load_user_data():
    # Connect to MongoDB Atlas (replace with your real connection string)
    client = MongoClient("mongodb+srv://samyakuki:Samkuk1109@cluster0.ggrltl7.mongodb.net/roommateDB?retryWrites=true&w=majority")
    db = client["roommateDB"]
    users = db["users"]

    # Fetch users with filled data
    cursor = users.find({
        "cleanliness": {"$exists": True},
        "sleep": {"$exists": True},
        "food": {"$exists": True},
        "music": {"$exists": True},
        "study": {"$exists": True},
        "degree": {"$exists": True},
        "currentYear": {"$exists": True},
        "matchHistory.0": {"$exists": True}  # users with at least one match history
    })

    data = []
    for user in cursor:
        features = [
            user["cleanliness"],
            user["sleep"],
            user["food"],
            user["music"],
            user["study"],
            int(user["currentYear"]),
            hash(user["degree"]) % 10  # Encode degree string to int
        ]

        # Get recent match scores as label (or use 1 if match exists)
        label = 1  # Temporary binary label since exact match score is tricky
        data.append((features, label))

    return data

if __name__ == "__main__":
    dataset = load_user_data()
    print(f"Loaded {len(dataset)} records")
    print("Sample:", dataset[:2])
