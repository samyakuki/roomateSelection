from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        features = [
            data['cleanliness'],
            data['sleep'],
            data['food'],
            data['music'],
            data['study'],
            data['same_gender'],
            data['same_degree'],
            data['same_year']
        ]

        prediction = model.predict_proba([features])[:, 1]  # Probability of class 1 (good match)
        return jsonify({'match_score': round(float(prediction[0]) * 100, 2)})

    except KeyError as e:
        return jsonify({'error': f'Missing field: {e}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
