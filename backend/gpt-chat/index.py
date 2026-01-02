import json
import os
import random
from openai import OpenAI

def generate_mock_response(user_message: str) -> str:
    """Генерирует mock-ответы для демонстрации без реального API"""
    msg_lower = user_message.lower()
    
    responses = {
        'привет': '👋 Привет! Я AI-ассистент ProfilePro. Чем могу помочь?',
        'услуг': '📊 У нас есть 4 типа услуг:\n\n✨ Экспресс-анализ (24 часа) - быстрое базовое исследование\n🎯 Углубленное исследование (48 часов) - полный анализ всех аспектов\n🛡️ Конфиденциальность - гарантия 100% защиты данных\n📈 Аналитика роста (72 часа) - рекомендации по развитию\n\nКакая услуга вас интересует?',
        'цен': '💰 Цены зависят от выбранной услуги:\n\n• Экспресс-анализ - от 5000₽\n• Углубленное исследование - от 15000₽\n• Аналитика роста - от 20000₽\n\nТочную стоимость рассчитаем после уточнения деталей проекта. Оставьте заявку!',
        'как работ': '🔄 Процесс работы простой:\n\n1️⃣ Вы отправляете запрос\n2️⃣ Мы анализируем профиль\n3️⃣ Получаете детальный отчет\n4️⃣ Консультируем по внедрению\n\nВсё быстро и прозрачно!',
        'сроки': '⏱️ Сроки выполнения:\n\n• Экспресс - 24 часа\n• Углубленный - 48 часов\n• С аналитикой - 72 часа\n\nНачинаем сразу после получения данных!',
        'заказ': '📝 Отлично! Чтобы оформить заказ, заполните форму на сайте или напишите нам напрямую. Укажите:\n\n• Тип услуги\n• Описание задачи\n• Контактные данные\n\nМы свяжемся с вами в течение часа!'
    }
    
    for keyword, response in responses.items():
        if keyword in msg_lower:
            return response
    
    default_responses = [
        '🤔 Интересный вопрос! Расскажите подробнее, чем я могу помочь?',
        '💡 Хотите узнать о наших услугах, ценах или процессе работы?',
        '👍 Готов помочь! Задайте вопрос про исследование профиля - расскажу всё!'
    ]
    
    return random.choice(default_responses)

def handler(event: dict, context) -> dict:
    """
    API для общения с GPT-4. Принимает сообщение пользователя и возвращает ответ от AI ассистента.
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Парсим тело запроса
    try:
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message', '')
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Message is required'}),
                'isBase64Encoded': False
            }
        
        # Проверяем наличие API ключа
        api_key = os.environ.get('OPENAI_API_KEY', '')
        
        if not api_key or api_key == 'demo':
            # Mock режим для демонстрации
            assistant_reply = generate_mock_response(user_message)
            usage_info = {
                'prompt_tokens': 0,
                'completion_tokens': 0,
                'total_tokens': 0
            }
        else:
            try:
                # Инициализируем OpenAI клиент
                client = OpenAI(api_key=api_key)
                
                # Системный промпт для контекста услуги
                system_prompt = """Ты — AI-ассистент компании ProfilePro, которая специализируется на быстром исследовании профилей клиентов.

Наши услуги:
- Экспресс-анализ: базовое исследование профиля за 24 часа
- Углубленное исследование: полный анализ всех аспектов профиля за 48 часов
- Конфиденциальность: гарантия 100% защиты данных
- Аналитика роста: рекомендации по развитию профиля за 72 часа

Ты помогаешь клиентам:
- Выбрать подходящую услугу
- Ответить на вопросы о процессе работы
- Объяснить преимущества исследования профиля
- Направить на оформление заказа

Отвечай кратко, дружелюбно и по делу. Используй эмодзи для живости."""
                
                # Запрос к GPT-4
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    max_tokens=500,
                    temperature=0.7
                )
                
                assistant_reply = response.choices[0].message.content
                usage_info = {
                    'prompt_tokens': response.usage.prompt_tokens,
                    'completion_tokens': response.usage.completion_tokens,
                    'total_tokens': response.usage.total_tokens
                }
            except Exception:
                # Fallback на mock если OpenAI недоступен
                assistant_reply = generate_mock_response(user_message)
                usage_info = {
                    'prompt_tokens': 0,
                    'completion_tokens': 0,
                    'total_tokens': 0
                }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'reply': assistant_reply,
                'usage': usage_info
            }),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }