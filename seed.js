import { faker } from "@faker-js/faker";
import mysql from "mysql2/promise";

// THIS FILE CREATES DB CONNECTION WITH MYSQL DB. WE USE FAKER TO CREATE A LARGE DATA OBJECT 500 OBJECTS. WE USE SQL TO INSERT THE DATA TO THE DB.

// NEED MYSQL2 AND FAKER PACKAGES

// Create the connection to database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "join_us",
  password: "learnthatpoem",
});

// Selecting data
// const q = "SELECT COUNT(*) AS total FROM users";

// Inserting dynamic data using faker
// const person = { email: faker.internet.email(), created_at: faker.date.past() };
// const q = "INSERT INTO users SET ?";

// try {
//   const [results, fields] = await connection.query(q, person);
//   console.log(results);
//   connection.end();
// } catch (error) {
//   console.log(error);
// }

// Inserting lots of dynamic data using faker!!!
let data = [];

for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}
// console.log(data);

const q = "INSERT INTO users (email, created_at) VALUES ?";

try {
  const [result] = await connection.query(q, [data]);
  console.log(result);
  connection.end();
} catch (error) {
  console.log(error);
}
