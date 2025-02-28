import pymongo 
import os
from dotenv import load_dotenv

load_dotenv()

db = None
def dbConnect():
    try:
        global db 
        uri = os.getenv('DB_URI')
        db = pymongo.MongoClient(uri)
        print("DB Connected")

    except Exception as e:
        raise Exception("The following error occurred: ", e)
