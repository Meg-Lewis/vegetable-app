# Ensures that only authenticated users can save or retrieve vegetable selections.

import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, Header

cred = credentials.Certificate("app/firebase_admin_credentials.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"]  # Firebase UID
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
