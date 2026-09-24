import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const FIELDS = [
  { name: "name",       label: "Full Name",    type: "text",  placeholder: "e.g. Priya Sharma" },
  { name: "email",      label: "Email Address", type: "email", placeholder: "e.g. priya@company.com" },
  { name: "title",      label: "Job Title",    type: "text",  placeholder: "e.g. Senior Engineer" },
  { name: "department", label: "Department",   type: "text",  placeholder: "e.g. Engineering" },
  { name: "role",       label: "Role",         type: "text",  placeholder: "e.g. Admin / Member" },
];

const EditEmployeeForm = () => {
  const { userId } = useParams();
  const [empData, setEmpData] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getUserById`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const json = await response.json();
      setEmpData(json.data);
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (empData) {
      FIELDS.forEach(({ name }) => setValue(name, empData[name]));
    }
  }, [empData, setValue]);

  const editEmployee = async (data) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/editUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(editEmployee)} className="form-container">
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
        Save Changes
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
};

export default EditEmployeeForm;
