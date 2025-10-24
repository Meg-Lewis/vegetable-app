import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("app/firebase_admin_credentials.json") 
firebase_admin.initialize_app(cred)
