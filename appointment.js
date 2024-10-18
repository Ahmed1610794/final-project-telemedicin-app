const express = require('express');
const router = express.Router();
const db = require('./db'); // ملف قاعدة البيانات
const { isAuthenticated } = require('./auth'); // التحقق من جلسة المستخدم

// حجز موعد
router.post('/', isAuthenticated, async (req, res) => {
    const { doctorId, dateTime } = req.body;

    try {
        const patientId = req.session.patientId;
        await db.execute('INSERT INTO appointments (patientId, doctorId, dateTime) VALUES (?, ?, ?)', [patientId, doctorId, dateTime]);
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// الحصول على المواعيد المستقبلية للمريض
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const patientId = req.session.patientId;
        const [rows] = await db.execute('SELECT * FROM appointments WHERE patientId = ?', [patientId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// تحديث موعد
router.put('/:id', isAuthenticated, async (req, res) => {
    const appointmentId = req.params.id;
    const { dateTime } = req.body;

    try {
        await db.execute('UPDATE appointments SET dateTime = ? WHERE id = ?', [dateTime, appointmentId]);
        res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// إلغاء موعد
router.delete('/:id', isAuthenticated, async (req, res) => {
    const appointmentId = req.params.id;

    try {
        await db.execute('DELETE FROM appointments WHERE id = ?', [appointmentId]);
        res.json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;