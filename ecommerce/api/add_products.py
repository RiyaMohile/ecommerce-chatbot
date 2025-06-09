import os
import sys
import django

# Adjust path to your project root folder (one level up from 'api' folder)
sys.path.append(os.path.dirname(os.path.abspath(__file__)).replace('\\api', ''))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from api.models import Product

products = [
    {"name": "iPhone", "category": "Mobile", "price": 69999, "description": "Apple smartphone"},
    {"name": "Galaxy S23", "category": "Mobile", "price": 62999, "description": "Samsung smartphone"},
    {"name": "MacBook Air", "category": "Laptop", "price": 99999, "description": "Apple laptop"},
]

for p in products:
    Product.objects.get_or_create(**p)

print("✅ Sample products added")
