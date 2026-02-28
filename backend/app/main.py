from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, reports, verification, evaluation
from app import models  # Ensure models are registered for create_all

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="MEDCLARE API",
    description="Production-grade deterministic medical reasoning pipeline",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Broaden for network testing and cross-origin debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(reports.router)
app.include_router(verification.router)
app.include_router(evaluation.router)

@app.get("/")
def root():
    return {
        "name": "MEDCLARE API",
        "version": "1.0.0",
        "status": "operational",
        "description": "Deterministic Medical Reasoning Pipeline"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
