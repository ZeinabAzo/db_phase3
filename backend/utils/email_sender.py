import os
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr

# load environment variables from .env file
load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    MAIL_FROM = os.getenv("MAIL_FROM"),
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

async def send_otp_email(email_to: EmailStr, otp_code: str) -> bool:

    html_content = f"""
    <div dir="ltr" style="font-family: Arial, sans-serif; text-align: left; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2>Email Verification</h2>
        <p>Dear User,</p>
        <p>Your verification code for login/registration is:</p>
        <h1 style="color: #4F46E5; letter-spacing: 5px;">{otp_code}</h1>
        <p style="color: #666; font-size: 12px;">This code will expire in a few minutes. Please do not share it with anyone.</p>
    </div>
    """

    message = MessageSchema(
        subject="Verification Code",
        recipients=[email_to],
        body=html_content,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email to {email_to}: {e}")
        return False