/**
 * Employee Data Service
 * 
 * Standalone Client-Side Data Architecture using LocalStorage persistence.
 * Stores employee directory records without external backend or image dependencies.
 */

const STORAGE_KEY = "staffhub_employees_data";

// Safe LocalStorage Reader
const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.warn("LocalStorage access failed, returning empty list:", err);
    return [];
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

const delay = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeService = {
  /**
   * Fetch all employees with optional search & department filtering
   */
  async getAllEmployees({ search = "", department = "All" } = {}) {
    await delay(50);
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
    await delay(50);
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
    await delay(60);
    const list = getStoredData();
    const newId = `emp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const newEmployee = {
      _id: newId,
      name: employeeData.name?.trim() || "Anonymous",
      email: employeeData.email?.trim() || "",
      title: employeeData.title?.trim() || "Staff Member",
      department: employeeData.department?.trim() || "General",
      role: employeeData.role?.trim() || "Member",
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
    await delay(60);
    const list = getStoredData();
    const index = list.findIndex((emp) => String(emp._id) === String(id));

    if (index === -1) {
      return { success: false, message: "Employee not found to update" };
    }

    const existing = list[index];
    const updatedEmployee = {
      ...existing,
      name: updatedFields.name?.trim() || existing.name,
      email: updatedFields.email?.trim() || existing.email,
      title: updatedFields.title?.trim() || existing.title,
      department: updatedFields.department?.trim() || existing.department,
      role: updatedFields.role?.trim() || existing.role,
      _id: existing._id,
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
    await delay(50);
    const list = getStoredData();
    const filtered = list.filter((emp) => String(emp._id) !== String(id));
    saveStoredData(filtered);

    return {
      success: true,
      message: "Employee deleted successfully",
    };
  },

  /**
   * Clear all employee records
   */
  async clearAll() {
    await delay(40);
    saveStoredData([]);
    return {
      success: true,
      message: "All employees cleared",
      data: [],
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
