from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_results():
    return {'uptime': 99.98, 'avg_latency': 124.5, 'results': [{'id': 'res-1', 'status': 'SUCCESS'}]}
