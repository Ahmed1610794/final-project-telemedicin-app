const express = require('express');
const router = express.Router();
const db = require('./db'); // ملف قاعدة البيانات
const { isAdmin } = require('./auth'); // التحقق من صلاحيات الادمن

// الحصول على قائمة الأطباء
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM doctors');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// إضافة طبيب جديد (فقط للادمن)
router.post('/', isAdmin, async (req, res) => {
    const { name, specialization, availability } = req.body;

    try {
        await db.execute('INSERT INTO doctors (name, specialization, availability) VALUES (?, ?, ?)', [name, specialization, availability]);
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// تحديث معلومات الطبيب (فقط للادمن)
router.put('/:id', isAdmin, async (req, res) => {
    const doctorId = req.params.id;
    const { name, specialization, availability } = req.body;

    try {
        await db.execute('UPDATE doctors SET name = ?, specialization = ?, availability = ? WHERE id = ?', [name, specialization, availability, doctorId]);
        res.json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// حذف طبيب
router.delete('/:id', isAdmin, async (req, res) => {
    const doctorId = req.params.id;

    try {
        await db.execute('DELETE FROM doctors WHERE id = ?', [doctorId]);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;