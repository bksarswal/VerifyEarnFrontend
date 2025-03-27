import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form fields
      const newErrors = {};
      if (!formData.email) newErrors.email = "*Email is required";
      if (!formData.password) newErrors.password = "*Password is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // Here you would typically call your backend API for authentication
      // For now, we'll simulate a successful login
      console.log('Login data:', formData);

      // ✅ Admin Credentials Check (now using hardcoded values)
      const adminEmail = "ram@gmail.com";
      const adminPassword = "ram@12345";

      if (formData.email === adminEmail && formData.password === adminPassword) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admindashboard");
      } else {
        localStorage.setItem("isAdmin", "false");
        navigate("/dashboard");
      }

      localStorage.setItem("userToken", "true");
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({ auth: "*An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-14 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-[30px] bg-[#F2FAFA] p-8 relative">
        <h2 className="text-[48px] font-bold text-center mb-8 font-poppins">Signin</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.password}</p>}
          </div>

          <div className="text-center">
            <a href="/resetpassword" className="text-[#2196F3] hover:text-[#1976D2] font-poppins">
              Forgot password
            </a>
          </div>

          {errors.auth && <p className="text-red-500 text-center">{errors.auth}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 disabled:opacity-50 transition-colors font-poppins text-[18px]"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center font-poppins">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#2196F3] hover:text-[#1976D2]">
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;