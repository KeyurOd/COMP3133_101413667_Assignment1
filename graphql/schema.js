const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String!
    updated_at: String!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): String
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      department: String!,
      employee_photo: String
    ): Employee
    updateEmployeeById(
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      designation: String,
      salary: Float,
      date_of_joining: String,
      department: String,
      employee_photo: String
    ): Employee
    deleteEmployeeById(id: ID!): String
  }
`;

module.exports = typeDefs;
