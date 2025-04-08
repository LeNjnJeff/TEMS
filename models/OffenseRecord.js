const mongoose = require('mongoose');

const offenseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  fine: { type: Number, required: true },
});

const offenseRecordSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  officerName: { type: String, required: true },
  officerId: { type: String, required: true },
  ticketNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
  offenses: [offenseSchema], // Array of offenses
  remarks: { type: String },
});

const OffenseRecord = mongoose.model('OffenseRecord', offenseRecordSchema);

module.exports = OffenseRecord;
