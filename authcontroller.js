const bcrypt = require('bcryptjs');
const db = require('../config/database');  


exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const [existingPatient] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
    if (existingPatient.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    await db.execute('INSERT INTO patients (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};


exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
    const patient = rows[0];

    
    if (!patient || !(await bcrypt.compare(password, patient.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

   
    req.session.patientId = patient.id;
    req.session.patientName = patient.name;

    res.json({ message: 'Logged in successfully', patientId: patient.id });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};


exports.logoutPatient = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

