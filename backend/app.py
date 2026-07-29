from fastapi import FastAPI
from routes.location import router as location_router


# ساخت برنامه FastAPI
app = FastAPI(
    title="Sport Ticket Reservation System",
    description="Backend API for sport ticket reservation project",
    version="1.0.0"
)

app.include_router(location_router)


# تست اولیه برای اطمینان از اجرای سرور
@app.get("/")
def root():
    return {
        "message": "Sport Ticket Reservation API is running"
    }