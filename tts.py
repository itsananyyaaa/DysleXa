import os
from difflib import SequenceMatcher
from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# IBM Watson setup
apikey = "gNDK5J7b2VeG9vJT29tID-n7jlDxm7ZyghFz7dZTj3CI"
url = "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/026b0b93-d706-46d7-ae91-63befe17f186"

authenticator = IAMAuthenticator(apikey)
tts = TextToSpeechV1(authenticator=authenticator)
tts.set_service_url(url)

# Threshold for struggle detection
THRESHOLD = 0.85  # you can change this anytime

# Function to check struggle (compare similarity)
def check_struggle(expected, actual, threshold=THRESHOLD):
    ratio = SequenceMatcher(None, expected.lower(), actual.lower()).ratio()
    return ratio < threshold, ratio

# Original sentence
original_text = "Hi baby, IBM Watson is talking to you from VS Code!"

# Step 1 – Ask user for spoken_text in terminal
spoken_text = input("🗣️ What did the user say? ")

# Step 2 – Compare
is_struggle, accuracy = check_struggle(original_text, spoken_text)

# Step 3 – Give feedback + read aloud if needed
if is_struggle:
    print(f"⚠️ Struggle detected! Accuracy: {accuracy:.2f}")
    output_file = "output.wav"
    with open(output_file, "wb") as audio_file:
        response = tts.synthesize(
            text=original_text,
            voice="en-US_AllisonV3Voice",
            accept="audio/wav"
        ).get_result()
        audio_file.write(response.content)
    print("✅ Audio saved as", output_file)
    os.system(f"afplay {output_file}")  # for Mac, use another command for Windows/Linux
else:
    print(f"👌 Reading fine, Accuracy: {accuracy:.2f}")
