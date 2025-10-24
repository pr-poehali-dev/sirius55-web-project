import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
from datetime import datetime

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event, context):
    '''
    Business: Track and return visitor statistics
    Args: event - dict with httpMethod, body, headers
          context - object with request_id attribute
    Returns: HTTP response with visitor count
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    visitor_id = headers.get('X-Visitor-Id', headers.get('x-visitor-id', ''))
    
    if not visitor_id:
        source_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
        user_agent = headers.get('User-Agent', headers.get('user-agent', ''))
        visitor_id = hashlib.sha256(f"{source_ip}:{user_agent}".encode()).hexdigest()
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'POST':
        cur.execute(
            "INSERT INTO visitors (visitor_id, first_visit, last_visit, visit_count) "
            "VALUES (%s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1) "
            "ON CONFLICT (visitor_id) DO UPDATE SET "
            "last_visit = CURRENT_TIMESTAMP, "
            "visit_count = visitors.visit_count + 1 "
            "RETURNING visit_count",
            (visitor_id,)
        )
        result = cur.fetchone()
        conn.commit()
        
        cur.execute("SELECT COUNT(DISTINCT visitor_id) as total_visitors FROM visitors")
        total = cur.fetchone()
        
        cur.execute(
            "SELECT COUNT(DISTINCT visitor_id) as today_visitors "
            "FROM visitors "
            "WHERE DATE(last_visit) = CURRENT_DATE"
        )
        today = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'visitor_id': visitor_id,
                'total_visitors': total['total_visitors'],
                'today_visitors': today['today_visitors'],
                'your_visit_count': result['visit_count']
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        cur.execute("SELECT COUNT(DISTINCT visitor_id) as total_visitors FROM visitors")
        total = cur.fetchone()
        
        cur.execute(
            "SELECT COUNT(DISTINCT visitor_id) as today_visitors "
            "FROM visitors "
            "WHERE DATE(last_visit) = CURRENT_DATE"
        )
        today = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'total_visitors': total['total_visitors'] or 0,
                'today_visitors': today['today_visitors'] or 0
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
