from django.core.management.base import BaseCommand
from api.models import Product
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Populate the database with mock products'

    def handle(self, *args, **kwargs):
        fake = Faker()
        categories = ['Electronics', 'Groceries', 'Fashion', 'Home', 'Toys']

        for _ in range(100):
            name = fake.unique.word().capitalize()
            price = round(random.uniform(10.0, 99999.0), 2)
            description = fake.sentence(nb_words=5)

            Product.objects.create(
                name=name,
                price=price,
                description=description
            )

        self.stdout.write(self.style.SUCCESS('Successfully added 100 mock products.'))
