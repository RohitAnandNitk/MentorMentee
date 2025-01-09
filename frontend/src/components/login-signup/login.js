import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const [userType, setUserType] = useState('mentee');

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      console.log('User Type:', userType);
      // Handle login logic here
    },
  });

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 bg-blue-500 flex items-center justify-center">
      <Link to="/">
    <img src="/path/to/your/logo.svg" alt="Logo" className="w-24 h-24" />
  </Link>
      </div>
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">Log In</h1>

        <div className="flex mb-4">
          <button
            className={`border p-2 rounded-md mr-2 ${
              userType === 'mentee' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleUserTypeChange('mentee')}
          >
            I'm a Mentee
          </button>
          <button
            className={`border p-2 rounded-md ${
              userType === 'mentor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleUserTypeChange('mentor')}
          >
            I'm a Mentor
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or Username
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Log In
          </button>
        </form>

        <div className="mt-4">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot password?
          </Link>
        </div>

        <div className="mt-2">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue-500">
            Sign up as a mentee or apply to be a mentor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
