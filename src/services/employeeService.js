/**
 * Employee Data Service
 * 
 * Standalone Client-Side Data Architecture using LocalStorage persistence.
 * Designed for offline-first resilience, zero network latency, and seamless zero-config deployment.
 */

const STORAGE_KEY = "staffhub_employees_data";

export const DEFAULT_EMPLOYEES = [
  {
    _id: "emp-101",
    name: "Aarav Sharma",
    email: "aarav.sharma@staffhub.dev",
    title: "Senior Frontend Architect",
    department: "Engineering",
    role: "Lead",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "emp-102",
    name: "Priya Patel",
    email: "priya.patel@staffhub.dev",
    title: "Principal Product Designer",
    department: "Design",
    role: "Admin",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "emp-103",
    name: "Rohan Verma",
    email: "rohan.verma@staffhub.dev",
    title: "Staff Systems Engineer",
    department: "Engineering",
    role: "Member",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "emp-104",
    name: "Ananya Iyer",
    email: "ananya.iyer@staffhub.dev",
    title: "Head of Product",
    department: "Product",
    role: "Admin",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "emp-105",
    name: "Kabir Mehta",
    email: "kabir.mehta@staffhub.dev",
    title: "Cloud & DevOps Specialist",
    department: "Infrastructure",
    role: "Member",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "emp-106",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@staffhub.dev",
    title: "Growth & Brand Strategist",
    department: "Marketing",
    role: "Member",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper to simulate realistic micro-latency (100ms) for smooth skeleton feedback
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

// Safe LocalStorage Reader
const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EMPLOYEES));
      return DEFAULT_EMPLOYEES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EMPLOYEES));
      return DEFAULT_EMPLOYEES;
    }
    return parsed;
  } catch (err) {
    console.warn("LocalStorage access failed or parsed incorrectly, fallback to defaults:", err);
    return DEFAULT_EMPLOYEES;
  }
};

// Safe LocalStorage Writer
const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("Failed to write to LocalStorage:", err);
    return false;
  }
};

export const employeeService = {
  /**
   * Fetch all employees with optional search & department filtering
   */
  async getAllEmployees({ search = "", department = "All" } = {}) {
    await delay(120);
    let list = getStoredData();

    if (department && department !== "All") {
      list = list.filter(
        (emp) => emp.department?.toLowerCase() === department.toLowerCase()
      );
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q) ||
          emp.title?.toLowerCase().includes(q) ||
          emp.department?.toLowerCase().includes(q) ||
          emp.role?.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: list,
      count: list.length,
    };
  },

  /**
   * Get single employee by ID
   */
  async getEmployeeById(id) {
    await delay(80);
    const list = getStoredData();
    const found = list.find((emp) => String(emp._id) === String(id));
    if (!found) {
      return { success: false, message: "Employee not found", data: null };
    }
    return { success: true, data: found };
  },

  /**
   * Create a new employee record
   */
  async createEmployee(employeeData) {
    await delay(150);
    const list = getStoredData();
    const newId = `emp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    const newEmployee = {
      _id: newId,
      name: employeeData.name?.trim() || "Anonymous",
      email: employeeData.email?.trim() || "",
      title: employeeData.title?.trim() || "Staff Member",
      department: employeeData.department?.trim() || "General",
      role: employeeData.role?.trim() || "Member",
      image:
        employeeData.image?.trim() ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          employeeData.name || "User"
        )}&background=6366f1&color=fff&bold=true`,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [newEmployee, ...list];
    saveStoredData(updatedList);

    return {
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    };
  },

  /**
   * Update an existing employee record
   */
  async updateEmployee(id, updatedFields) {
    await delay(150);
    const list = getStoredData();
    const index = list.findIndex((emp) => String(emp._id) === String(id));

    if (index === -1) {
      return { success: false, message: "Employee not found to update" };
    }

    const existing = list[index];
    const updatedEmployee = {
      ...existing,
      ...updatedFields,
      _id: existing._id, // Preserve original ID
      image:
        updatedFields.image?.trim() ||
        existing.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          updatedFields.name || existing.name
        )}&background=6366f1&color=fff&bold=true`,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedEmployee;
    saveStoredData(list);

    return {
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    };
  },

  /**
   * Delete an employee record
   */
  async deleteEmployee(id) {
    await delay(100);
    const list = getStoredData();
    const filtered = list.filter((emp) => String(emp._id) !== String(id));
    saveStoredData(filtered);

    return {
      success: true,
      message: "Employee deleted successfully",
    };
  },

  /**
   * Reset data back to default demo dataset
   */
  async resetDemoData() {
    await delay(100);
    saveStoredData(DEFAULT_EMPLOYEES);
    return {
      success: true,
      message: "Dataset reset to default mock employees",
      data: DEFAULT_EMPLOYEES,
    };
  },

  /**
   * Get all unique departments currently available
   */
  getAvailableDepartments() {
    const list = getStoredData();
    const set = new Set(list.map((e) => e.department).filter(Boolean));
    return ["All", ...Array.from(set)];
  },
};
