# 🚀 V2 Nao4You - Backend

## 🔐 Firebase Authentication Setup with Node.js

👉 [Firebase Authentication Node.js Guide](https://permify.co/post/firebase-authentication-nodejs/)

---

## 📌 Prerequisites Before Running

### 1️⃣ Set Up Environment Variables
Create a `.env` file at the root of the project and add your Firebase configurations.

#### 📄 Example `.env` File
```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
FIREBASE_SERVICE_ACCOUNT=./FirebaseService.json
```

🛠 **Replace `your_project_id`, `your_api_key`, and other placeholders with actual values from your Firebase setup.**

---

### 2️⃣ Download the `FirebaseService.json` File
This file is required to grant Node.js access to Firebase's administrative features.

#### 📄 Example `FirebaseService.json` File
```json
{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@your_project_id.iam.gserviceaccount.com",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk@your_project_id.iam.gserviceaccount.com"
}
```

---

### 3️⃣ Install Dependencies
Run the following command to install the required Node.js dependencies:
```sh
npm install
```

### 4️⃣ Start the Server
Launch the backend server with:
```sh
npm run start
```

### 5️⃣ Test Endpoints Using Postman
Use Postman to test API endpoints:
👉 [Download Postman](https://www.postman.com/)

---

✅ **You're all set! The backend is now configured and running.** 🚀