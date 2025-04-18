from flask import Flask, request, jsonify
import joblib
from feature_Extraction import FeatureExtraction
import numpy as np

app = Flask(__name__)

# Load model and scaler
gbc = joblib.load("ml-backend\model.pkl")
# scaler = joblib.load("scaler.pkl")  # If you used one
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    url = data['url']
    obj = FeatureExtraction(url)
    x = np.array(obj.getFeaturesList()).reshape(1, 30)
    print(x)
    y_pred = gbc.predict(x)[0]  # 1: legitimate, -1: phishing
    print(y_pred)
    y_pro_phishing = gbc.predict_proba(x)[0, 0]  # Probability of phishing
    y_pro_legitimate = gbc.predict_proba(x)[0, 1]  # Probability of safe

    result = "Phishing" if y_pred == -1 else "Legitimate"
    safety_score = round(y_pro_legitimate * 100, 2)

    return jsonify({
        'prediction': result,
        'safety_score': safety_score,
        'url': url
    })

if __name__ == '__main__':
    app.run(debug=True)
