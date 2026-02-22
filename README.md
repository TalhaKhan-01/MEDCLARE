# MEDCLARE

MEDCLARE is a production-grade deterministic medical reasoning pipeline designed to transform complex medical reports into clear, grounded, and personalized clinical interpretations.

## Features

- **Multilingual Support**: Supports 9 languages (English, Hindi, Telugu, Tamil, Odia, Bengali, Malayalam, Punjabi, Marathi).
- **Personalized Interpretations**: Adaptive explanations based on user literacy levels and age.
- **Evidence-Grounded**: Every interpretation is backed by clinical evidence with traceable citations.
- **Doctor Verification Interface**: Dedicated dashboard for medical professionals to review and verify AI-generated interpretations.
- **Deep Structured Analysis**: Extracts lab findings and medications with high accuracy.

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, Pydantic, Chromadb (VDB), OpenRouter (LLM Orchestration).
- **Frontend**: React, Vite, Vanilla CSS, i18next (Multilingual).
- **Database**: SQLite (SQLAlchemy).
- **Pipeline**: OCR (Tesseract) -> Extraction -> RAG (Evidence Retrieval) -> Personalization -> Guardrails.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example` and add your `OPENROUTER_API_KEY`.
5. Run the server:
   ```bash
   uvicorn app.main:app --reload --port 8080
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## License

MIT
