# REA's Planning - MERN Stack Web App

REA's Planning is a full-stack web application designed to simplify the process of planning and booking vendors for events like weddings, parties, and more. The app allows service providers (vendors) to register, manage their service details and packages, and view customer bookings and notifications.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Local)
- **Authentication**: JWT
- **Environment Management**: `.env` (both client and server)

---

## 📁 Project Structure

```
REA-Planning/
├── client/                # Frontend (Vite + React)
│   ├── .env              # Frontend environment variables
│   └── src/
├── server/                # Backend (Express)
│   ├── .env              # Backend environment variables
│   ├── routes/           # Express route files
│   ├── controllers/      # Business logic
│   └── models/           # Mongoose models
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/shabab-haider/REA-Planning.git
```

2. **Set up Environment Variables**

- **Frontend (.env)**
```
VITE_BASE_URL=http://localhost:4000
```

- **Backend (.env)**
```
PORT=4000
MONGO_URI=mongodb://0.0.0.0
JWT_SECRET=your_jwt_secret
VITE_BASE_URL=http://localhost:5173
```

3. **Install Dependencies**
```bash
cd client
npm install
cd ../server
npm install
```

4. **Run the Application**
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm run dev
```

---

## 📌 API Endpoints

### 🟦 Vendor Routes
- `POST   /vendors/register` - Register a new vendor
- `POST   /vendors/login` - Vendor login
- `GET    /vendors/dashboard` - Fetch vendor dashboard (auth)
- `POST   /vendors/venue` - Create venue service
- `POST   /vendors/transportation` - Create transportation service
- `POST   /vendors/salon` - Create salon service
- `POST   /vendors/photography` - Create photography service
- `PUT    /vendors/packages` - Update vendor packages
- `GET    /vendors/photographers` - Get all photographers
- `GET    /vendors/salons` - Get all salons
- `GET    /vendors/transportation` - Get all transport services
- `GET    /vendors/venues` - Get all venues
- `GET    /vendors/:vendorId/packages` - Get packages for a specific vendor
- `GET    /vendors/notifications` - Get notifications for vendor (auth required)
- `POST   /vendors/bookedDates/add` - Block a date
- `POST   /vendors/bookedDates/remove` - Unblock a date
- `GET    /vendors/bookedDates` - Get blocked dates
- `POST   /vendors/available-vendors` - Get available vendors
- `POST   /vendors/packages` - Get vendor packages
- `POST   /vendors/packages/delete` - Delete a vendor package
- `POST   /vendors/packages/add` - Add a vendor package

### 🟩 Booking Routes
- `POST   /bookings/create/:vendorId` - Create a new booking for the vendor
- `POST   /bookings/statusUpdate` - Update booking status

---

## 👤 Author

**Syed Shabab Haider**  
MERN Stack Developer & Final Year IT Student  
📧 Shababh436@gmail.com  
📍 Kotli Said Ameer, Sialkot, Punjab, Pakistan  
🔗 [GitHub: shabab-haider](https://github.com/shabab-haider)

---

## 📄 License

This project is for educational and portfolio purposes only. All rights reserved.

---

Feel free to contribute, fork, or reach out for collaboration!
