# 🌳 Tree Donation Platform

A full-stack web application that allows users to donate trees and assigns them to the nearest NGO using geolocation and the Haversine formula. Built with Node.js, Express, MySQL, React, Vite, and TailwindCSS.

## ✨ Features

### User Features
- 🌱 **Tree Donation**: Donate trees with geolocation-based NGO assignment
- 📍 **Automatic Location Detection**: Uses browser geolocation API
- 🗂️ **Donation History**: View all donated trees with assigned NGO details
- 💬 **Personal Messages**: Add optional messages with tree donations
- 🎯 **Nearest NGO Assignment**: Automatically assigns trees to closest NGO using Haversine formula

### NGO Features  
- 📊 **Dashboard Analytics**: View total trees donated and donation statistics
- 📋 **Donation Management**: See all received donations with donor details
- 🗺️ **Location Mapping**: View donation locations on Google Maps
- 📧 **Donor Information**: Access donor contact details and messages

### Technical Features
- 🔄 **Real-time Updates**: Dynamic data fetching and updates
- 📱 **Responsive Design**: Mobile-friendly interface with TailwindCSS
- 🛡️ **Error Handling**: Comprehensive error handling and user feedback
- 🚀 **Performance**: Optimized with React hooks and efficient API calls

## 🏗️ Architecture

```
├── backend/                 # Node.js + Express API
│   ├── config/
│   │   └── db.js           # MySQL database connection
│   ├── controllers/        # Business logic
│   │   ├── userController.js
│   │   └── ngoController.js
│   ├── routes/             # API routes
│   │   ├── userRoutes.js
│   │   └── ngoRoutes.js
│   ├── database/
│   │   └── schema.sql      # Database schema and sample data
│   └── server.js           # Express server setup
│
├── frontend/               # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── UserDashboard.jsx
│   │   │   └── NGODashboard.jsx
│   │   ├── services/       # API integration
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # TailwindCSS styles
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/HEMANTHSV31/HEMANTH_SV.git
cd HEMANTH_SV
```

### 2. Database Setup
1. Install and start MySQL server
2. Create the database and tables:
```bash
mysql -u root -p < backend/database/schema.sql
```

### 3. Backend Setup
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=tree_donation
# PORT=5000

# Start the backend server
npm run dev
```

The API will be available at `http://localhost:5000`

### 4. Frontend Setup
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### NGOs Table
```sql
CREATE TABLE ngos (
    ngo_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Trees Table
```sql
CREATE TABLE trees (
    tree_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ngo_id INT NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (ngo_id) REFERENCES ngos(ngo_id)
);
```

## 🛠️ API Endpoints

### User Endpoints
- **POST** `/api/users/donate-tree`
  - Donate trees with automatic NGO assignment
  - Body: `{ userId, latitude, longitude, name, email, location, numberOfTrees, message }`

- **GET** `/api/users/my-trees/:userId`
  - Get all trees donated by a user
  - Returns: User's trees with assigned NGO information

### NGO Endpoints
- **GET** `/api/ngos/my-donations/:ngoId`
  - Get all donations received by an NGO
  - Returns: NGO details, total trees, and donation list

## 🧮 Haversine Formula Implementation

The application uses the Haversine formula to calculate distances between coordinates and find the nearest NGO:

```javascript
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};
```

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Modals**: Smooth donation form and success modals
- **Loading States**: Clear feedback during API calls
- **Error Handling**: User-friendly error messages
- **Geolocation Integration**: Automatic location detection
- **Real-time Updates**: Dynamic data refresh
- **Map Integration**: Google Maps links for donation locations

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing  
```bash
cd frontend
npm test
```

### API Testing with cURL
```bash
# Donate a tree
curl -X POST http://localhost:5000/api/users/donate-tree \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"latitude":12.9716,"longitude":77.5946,"name":"John Doe","email":"john@example.com","location":"Bangalore","numberOfTrees":2,"message":"For a greener future"}'

# Get user trees
curl http://localhost:5000/api/users/my-trees/1

# Get NGO donations
curl http://localhost:5000/api/ngos/my-donations/1
```

## 🚀 Deployment

### Backend Deployment
1. Set up production database
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle:
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hemanth SV**
- LinkedIn: [Hemanth S V](https://www.linkedin.com/in/hemanth-s-v-2610b0329/)
- GitHub: [@HEMANTHSV31](https://github.com/HEMANTHSV31)

## 🙏 Acknowledgments

- React team for the amazing framework
- MySQL for reliable database management
- TailwindCSS for beautiful styling
- All NGOs working towards reforestation

---

Made with ❤️ and 🌱 for a greener planet!
