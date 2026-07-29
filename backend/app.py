from fastapi import FastAPI
from routes import auth_router  # ۱. ایمپورت کردن روتری که ساختی

app = FastAPI(
    title="Sport Ticket Reservation System",
    description="Backend API for sport ticket reservation project",
    version="1.0.0"
)

# ۲. متصل کردن روتر احراز هویت به برنامه اصلی (این خط خیلی مهم است!)
app.include_router(auth_router.router)

@app.get("/")
def root():
    return {
        "message": "Sport Ticket Reservation API is running"
    }