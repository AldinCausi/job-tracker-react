import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

print("🔥 API FILE LOADED")

conn = sqlite3.connect("Bewerbungen.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS bewerbungen (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               company TEXT,
               role TEXT,
               status TEXT)""")



class JobModel(BaseModel):
    id: int
    company: str
    role: str
    status: str

class CreaeJobModel(BaseModel):
    company: str
    role: str
    status: str


app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/jobs", response_model=List[JobModel])
def get_all_jobs():
    cursor.execute("SELECT * FROM bewerbungen")
    jobs = cursor.fetchall()
    return [
        {
            "id": row[0],
            "company": row[1],
            "role": row[2],
            "status": row[3]
        }
        for row in jobs
    ]

@app.get("/jobs/{job_id}")
def get_job_by_id(job: JobModel, job_id: int):
    cursor.execute("SELECT * FROM bewerbungen WHERE id = ?", (job_id, ))
    job = cursor.fetchall()
    return {
        "message": f"job with id={job_id} returned",
        "job": {
            "company": job.company,
            "role": job.role,
            "status": job.status
        }
    }

@app.post("/jobs")
def create_job_application(job: CreaeJobModel):
    cursor.execute(
        "INSERT INTO bewerbungen (company, role, status) VALUES (?, ?, ?)",
        (job.company, job.role, job.status))
    conn.commit() 

    return {"messgae": "job application created",
            "job": {
                "company": job.company,
                "role": job.role,
                "status": job.status
            }}

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    cursor.execute("DELETE FROM bewerbungen WHERE id = ?", (job_id, ))
    conn.commit()
    return {"message": f"job with id={job_id} deleted."}





