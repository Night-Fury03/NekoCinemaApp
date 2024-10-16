// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyALYzg1hzFwWKFMxWoVXAaDrjBGYBANkaA",
  authDomain: "nekocinema-1791c.firebaseapp.com",
  projectId: "nekocinema-1791c",
  storageBucket: "nekocinema-1791c.appspot.com",
  messagingSenderId: "447064736793",
  appId: "1:447064736793:web:1b3c53b5a1f2d4bf6f9688",
//   measurementId: "G-R2ETMJ5HSR"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Khởi tạo các dịch vụ bạn muốn sử dụng
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
