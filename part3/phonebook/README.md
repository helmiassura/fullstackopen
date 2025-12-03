# Phonebook Backend

Backend application for phonebook with MongoDB database integration.

## 🚀 Live Demo

**Deployed URL**: https://fullstackopen-production-b282.up.railway.app

## 📋 API Endpoints

### Get all persons
```
GET /api/persons
```

### Get single person
```
GET /api/persons/:id
```

### Add new person
```
POST /api/persons
Content-Type: application/json

{
  "name": "John Doe",
  "number": "09-1234567"
}
```

### Update person
```
PUT /api/persons/:id
Content-Type: application/json

{
  "name": "John Doe",
  "number": "09-9999999"
}
```

### Delete person
```
DELETE /api/persons/:id
```

### Get info
```
GET /info
```

## ✅ Validation Rules

### Name
- Required
- Minimum 3 characters

### Phone Number
- Required
- Minimum 8 characters
- Format: `XX-XXXXXXX` or `XXX-XXXXXXX`
  - First part: 2-3 digits
  - Second part: numbers only
  - Separated by dash (-)

**Valid examples:**
- `09-1234556`
- `040-22334455`

**Invalid examples:**
- `1234556` (no dash)
- `1-22334455` (first part too short)
- `10-22-334455` (multiple dashes)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Deployment**: Railway
- **Environment Variables**: dotenv

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/helmiassura/fullstackopen.git
cd fullstackopen/part3/phonebook

# Install dependencies
npm install

# Create .env file
# Add: MONGODB_URI=your_mongodb_connection_string

# Run development server
npm run dev

# Run production server
npm start
```

## 🧪 Testing with curl
```bash
# Get all persons
curl https://fullstackopen-production-b282.up.railway.app/api/persons

# Add new person
curl -X POST https://fullstackopen-production-b282.up.railway.app/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","number":"09-1234567"}'

# Test validation error (name too short)
curl -X POST https://fullstackopen-production-b282.up.railway.app/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"ab","number":"09-1234567"}'
```

## 📝 Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebookApp
PORT=3001
```

## 🎯 Features

- ✅ RESTful API design
- ✅ MongoDB integration with Mongoose
- ✅ Data validation (name and phone)
- ✅ Custom validators for phone format
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Deployed to production

## 📚 Course

This project is part of [Full Stack Open](https://fullstackopen.com/) course by University of Helsinki.


## 👤 Author

**Muhammad Helmi Assura**
- GitHub: [@helmiassura](https://github.com/helmiassura)

