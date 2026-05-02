from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_checks():
    return {'checks': [{'id': 'api-health', 'url': 'https://api.example.com/health', 'region': 'us-east-1'}]}
@router.post('/create')
def create_check(data: dict = Body(...)):
    return {'status': 'CREATED', 'id': 'new-check'}
@router.post('/run')
def run_check(check_id: str):
    return {'status': 'QUEUED', 'id': check_id}
