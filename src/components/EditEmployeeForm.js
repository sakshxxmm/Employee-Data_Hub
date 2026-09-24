import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { employeeService } from "../services/employeeService";

const FIELDS = [
  { name: "name",       label: "Full Name",       type: "text",  placeholder: "e.g. Priya Sharma", required: true },
  { name: "email",      label: "Email Address",   type: "email", placeholder: "e.g. priya@company.com", required: true },
  { name: "title",      label: "Job Title",       type: "text",  placeholder: "e.g. Senior Frontend Engineer", required: true },
  { name: "department", label: "Department",      type: "text",  placeholder: "e.g. Engineering", required: true },
  { name: "role",       label: "Role",            type: "text",  placeholder: "e.g. Admin / Member / Lead", required: true },
];

const EditEmployeeForm = () => {
  const { userId } = useParams();
  const [empData, setEmpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const res = await employeeService.getEmployeeById(userId);
      if (res.success && res.data) {
        setEmpData(res.data);
      } else {
        alert("Employee not found in local storage.");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (empData) {
      FIELDS.forEach(({ name }) => setValue(name, empData[name] || ""));
    }
  }, [empData, setValue]);

  const editEmployee = async (data) => {
    try {
      setSaving(true);
      const res = await employeeService.updateEmployee(userId, data);
      if (res.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="table-wrapper" style={{ padding: "2rem" }}>
        <div className="skeleton" style={{ height: "48px", marginBottom: "1rem" }} />
        <div className="skeleton" style={{ height: "48px", marginBottom: "1rem" }} />
        <div className="skeleton" style={{ height: "48px" }} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(editEmployee)} className="form-container">
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

      <button type="submit" className="form-submit" disabled={saving}>
        {saving ? "Saving Changes..." : "Save Changes"}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
};

export default EditEmployeeForm;
