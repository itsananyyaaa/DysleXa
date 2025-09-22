from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from difflib import SequenceMatcher
from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

app = Flask(__name__)
CORS(app)  # allow React frontend to talk to Flask

# IBM Watson setup
apikey = "gNDK5J7b2VeG9vJT29tID-n7jlDxm7ZyghFz7dZTj3CI"
url = "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/026b0b93-d706-46d7-ae91-63befe17f186"

authenticator = IAMAuthenticator(apikey)
tts = TextToSpeechV1(authenticator=authenticator)
tts.set_service_url(url)

# Function to check if user struggled
def check_struggle(expected, actual, threshold=0.85):
    ratio = SequenceMatcher(None, expected.lower(), actual.lower()).ratio()
    return ratio < threshold, ratio

# API endpoint for React to send text
@app.route("/check", methods=["POST"])
def check_and_tts():
    data = request.get_json()
    given_text = data["givenText"]
    spoken_text = data["recognizedText"]

    is_struggle, accuracy = check_struggle(given_text, spoken_text)

    if is_struggle:
        output_file = "output.wav"
        with open(output_file, "wb") as audio_file:
            response = tts.synthesize(
                text=given_text,
                voice="en-US_AllisonV3Voice",
                accept="audio/wav"
            ).get_result()
            audio_file.write(response.content)
        # Send the audio file to frontend
        return send_file(output_file, mimetype="audio/wav")
    else:
        # Send accuracy info if no struggle
        return jsonify({"message": "Reading fine", "accuracy": accuracy})

if __name__ == "__main__":
    app.run(port=5500, debug=True)
