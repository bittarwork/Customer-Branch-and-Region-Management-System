const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB DataBase"))
    .catch((err) => {
        console.error("💥 NOT CONNECTED TO NETWORK : ", err.message);
        process.exit(1); // إنهاء العملية في حال فشل الاتصال بقاعدة البيانات
    });

// مسارات المستخدمين
const userRoutes = require('./routes/userRoutes');
const regionRoutes = require('./routes/regionRoutes');
const branchRoutes = require('./routes/branchRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/api/users', userRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);


// التقاط الأخطاء العامة غير الملتقطة
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Something went wrong!" });
});

// بدء تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
