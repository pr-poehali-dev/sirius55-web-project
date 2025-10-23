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
    'basic': 20,
    'premium': 40,
    'vip': 100
}

PLAN_RECIPES = {
    'basic': """# Базовый рецепт Vasabi

## Ингредиенты:
- Свежий васаби корень - 50г
- Соевый соус - 2 ст.л.
- Рисовый уксус - 1 ст.л.
- Мирин - 1 ч.л.

## Приготовление:
1. Тщательно очистите корень васаби
2. Натрите на мелкой терке круговыми движениями
3. Дайте постоять 5 минут для раскрытия аромата
4. Смешайте с соевым соусом
5. Добавьте рисовый уксус и мирин
6. Подавайте сразу же

## Советы:
- Используйте только свежий васаби
- Натирайте непосредственно перед подачей
- Храните в холодильнике не более 24 часов""",
    
    'premium': """# Премиум рецепт Vasabi

## Ингредиенты:
- Свежий васаби корень премиум - 100г
- Соевый соус премиум класса - 3 ст.л.
- Рисовый уксус выдержанный - 2 ст.л.
- Мирин - 1 ст.л.
- Саке - 1 ч.л.
- Имбирь молодой - 10г
- Морская соль - щепотка

## Приготовление:
1. Отберите лучший корень васаби
2. Очистите и натрите на специальной акульей терке
3. Смешайте с мелко натертым имбирем
4. Добавьте соевый соус, уксус, мирин и саке
5. Добавьте щепотку морской соли
6. Перемешайте аккуратно
7. Дайте настояться 10 минут

## Секретные советы:
- Используйте акулью кожу для терки (oreoshi)
- Температура васаби должна быть 15-18°C
- Натирайте по часовой стрелке
- Подавайте на охлажденной керамике

## Сочетания:
Идеально с премиум суши, сашими из тунца bluefin""",
    
    'vip': """# VIP рецепт Vasabi - Секретная формула

## Эксклюзивные ингредиенты:
- Васаби корень от 3-летних растений - 150г
- Соевый соус 5-летней выдержки - 4 ст.л.
- Рисовый уксус 3-летней выдержки - 3 ст.л.
- Мирин премиум - 2 ст.л.
- Саке Daiginjo класса - 1 ст.л.
- Свежий имбирь молодой - 20г
- Морская соль с острова Осима - щепотка
- Юдзу цедра - 1/2 ч.л.
- Черный кунжут обжаренный - для украшения

## Процесс приготовления мастера:
1. Выберите идеальный корень васаби (твердый, без пятен)
2. Очистите мокрой тканью (не мойте под водой!)
3. Используйте акулью терку oreoshi под углом 45°
4. Натирайте круговыми движениями 15 минут
5. Смешайте с мелко натертым имбирем (соотношение 10:1)
6. В отдельной посуде смешайте жидкие ингредиенты
7. Постепенно добавляйте к васаби, помешивая палочкой
8. Добавьте цедру юдзу в последний момент
9. Настаивайте 15 минут при 16°C

## Секреты мастеров:
- Натирайте только верхнюю часть корня
- Используйте керамическую посуду ручной работы
- Васаби должен быть консистенции густой пасты
- Аромат должен быть резким, но не едким

## Подача:
- На охлажденной керамике температурой 10°C
- Украсьте черным кунжутом
- Подавайте с премиум сашими или nigiri
- Дополните маринованным имбирем gari

## Хранение:
- Максимум 6 часов в герметичной посуде
- Температура 4-6°C
- Перед подачей дайте нагреться до 15°C

## Особые указания:
Этот рецепт передавался в семье японских мастеров суши более 100 лет."""
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
        recipe_content = PLAN_RECIPES[plan]
        
        cur.execute(
            """INSERT INTO t_p13322342_sirius55_web_project.orders 
               (plan, amount, user_contact, status, user_id, recipe_content) 
               VALUES (%s, %s, %s, %s, %s, %s) 
               RETURNING id, plan, amount, status, created_at""",
            (plan, amount, user['email'], 'paid', user_id, recipe_content)
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