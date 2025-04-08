import React, { useState } from 'react';
import './DriverRegistration.css'; // CSS for styling

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    licenseNo: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dob: '',
    presentAddress: '',
    permanentAddress: '',
    civilStatus: 'Single',
    nationality: '',
    contactNumber: '',
    licenseType: 'Student',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    // Optional: Add file type and size validation here
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({ ...formData, photo: file });
    } else {
      alert('Please upload a valid image file (JPEG or PNG).');
    }
  };

  const handleSave = async () => {
    if (formData.licenseNo && formData.firstName && formData.lastName) {
      const formDataCopy = { ...formData };
  
      if (formData.photo) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          formDataCopy.photo = reader.result; 
  
          try {
            const response = await fetch('http://localhost:5000/driver-registration', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formDataCopy),
            });
  
            const data = await response.json();
            if (response.ok) {
              alert('Driver registered successfully!');
              handleCancel(); 
            } else {
              alert(data.message || 'Failed to register driver');
            }
          } catch (err) {
            console.error('Error submitting form:', err);
          }
        };
        reader.readAsDataURL(formData.photo);
      } else {
        alert('Please upload a valid photo.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    setFormData({
      licenseNo: '',
      lastName: '',
      firstName: '',
      middleName: '',
      dob: '',
      presentAddress: '',
      permanentAddress: '',
      civilStatus: 'Single',
      nationality: '',
      contactNumber: '',
      licenseType: 'Student',
      photo: null,
    });
  };

  return (
    <div className="driver-registration-container">
      <h2>Driver Registration</h2>

      <div className="form-group">
        <label htmlFor="licenseNo">License No.</label>
        <input
          type="text"
          name="licenseNo"
          id="licenseNo"
          value={formData.licenseNo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          name="middleName"
          id="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth (DOB)</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="presentAddress">Present Address</label>
        <textarea
          name="presentAddress"
          id="presentAddress"
          value={formData.presentAddress}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="permanentAddress">Permanent Address</label>
        <textarea
          name="permanentAddress"
          id="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="civilStatus">Civil Status</label>
        <select
          name="civilStatus"
          id="civilStatus"
          value={formData.civilStatus}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="nationality">Nationality</label>
        <input
          type="text"
          name="nationality"
          id="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          id="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="licenseType">License Type</label>
        <select
          name="licenseType"
          id="licenseType"
          value={formData.licenseType}
          onChange={handleChange}
        >
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
          <option value="Non-Professional">Non-Professional</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpeg, image/png"
          onChange={handlePhotoUpload}
        />
        {formData.photo && (
          <div className="photo-preview">
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Driver"
              width="100"
            />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        <button onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DriverRegistration;
