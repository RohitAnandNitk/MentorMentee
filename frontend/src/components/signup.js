import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '../config.js';

const BaseURL = config.BASE_URL;

function Signup() {
  const [userType, setUserType] = useState('mentee');
  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setSkills([]); 
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (!skills.includes(newSkill)) {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        formik.setFieldValue('skills', updatedSkills);
      }
      e.target.value = '';
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    formik.setFieldValue('skills', updatedSkills);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
      skills: [],
      availability: 'Available',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('bio', values.bio);
      formData.append('availability', values.availability);
      
      skills.forEach((skill) => formData.append('skills', skill));
      if (image) {
        formData.append('image', image);
      }

      await handleSignup(formData);
    },
  });

  const handleSignup = async (formData) => {
    const path = userType === 'mentor' ? `${BaseURL}/mentor/signup` : `${BaseURL}/mentee/signup`;

    try {
      const response = await fetch(path, {
        method: 'POST',
        body: formData, // Do NOT set 'Content-Type' manually
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log('User signed up successfully');
        localStorage.setItem('authToken', result.token);
        navigate('/dashboard'); // Redirect after successful signup
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
            className={`border p-2 rounded-md mr-2 ${userType === 'mentee' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleUserTypeChange('mentee')}
          >
            I'm a Mentee
          </button>
          <button
            className={`border p-2 rounded-md ${userType === 'mentor' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleUserTypeChange('mentor')}
          >
            I'm a Mentor
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              className="mt-1 p-2 w-full border rounded-md"
              {...formik.getFieldProps('bio')}
            />
            {formik.touched.bio && formik.errors.bio && <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input type="file" accept="image/*" className="mt-1 p-2 w-full border rounded-md" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />}
          </div>

          
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Skills (Mentee)</label>
              <input type="text" className="mt-1 p-2 w-full border rounded-md" onKeyDown={handleSkillKeyDown} placeholder="Add a skill and press Enter" />
              <div className="flex flex-wrap mt-2">{skills.map((skill, index) => (
                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm mr-2 mb-2">{skill} <button type="button" onClick={() => removeSkill(index)}>✕</button></span>
              ))}</div>
            </div>


          <button type="submit" className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
