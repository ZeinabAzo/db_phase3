from fastapi import FastAPI
from routes.location import router as location_router
from routes.ticket import router as ticket_router
from routes import auth_router
from routes.reserve import router as reserve_router
from routes.user_router import router as user_router
from routes.report_router import router as report_router
from routes.admin_router import router as admin_router
from routes.payment_router import router as payment_router



#  create api instance 
app = FastAPI(
    title="Sport Ticket Reservation System",
    description="Backend API for sport ticket reservation project",
    version="1.0.0"
)

app.include_router(location_router)
app.include_router(auth_router.router)
app.include_router(user_router)
app.include_router(ticket_router)
app.include_router(reserve_router)
app.include_router(report_router)

app.include_router(admin_router)
app.include_router(payment_router)

# first test
@app.get("/")
def root():
    return {
        "message": "Sport Ticket Reservation API is running"
    }