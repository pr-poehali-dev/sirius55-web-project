import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all orders with optional status filter
    Args: event with httpMethod and optional queryStringParameters (status)
    Returns: List of orders
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    status_filter = params.get('status')
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if status_filter:
        cur.execute(
            "SELECT id, plan, amount, user_contact, status, created_at FROM orders WHERE status = %s ORDER BY created_at DESC",
            (status_filter,)
        )
    else:
        cur.execute(
            "SELECT id, plan, amount, user_contact, status, created_at FROM orders ORDER BY created_at DESC"
        )
    
    rows = cur.fetchall()
    orders = []
    for row in rows:
        orders.append({
            'id': row[0],
            'plan': row[1],
            'amount': row[2],
            'user_contact': row[3],
            'status': row[4],
            'created_at': row[5].isoformat()
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'orders': orders})
    }