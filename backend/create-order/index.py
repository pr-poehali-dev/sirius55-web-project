import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create new order and save to database
    Args: event with httpMethod, body containing plan and optional user_contact
    Returns: Order ID and details
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    plan = body_data.get('plan')
    user_contact = body_data.get('user_contact', '')
    
    if plan not in ['basic', 'premium', 'vip']:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid plan'})
        }
    
    amount_map = {'basic': 20, 'premium': 40, 'vip': 100}
    amount = amount_map[plan]
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (plan, amount, user_contact, status) VALUES (%s, %s, %s, 'pending') RETURNING id, created_at",
        (plan, amount, user_contact)
    )
    result = cur.fetchone()
    order_id = result[0]
    created_at = result[1].isoformat()
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'order_id': order_id,
            'plan': plan,
            'amount': amount,
            'created_at': created_at,
            'telegram_url': 'https://t.me/79836232746'
        })
    }