# 🤖 Automated AI Lecture Quiz Generator

## 📌 Overview
An event-driven, fully autonomous pipeline built in n8n that transforms raw lecture audio into interactive, ready-to-take multiple-choice quizzes. 

When a user drops an audio file into a specific Google Drive folder, this workflow automatically transcribes the audio, uses AI to generate a summary and multiple-choice questions, programmatically builds a Google Form with the output, and emails the live quiz link to the students.

## 🛠 Tech Stack
* **Automation Engine:** [n8n](https://n8n.io/)
* **Transcription:** Groq API (Whisper-large-v3)
* **LLM / Data Structuring:** Google Gemini 1.5
* **Integrations:** Google Drive API, Google Forms API, Gmail API
* **Custom Logic:** JavaScript

## ⚙️ Architecture & Data Flow
1. **Trigger:** A Google Drive node listens for `File Created` events in a specific "Sessions" folder.
2. **Download & Transcribe:** The raw audio binary is downloaded and sent to Groq's insanely fast Whisper-large-v3 model via an HTTP POST request.
3. **AI Processing:** The raw text transcript is passed to Google Gemini, instructed via prompt engineering to output a strict JSON structure containing a summary and 5 multiple-choice questions.
4. **Data Translation:** A custom JavaScript node parses the AI's JSON output and dynamically maps it into the highly nested, complex array structure required by the Google Forms API `batchUpdate` endpoint.
5. **Quiz Generation:** * *HTTP Request 1:* Pings the Google Forms API to create a blank form and retrieve the new `formId`.
   * *HTTP Request 2:* Pushes the dynamically generated JSON payload to populate the form with a description and formatted radio-button questions.
6. **Delivery:** A Gmail node automatically emails the `responderUri` (the live quiz link) to the designated mailing list.

## 📸 Screenshots
*(Insert your workflow and form screenshots here)*

## 🚀 How to Use (For Developers)
1. Clone this repository.
2. Import the `workflow.json` file into your n8n instance.
3. Set up your Google Cloud Console project and enable the Drive, Forms, and Gmail APIs.
4. Add your Google OAuth2, Groq, and Gemini credentials within n8n.
5. Update the Folder IDs in the Trigger and HTTP Request nodes to match your own Google Drive environment.
6. Activate the workflow!