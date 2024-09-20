import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
// import path from "path";
// import { fileURLToPath } from "url";
import path from "node:path";

const app = express();
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// Allows us to use embedded javaScript for our view files.
app.set("view engine", "ejs");
// Use body parser to encode entry data to JS
app.use(bodyParser.urlencoded({ extended: true }));
// So express can use all files in the public folder and can be used in our views.
app.use(express.static("public"));
// app.use("/static", express.static(path.join(__dirname, "public")));

// Use express to make an open connection to mysql DB that we created
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "learnthatpoem",
  database: "join_us",
});

// respond with content when a GET request is made to the homepage. Using mySQL query to DB.
app.get("/", async (req, res) => {
  try {
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users";
    const [result] = await connection.query(q);
    const count = result[0].count;
    // Respond with that count
    res.render("home", { count: count });
  } catch (error) {
    console.log(error);
  }
});

app.get("/joke", (req, res) => {
  var joke = "What do you call a dumb joke?";
  console.log("Requested the joke route");
  res.send(joke);
});

app.get("/randum_num", (req, res) => {
  const randomNum = Math.floor(Math.random() * 10) + 1;

  res.send("Your lucky number is " + randomNum);
});

app.post("/register", async (req, res) => {
  try {
    // Create person object with the email value
    const person = {
      email: req.body.email,
    };
    // Insert the email entered in form to the DB
    const q = "INSERT INTO users SET ?";
    const [result] = await connection.query(q, person);

    // Redirect after the post
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// Starts the node server to listen on port so you can see the response to browser
app.listen(8080, () => {
  console.log("App listening on port 8080!");
});
