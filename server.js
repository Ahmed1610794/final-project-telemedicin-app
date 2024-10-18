const express = require('express');
const session = require('express-session');
const authRoutes = require('./auth');
const patientRoutes = require('./patient');
const doctorRoutes = require('./doctor');
const appointmentRoutes = require('./appointment');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // غيّر secure إلى true في حالة استخدام HTTPS
}));

// Routes
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// Start the server
const port = process.env.PORT ;
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});