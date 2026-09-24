import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../services/employeeService";

const FIELDS = [
  { name: "name",       label: "Full Name",       type: "text",  placeholder: "e.g. Priya Sharma", required: true },
  { name: "email",      label: "Email Address",   type: "email", placeholder: "e.g. priya@company.com", required: true },
  { name: "title",      label: "Job Title",       type: "text",  placeholder: "e.g. Senior Frontend Engineer", required: true },
  { name: "department", label: "Department",      type: "text",  placeholder: "e.g. Engineering, Design, Product", required: true },
  { name: "role",       label: "Role",            type: "text",  placeholder: "e.g. Admin, Lead, Member", required: true },
  { name: "image",      label: "Avatar URL (Optional)", type: "url", placeholder: "https://... (leave empty for auto avatar)" },
];

const EmployeeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const createEmployee = async (data) => {
    try {
      setSubmitting(true);
      const res = await employeeService.createEmployee(data);
      if (res.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createEmployee)} className="form-container">
      {FIELDS.map(({ name, label, type, placeholder, required }) => (
        <div className="form-group" key={name}>
          <label className="form-label" htmlFor={name}>
            {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
          </label>
          <input
            id={name}
            className="form-input"
            type={type}
            placeholder={placeholder}
            {...register(name, { required: required ? `${label} is required` : false })}
          />
          {errors[name] && (
            <span style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>
              {errors[name].message}
            </span>
          )}
        </div>
      ))}

      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? "Saving to LocalStorage..." : "Create Employee"}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
};

export default EmployeeForm;
