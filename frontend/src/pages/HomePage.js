import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallUsers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      setEmpData(res);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (person) => {
    navigate(`/editemployee/${person._id}`);
  };

  const handleDelete = async (person) => {
    if (!window.confirm(`Remove ${person.name} from the team?`)) return;
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/deleteUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
      });
      await getAllData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const employees = empData?.data ?? [];
  const departments = [...new Set(employees.map((e) => e.department).filter(Boolean))];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">👥</div>
          <span className="navbar-brand-text">StaffHub</span>
        </div>
        <Link to="/addemployee" className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Employee
        </Link>
      </nav>

      {/* Page body */}
      <main className="page-container">
        {/* Header */}
        <header className="page-header animate-fade-in-up">
          <div className="page-header-info">
            <h1>Team Directory</h1>
            <p>Manage your workforce — add, update, or remove team members.</p>
          </div>
        </header>

        {/* Stats */}
        {!loading && (
          <div className="stats-row animate-fade-in-up">
            <div className="stat-card">
              <div className="stat-card-value">{employees.length}</div>
              <div className="stat-card-label">Total Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value">{departments.length}</div>
              <div className="stat-card-label">Departments</div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="table-wrapper">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: "60px", margin: "1px 0" }}
              />
            ))}
          </div>
        ) : employees.length === 0 ? (
          <div className="table-wrapper">
            <div className="empty-state">
              <div className="empty-state-icon">🏢</div>
              <h3>No employees yet</h3>
              <p>Get started by adding your first team member.</p>
              <Link to="/addemployee" className="btn-primary">
                Add First Employee
              </Link>
            </div>
          </div>
        ) : (
          <div className="table-wrapper animate-fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Title / Department</th>
                  <th>Role</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((person) => (
                  <tr key={person._id}>
                    <td>
                      <div className="employee-cell">
                        <img
                          className="employee-avatar"
                          src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=6366f1&color=fff`}
                          alt={person.name}
                        />
                        <div>
                          <div className="employee-name">{person.name}</div>
                          <div className="employee-email">{person.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="title-cell-primary">{person.title}</div>
                      <div className="title-cell-secondary">{person.department}</div>
                    </td>
                    <td>
                      <span className="role-badge">{person.role}</span>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button
                          className="btn-secondary"
                          onClick={() => handleEdit(person)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDelete(person)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
