const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({ 
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] 
      });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid password");

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    },
    getAllEmployees: async () => await Employee.find(),
    getEmployeeById: async (_, { id }) => await Employee.findById(id),
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      let filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;

      return await Employee.find(filter);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already exists");

      const user = new User({ username, email, password });
      return await user.save();
    },
    addEmployee: async (_, args) => {
      if (args.salary < 1000) throw new Error("Salary must be at least 1000");
      return await new Employee(args).save();
    },
    updateEmployeeById: async (_, { id, ...updateData }) => {
      updateData.updated_at = new Date();
      return await Employee.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteEmployeeById: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
