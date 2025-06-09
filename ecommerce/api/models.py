from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return f"{self.name} - ₹{self.price} ({self.description})"




class ChatLog(models.Model):
    session_id = models.CharField(max_length=50)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.CharField(max_length=10)

    def __str__(self):
        return f"[{self.timestamp}] {self.sender}: {self.message}"

