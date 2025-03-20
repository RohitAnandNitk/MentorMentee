import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import config from "../config.js";

const BaseURL = config.BASE_URL;

function Signup() {
  const [userType, setUserType] = useState("mentee");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      skills: [],
      availability: "Available",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
      bio: Yup.string().max(500, "Bio must be under 500 characters"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "skills") {
          value.forEach((skill) => formData.append("skills", skill));
        } else {
          formData.append(key, value);
        }
      });

      await handleSignup(formData);
    },
  });

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post(
        `${BaseURL}/${userType}/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
          },
        }
      );

      const result = await response.json();

      console.log("Server Response:", result);

      if (response.ok) {
        console.log("Signup Successful");
        if (userType === "mentee") {
          navigate("/menteeDash");
        } else {
          navigate("/mentorDash");
        }
      } else {
        console.error("Signup Error:", result.error);
      }

      console.log("User signed up successfully:", result);
      localStorage.setItem("authToken", result.token);

      // navigate("/dashboard"); // Redirect after successful signup
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 bg-gray-100 p-6 flex items-center justify-center">
        <Link to="/">
          <img src="/path/to/logo.svg" alt="Logo" className="w-24 h-24" />
        </Link>
      </div>

      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <div className="flex mb-4">
          {["mentee", "mentor"].map((type) => (
            <button
              key={type}
              className={`border p-2 rounded-md mr-2 ${
                userType === type
                  ? "bg-slate-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUserType(type)}
            >
              I'm a {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={formik.handleSubmit}>
          {["name", "email", "password", "bio"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                className="mt-1 p-2 w-full border rounded-md"
                {...formik.getFieldProps(field)}
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            />
          </div>

          {userType === "mentee" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    formik.setFieldValue("skills", [
                      ...formik.values.skills,
                      e.target.value.trim(),
                    ]);
                    e.target.value = "";
                  }
                }}
                placeholder="Add a skill and press Enter"
              />
              <div className="flex flex-wrap mt-2">
                {formik.values.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm mr-2 mb-2"
                  >
                    {skill}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue(
                          "skills",
                          formik.values.skills.filter((_, i) => i !== index)
                        )
                      }
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
