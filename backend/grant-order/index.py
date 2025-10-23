"""
Business: Grant order to user by user_id (admin function)
Args: event with httpMethod POST, body with user_id, plan
Returns: HTTP response with created order
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

PLAN_PRICES = {
    'basic': 2990,
    'premium': 6990,
    'vip': 14990
}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id')
        plan = body_data.get('plan', '').lower()
        
        if not user_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id is required'})
            }
        
        if plan not in PLAN_PRICES:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid plan. Must be basic, premium, or vip'})
            }
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT id, email, full_name FROM t_p13322342_sirius55_web_project.users WHERE id = %s",
            (user_id,)
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'User with id {user_id} not found'})
            }
        
        amount = PLAN_PRICES[plan]
        
        cur.execute(
            """INSERT INTO t_p13322342_sirius55_web_project.orders 
               (plan, amount, user_contact, status, user_id) 
               VALUES (%s, %s, %s, %s, %s) 
               RETURNING id, plan, amount, status, created_at""",
            (plan, amount, user['email'], 'paid', user_id)
        )
        order = cur.fetchone()
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'order': {
                    'id': order['id'],
                    'plan': order['plan'],
                    'amount': order['amount'],
                    'status': order['status'],
                    'created_at': order['created_at'].isoformat()
                },
                'user': {
                    'id': user['id'],
                    'email': user['email'],
                    'full_name': user['full_name']
                }
            })
        }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
