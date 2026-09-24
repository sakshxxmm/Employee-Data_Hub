import React from "react";
import { Link } from "react-router-dom";
import EditEmployeeForm from "../components/EditEmployeeForm";

const EditEmployee = () => {
  return (
    <div className="edit-page">
      <div className="edit-page-inner animate-fade-in-up">
        <Link to="/" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Directory
        </Link>
        <h1>Edit Profile</h1>
        <EditEmployeeForm />
      </div>
    </div>
  );
};

export default EditEmployee;