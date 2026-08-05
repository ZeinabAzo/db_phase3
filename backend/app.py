from fastapi import FastAPI
from routes.location import router as location_router
from routes.ticket import router as ticket_router
from routes import auth_router
from routes.reserve import router as reserve_router
from routes.user_router import router as user_router
from routes.report_router import router as report_router
from routes.admin_router import router as admin_router
from routes.payment_router import router as payment_router
#این ثایل وجود نداره
#from routes.matches_router import router as matches_router
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from utils.reservation_expiry import expire_old_reservations



#  create api instance 
app = FastAPI(
    title="Sport Ticket Reservation System",
    description="Backend API for sport ticket reservation project",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(location_router)
app.include_router(auth_router.router)
app.include_router(user_router)
app.include_router(ticket_router)
app.include_router(reserve_router)
app.include_router(report_router)

app.include_router(admin_router)
app.include_router(payment_router)
#app.include_router(matches_router)

# first test
@app.get("/")
def root():
    return {
        "message": "Sport Ticket Reservation API is running"
    }




scheduler = BackgroundScheduler()


@app.on_event("startup")
def startup_event():

    scheduler.add_job(
        expire_old_reservations,
        "interval",
        minutes=1
    )

    scheduler.start()



@app.on_event("shutdown")
def shutdown_event():

    scheduler.shutdown()