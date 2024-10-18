const express = require('express');
const router = express.Router();
const db = require('./db'); // ملف قاعدة البيانات
const { isAuthenticated } = require('./auth'); // التحقق من جلسة المستخدم

// الحصول على ملف البروفايل
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const patientId = req.session.patientId;
        const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [patientId]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// تحديث بيانات المريض
router.put('/profile', isAuthenticated, async (req, res) => {
    const { name, email } = req.body; // استلام البيانات الجديدة

    try {
        const patientId = req.session.patientId;
        await db.execute('UPDATE patients SET name = ?, email = ? WHERE id = ?', [name, email, patientId]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// حذف حساب المريض
router.delete('/account', isAuthenticated, async (req, res) => {
    try {
        const patientId = req.session.patientId;
        await db.execute('DELETE FROM patients WHERE id = ?', [patientId]);
        req.session.destroy(); // إنهاء الجلسة
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;