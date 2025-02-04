import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '../config.js';
const BaseURL = config.BASE_URL;

function Signup() {
  const [userType, setUserType] = useState('mentee');
  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
      fieldOfInterest: [],
      goals: [],
      expertise: [],
      availability: 'Available',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      console.log('User Type:', userType);
      handleSignup(values);
    },
  });

  const handleSignup = async (values) => {
    const path = userType === 'mentor' ? `${BaseURL}/mentor/signup` : `${BaseURL}/mentee/signup`;

    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log('User signed up successfully');
        console.log('Token:', result.token);

        // Save token to localStorage
        localStorage.setItem('authToken', result.token);

        // Redirect user to a different page (e.g., Dashboard or Home page)
        setTimeout(() => {
          navigate('/'); // Navigate to home or dashboard page
        }, 2000);
      } else {
        console.error('Error signing up:', result.error);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow flex items-center justify-center">
        <Link to="/">
          <img src="/path/to/your/logo.svg" alt="Logo" className="w-24 h-24" />
        </Link>
      </div>
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

        <div className="flex mb-4">
          <button
            className={`border p-2 rounded-md mr-2 ${
              userType === 'mentee' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleUserTypeChange('mentee')}
          >
            I'm a Mentee
          </button>
          <button
            className={`border p-2 rounded-md ${
              userType === 'mentor' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleUserTypeChange('mentor')}
          >
            I'm a Mentor
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.name && formik.errors.name ? 'border-red-500' : ''
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : ''
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.bio && formik.errors.bio ? 'border-red-500' : ''
              }`}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
            )}
          </div>

          {userType === 'mentee' && (
            <>
              <div className="mb-4">
                <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
                  Field of Interest (Mentee)
                </label>
                <input
                  type="text"
                  id="fieldOfInterest"
                  name="fieldOfInterest"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formik.values.fieldOfInterest}
                  onChange={formik.handleChange}
                  placeholder="e.g., AI, Web Development"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  Goals (Mentee)
                </label>
                <input
                  type="text"
                  id="goals"
                  name="goals"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formik.values.goals}
                  onChange={formik.handleChange}
                  placeholder="e.g., Learn React, Build Portfolio"
                />
              </div>
            </>
          )}

          {userType === 'mentor' && (
            <>
              <div className="mb-4">
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                  Expertise (Mentor)
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formik.values.expertise}
                  onChange={formik.handleChange}
                  placeholder="e.g., Web Development, Data Science"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability (Mentor)
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formik.values.availability}
                  onChange={formik.handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500">
            Log in as a mentee or mentor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
