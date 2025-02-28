from fastapi import APIRouter

router = APIRouter()

@router.get('/api/stats')
def stats():
    from db import db
    database=db['apiAnalytics']
    collection=database['apiStats']
    resp=list(collection.find({}))
    for res in resp:
        res['_id'] = str(res['_id'])
    return resp