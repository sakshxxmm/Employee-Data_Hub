import React from "react";
import { Link } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const CreateEmployeePage = () => {
  return (
    <section className="form-page">
      {/* Left hero panel */}
      <div className="form-page-hero">
        <img
          src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Team at work"
        />
        <div className="form-page-hero-content">
          <h2>Build your dream team, one person at a time.</h2>
        </div>
      </div>

      {/* Right form panel */}
      <div className="form-page-content">
        <div className="form-page-inner animate-fade-in-up">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Directory
          </Link>
          <h1>New Team Member</h1>
          <EmployeeForm />
        </div>
      </div>
    </section>
  );
};

export default CreateEmployeePage;
