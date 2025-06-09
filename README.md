
# 🛒 E-commerce Sales Chatbot (React + Django)

An AI-powered sales assistant chatbot that helps users search for products via natural language queries. Built using **React**, **Django REST Framework**, and JWT-based authentication.

---

##  Features

-  User authentication (Signup/Login) with JWT
-  Chat interface for product queries
-  AI chatbot response using keyword-based product search
-  Dark/Light mode toggle
-  Displays product info (name, price, description)
-  Chat history logged in the backend
-  Admin command to auto-populate 100+ mock products (via Faker)

---

## Tech Stack

| Layer         | Technology                |
|---------------|---------------------------|
| Frontend      | React + TailwindCSS       |
| Backend       | Django + Django REST Framework |
| Auth          | JWT (via Simple JWT)      |
| Database      | SQLite (default)          |
| Data Gen      | Faker (for mock data)     |

---

##  Setup Instructions

###  Backend (Django)

1. Clone the repo  
   ```bash
   git clone https://github.com/RiyaMohile/ecommerce-chatbot.git
   cd ecommerce-chatbot/ecommerce
   ```

2. Create and activate virtual environment  
   ```bash
   python -m venv env
   source env/bin/activate  # or env\Scripts\activate on Windows
   ```

3. Install dependencies  
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations  
   ```bash
   python manage.py migrate
   ```

5. Create superuser (optional)  
   ```bash
   python manage.py createsuperuser
   ```

6. Populate mock data  
   ```bash
   python manage.py populate_products
   ```

7. Run the server  
   ```bash
   python manage.py runserver
   ```

###  Frontend (React)

1. Navigate to the frontend folder  
   ```bash
   cd ../frontend
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Run the app  
   ```bash
   npm start
   ```

> Make sure both frontend and backend servers are running!

---

##  Screenshots (Optional)

<details>
  <summary>Login Page</summary>
  <img src="/screenshots/login.png" width="400" />
</details>

<details>
  <summary>Chat Interface (Dark/Light Mode)</summary>
  <img src="/screenshots/chat.png" width="400" />
</details>

---

## Sample Queries

- "Show me laptops under 50000"
- "Do you have any smartwatches?"
- "Suggest a phone with good battery"

---

##  Project Structure

```
ecommerce-chatbot/
│
├── ecommerce/               # Django backend
│   ├── api/                 # API app: models, views, serializers
│   ├── manage.py            # Django entry point
│   └── ...
│
├── frontend/                # React frontend
│   ├── components/          # ChatBox, Login, Signup
│   ├── App.js               # Main React app
│   └── ...
│
└── README.md                # This file
```

---

## Learnings & Challenges

- Integrated JWT auth flow across frontend/backend
- Ensured dark/light theme support using Tailwind
- Used `Faker` to dynamically populate product data
- Designed reusable, clean React components
- Faced and resolved CORS, token expiration, and async issues

---

---

##  Contributors

- [Riya Mohile](https://github.com/RiyaMohile)
