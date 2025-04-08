const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const OffenseRecord = require('./models/OffenseRecord'); 
const DriverList = require('./models/DriverList'); 
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://jeff:0101@cluster0.5hfy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// POST: Sign-up route (Create a new user)
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username: email, // Using email as username
      password, // Password should ideally be hashed
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// POST request to handle user sign-in
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the entered password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// POST: Create a new offense record
app.post('/offense-record', async (req, res) => {
  try {
    const offenseRecord = new OffenseRecord(req.body);
    await offenseRecord.save();
    res.status(201).json({ message: 'Offense record created successfully!' });
  } catch (err) {
    console.error('Error creating offense record:', err); // Log the error details
    res.status(500).json({ message: 'Failed to create offense record', error: err.message });
  }
});
;

// GET: Retrieve all offense records
app.get('/offense-records', async (req, res) => {
  try {
    const records = await OffenseRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve records', error: err });
  }
});

app.post('/driver-registration', async (req, res) => {
  try {
    const { licenseNo, lastName, firstName, middleName, dob, presentAddress, permanentAddress, civilStatus, nationality, contactNumber, licenseType, photo } = req.body;

    // Create a new driver object
    const newDriver = new DriverList({
      licenseNo,
      lastName,
      firstName,
      middleName,
      dob,
      presentAddress,
      permanentAddress,
      civilStatus,
      nationality,
      contactNumber,
      licenseType,
      photo,
    });

    // Save the driver to the database
    await newDriver.save();
    res.status(201).json({ message: 'Driver registered successfully!' });
  } catch (err) {
    console.error('Error registering driver:', err);
    res.status(500).json({ message: 'Failed to register driver', error: err });
  }
});


app.get('/drivers', async (req, res) => {
  try {
    const drivers = await DriverList.find(); // Fetch all drivers from the database
    res.status(200).json(drivers); // Send the driver data as JSON
  } catch (err) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ message: 'Failed to fetch drivers', error: err.message });
  }
});
// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection with error handling
// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://jeff:0101@cluster0.5hfy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Connected to MongoDB Atlas');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit process with failure
//   }
// };

// connectDB();

// // User Schema with password hashing
// const userSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: { 
//     type: String, 
//     required: true,
//     minlength: 6
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// const User = mongoose.model('User', userSchema);

// // Validation middleware
// const validateSignupInput = (req, res, next) => {
//   const { name, email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }
  
//   if (password.length < 6) {
//     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//   }
  
//   // Basic email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }
  
//   next();
// };

// // Routes
// app.post('/signup', validateSignupInput, async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check for existing user
//     const existingUser = await User.findOne({ username: email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create new user
//     const newUser = new User({
//       username: email,
//       password
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/signin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Input validation
//     if (!username || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Find user
//     const user = await User.findOne({ username: username.toLowerCase() });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Send success response (you might want to add JWT token here)
//     res.json({ message: 'Login successful!' });
//   } catch (err) {
//     console.error('Signin error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Offense Record routes
// app.post('/offense-record', async (req, res) => {
//   try {
//     const offenseRecord = new OffenseRecord(req.body);
//     await offenseRecord.save();
//     res.status(201).json({ message: 'Offense record created successfully!' });
//   } catch (err) {
//     console.error('Error creating offense record:', err);
//     res.status(500).json({ message: 'Failed to create offense record', error: err.message });
//   }
// });

// app.get('/offense-records', async (req, res) => {
//   try {
//     const records = await OffenseRecord.find().sort({ createdAt: -1 });
//     res.json(records);
//   } catch (err) {
//     console.error('Error fetching offense records:', err);
//     res.status(500).json({ message: 'Failed to retrieve records' });
//   }
// });

// // Start server with error handling
// const server = app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// server.on('error', (error) => {
//   if (error.code === 'EADDRINUSE') {
//     console.error(`Port ${port} is already in use`);
//     process.exit(1);
//   }
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   server.close(() => {
//     mongoose.connection.close();
//     console.log('Server terminated');
//   });
// });