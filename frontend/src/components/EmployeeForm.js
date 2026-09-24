import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FIELDS = [
  { name: "name",       label: "Full Name",   type: "text",  placeholder: "e.g. Priya Sharma" },
  { name: "email",      label: "Email Address", type: "email", placeholder: "e.g. priya@company.com" },
  { name: "title",      label: "Job Title",   type: "text",  placeholder: "e.g. Senior Engineer" },
  { name: "department", label: "Department",  type: "text",  placeholder: "e.g. Engineering" },
  { name: "role",       label: "Role",        type: "text",  placeholder: "e.g. Admin / Member" },
];

const EmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const createEmployee = async (data) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createEmployee)} className="form-container">
      {FIELDS.map(({ name, label, type, placeholder }) => (
        <div className="form-group" key={name}>
          <label className="form-label" htmlFor={name}>
            {label}
          </label>
          <input
            id={name}
            className="form-input"
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
        </div>
      ))}

      <button type="submit" className="form-submit">
        Create Employee
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
};

export default EmployeeForm;
