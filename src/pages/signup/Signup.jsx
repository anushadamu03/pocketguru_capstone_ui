import React, { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

  const navigate = useNavigate();

  const intialState = {
    name: "",
    email: "",
    password: "",
    bio: "",
    expertise:"",
    role:"",
  }
  const [formData, setFormData] = useState(intialState);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.bio) {
      newErrors.bio = "Please write your bio";
    }
    
    if (!formData.role) {
        newErrors.role = "Please choose a role";
      }
      if(formData.role == "Mentor" && !formData.expertise){
        newErrors.expertise = "Please write your expertise";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try{
      const result = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      if(result.data && result.status){
        setFormData(intialState);
        toast.success("You are registered successfully");
        navigate('/login')
      }
      console.log("Form submitted:", result);
    }catch (error) {
              toast.error("Data is not Invalid");
            }

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if(name == "role" && value == "Student"){
      setFormData((prev) => ({
        ...prev,
        ['expertise']: '',
      }));
    }

  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // console.log("formData==",formData)

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join us today! Please fill in your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={errors.bio ? "error" : ""}
              placeholder="write bio"
            />
            {errors.bio && <p className="error-message">{errors.bio}</p>}
          </div>

       

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="toggle-password"
              >
                {showPassword.password ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <div className="role-select">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? "error" : ""}
              >
                <option value="">Select a role</option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
               
              </select>
            </div>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

{
  formData.role == "Mentor" &&

          <div className="form-group">
            <label htmlFor="email">Expertise</label>
            <input
              type="text"
              id="expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className={errors.expertise ? "error" : ""}
              placeholder="write expertise"
            />
            {errors.expertise && (
              <p className="error-message">{errors.expertise}</p>
            )}
          </div>
          }

          {/* <div className="terms-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div> */}

          <button type="submit" className="submit-button">
            <UserPlus size={20} />
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
