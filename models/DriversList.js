const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  licenseNo: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: String,
  dob: Date,
  presentAddress: String,
  permanentAddress: String,
  civilStatus: { type: String, default: 'Single' },
  nationality: String,
  contactNumber: String,
  licenseType: { type: String, default: 'Student' },
  photo: { type: String }, 
});

module.exports = mongoose.model('DriverList', driverSchema);
