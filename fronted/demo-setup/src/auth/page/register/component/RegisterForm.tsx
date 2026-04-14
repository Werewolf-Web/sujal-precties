import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../../common-components/common-button/ButtonPrimary";
import InputType from "../../../../common-components/common-input-type/InputType";
import { Bounce, toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    id: new Date().getTime().toString(),
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_active: false,
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Password not match", { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
    //   return;
    // }
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      setFormData({
      id: new Date().getTime().toString(),
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      is_active: false,
    });
    }
  };

  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm">
            Join us and start your journey today
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputType
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />

          <InputType
            id="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputType
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <InputType
              id="confirmPassword"
              type="password"
              label="Confirm"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <label> is active </label>
          </div>
          <ButtonPrimary
            title="Create Account"
            type="submit"
            className="w-full"
          />
        </form>
        {/* <button
          className="
            py-3.5 px-4 rounded-xl
            bg-linear-to-r from-blue-600 to-indigo-600
            text-white font-semibold text-lg
            transition-all duration-300
          "
          onClick={() => handledata()}
        >
          call get api
        </button> */}
        <div className="text-center pt-2">
          <p className="text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
        <ButtonPrimary
          title="Go to User Table"
          onClick={() => navigate("/user/table")}
          className="w-full"
        />
      </div>
      <div></div>
    </>
  );
};

export default RegisterForm;
