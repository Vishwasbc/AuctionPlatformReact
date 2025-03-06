import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import userService from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faCalendarAlt,
  faVenusMars,
  faUserTag,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import './styles/Register.css' // Import the custom CSS

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    role: 'BIDDER',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    birthDate: '',
    gender: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const formattedData = {
      ...formData,
      birthDate: format(new Date(formData.birthDate), 'dd-MM-yyyy'),
    };

    try {
      await userService.register(formattedData);
      setMessage('Registration successful. Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data || 'Registration failed.');
    }
  };

  return (
    <div className="register-page">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: '900px',
            width: '100%',
            borderRadius: '15px',
          }}
        >
          <h2 className="text-center mb-4 text-primary">
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </h2>
          {/* Removed the line between heading and form */}
          {message && (
            <div
              className={`alert ${
                message.includes('successful')
                  ? 'alert-success'
                  : 'alert-danger'
              } text-center`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              {/* Account Details Section */}
              <div className="col-md-6 pe-md-5">
                <h3 className="mb-4 text-secondary">Account Details</h3>
                {/* Username */}
                <div className="mb-3">
                  <label
                    htmlFor="userName"
                    className="form-label h5 text-secondary"
                  >
                    Username
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} className="text-danger" />
                    </span>
                    <input
                      id="userName"
                      name="userName"
                      className="form-control"
                      placeholder="Enter username"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label h5 text-secondary"
                  >
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} className="text-danger" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      title="Password must contain at least one digit, one letter, and be at least 8 characters"
                      required
                    />
                    <span
                      className="input-group-text password-toggle"
                      onClick={togglePasswordVisibility}
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-danger"
                      />
                    </span>
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label h5 text-secondary"
                  >
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} className="text-danger" />
                    </span>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="input-group-text password-toggle"
                      onClick={toggleConfirmPasswordVisibility}
                      title={
                        showConfirmPassword ? 'Hide Password' : 'Show Password'
                      }
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className="text-danger"
                      />
                    </span>
                  </div>
                </div>
                {/* Email */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label h5 text-secondary"
                  >
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-danger"
                      />
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* Role */}
                <div className="mb-4">
                  <label htmlFor="role" className="form-label h5 text-secondary">
                    Role
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={faUserTag}
                        className="text-danger"
                      />
                    </span>
                    <select
                      id="role"
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="BIDDER">Bidder</option>
                      <option value="SELLER">Seller</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="col-md-1 d-none d-md-flex align-items-center">
                <div className="divider-line"></div>
              </div>

              {/* Personal Information Section */}
              <div className="col-md-5 ps-md-5">
                <h3 className="mb-4 text-secondary">Personal Information</h3>
                {/* First Name */}
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className="form-label h5 text-secondary"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Last Name */}
                <div className="mb-3">
                  <label
                    htmlFor="lastName"
                    className="form-label h5 text-secondary"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Contact Number */}
                <div className="mb-3">
                  <label
                    htmlFor="contactNo"
                    className="form-label h5 text-secondary"
                  >
                    Contact Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-danger"
                      />
                    </span>
                    <input
                      id="contactNo"
                      name="contactNo"
                      className="form-control"
                      placeholder="Enter contact number"
                      value={formData.contactNo}
                      onChange={handleChange}
                      
                      title="Contact number must be exactly 10 digits"
                      required
                    />
                  </div>
                </div>
                {/* Birth Date */}
                <div className="mb-3">
                  <label
                    htmlFor="birthDate"
                    className="form-label h5 text-secondary"
                  >
                    Birth Date
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-danger"
                      />
                    </span>
                    <input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      className="form-control"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* Gender */}
                <div className="mb-3">
                  <label
                    htmlFor="gender"
                    className="form-label h5 text-secondary"
                  >
                    Gender
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={faVenusMars}
                        className="text-danger"
                      />
                    </span>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      {/* Add more options if needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-success mb-3">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </button>
            </div>
            {/* Link to Login */}
            <p className="text-center">
              Already have an account?{' '}
              <a href="/login" className="text-decoration-none text-primary">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
