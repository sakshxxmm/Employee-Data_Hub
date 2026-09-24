import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { employeeService } from "../services/employeeService";

const HomePage = () => {
  const navigate = useNavigate();
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingPerson, setDeletingPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [statusMessage, setStatusMessage] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await employeeService.getAllEmployees();
      if (res.success) {
        setAllEmployees(res.data);
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleEdit = (person) => {
    navigate(`/editemployee/${person._id}`);
  };

  const confirmDelete = async () => {
    if (!deletingPerson) return;
    const person = deletingPerson;
    setDeletingPerson(null);

    // Optimistic UI update
    setAllEmployees((prev) => prev.filter((item) => item._id !== person._id));

    try {
      await employeeService.deleteEmployee(person._id);
      showStatus("Employee record removed from local storage.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      loadEmployees();
    }
  };

  const handleResetData = async () => {
    if (window.confirm("Reset employee directory to default demo records?")) {
      const res = await employeeService.resetDemoData();
      if (res.success) {
        setAllEmployees(res.data);
        setSearchQuery("");
        setSelectedDept("All");
        showStatus("Directory successfully reset to default sample data.");
      }
    }
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3500);
  };

  // Derive unique departments from all employees
  const availableDepartments = useMemo(() => {
    const depts = new Set(allEmployees.map((e) => e.department).filter(Boolean));
    return ["All", ...Array.from(depts)];
  }, [allEmployees]);

  // Client-side instant filter and search
  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((emp) => {
      const matchesDept =
        selectedDept === "All" ||
        emp.department?.toLowerCase() === selectedDept.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        emp.name?.toLowerCase().includes(q) ||
        emp.email?.toLowerCase().includes(q) ||
        emp.title?.toLowerCase().includes(q) ||
        emp.department?.toLowerCase().includes(q) ||
        emp.role?.toLowerCase().includes(q);

      return matchesDept && matchesSearch;
    });
  }, [allEmployees, selectedDept, searchQuery]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">👥</div>
          <span className="navbar-brand-text">StaffHub</span>
          <span className="badge-storage" title="All operations run 100% offline via browser LocalStorage">
            <span className="badge-storage-dot"></span>
            LocalStorage Mode
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={handleResetData}
            title="Reload default sample team members"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" width="14" height="14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset Demo Data
          </button>
          <Link to="/addemployee" className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Employee
          </Link>
        </div>
      </nav>

      {/* Page body */}
      <main className="page-container">
        {/* Header */}
        <header className="page-header animate-fade-in-up">
          <div className="page-header-info">
            <h1>Team Directory</h1>
            <p>High-performance client-side directory powered by LocalStorage persistence.</p>
          </div>
        </header>

        {statusMessage && (
          <div
            style={{
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "var(--radius-md)",
              color: "#34d399",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>✓</span> {statusMessage}
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div className="stats-row animate-fade-in-up">
            <div className="stat-card">
              <div className="stat-card-value">{allEmployees.length}</div>
              <div className="stat-card-label">Total Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value">
                {availableDepartments.length > 1 ? availableDepartments.length - 1 : 0}
              </div>
              <div className="stat-card-label">Departments</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value">{filteredEmployees.length}</div>
              <div className="stat-card-label">Matching Directory View</div>
            </div>
          </div>
        )}

        {/* Toolbar: Search & Filter */}
        <div className="toolbar-row animate-fade-in-up">
          <div className="toolbar-controls">
            <div className="search-box">
              <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, role, title, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
            >
              {availableDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedDept !== "All") && (
            <button
              className="btn-ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Table View */}
        {loading ? (
          <div className="table-wrapper">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: "64px", margin: "1px 0" }}
              />
            ))}
          </div>
        ) : allEmployees.length === 0 ? (
          <div className="table-wrapper">
            <div className="empty-state">
              <div className="empty-state-icon">🏢</div>
              <h3>No employees yet</h3>
              <p>Get started by adding your first team member or resetting demo records.</p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                <button onClick={handleResetData} className="btn-secondary">
                  Load Demo Data
                </button>
                <Link to="/addemployee" className="btn-primary">
                  Add First Employee
                </Link>
              </div>
            </div>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="table-wrapper">
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No results match your search</h3>
              <p>Try searching for a different term or clear the current filters.</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("All");
                }}
              >
                Clear Filters
              </button>
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
                {filteredEmployees.map((person) => (
                  <tr key={person._id}>
                    <td>
                      <div className="employee-cell">
                        <img
                          className="employee-avatar"
                          src={
                            person.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              person.name
                            )}&background=6366f1&color=fff`
                          }
                          alt={person.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              person.name
                            )}&background=6366f1&color=fff`;
                          }}
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
                          title="Edit employee details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => setDeletingPerson(person)}
                          title="Delete employee"
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

      {/* Delete Confirmation Modal */}
      {deletingPerson && (
        <div className="modal-overlay" onClick={() => setDeletingPerson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-danger">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="22" height="22">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
              <h3 className="modal-title">Delete Employee</h3>
            </div>
            <div className="modal-body">
              Are you sure you want to remove <strong>{deletingPerson.name}</strong> from the directory? This record will be permanently deleted from local storage.
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setDeletingPerson(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
