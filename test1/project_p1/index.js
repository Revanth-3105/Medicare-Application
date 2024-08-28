

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from "axios";
import Vdata from "./verfication_data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_URL = "https://api.geoapify.com/v2/places";
const apiKey = "bda2830d9e3442a5adebd5f04d3cb533";
const app = express();

const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getdata(req, res, next) {
  console.log(req.body);
  req.data1 = req.body["email"];
  req.data2 = req.body["password"];
  next();
}

app.use(getdata);

// Define a route
app.get('/', (req, res) => {
  res.render("index.ejs", {
    flag: false,
  });
});

app.post('/book', (req, res) => {
  //const h1text=req.query.text;
  res.render('appointment',{
    hn:req.body.hospitalName,
  });
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.get("/cardio", (req, res) => {
res.render("cardiology1.ejs",{flag:0});
});

function passwordcheck(req, res, next) {
  const user = Vdata.find(user => user.email === req.data1 && user.password === req.data2);
  if (user) {
    return res.render("index.ejs", {
      flag: true,
    });
  }

  return res.render("form.ejs", { flag: false });
  next();
}

app.post("/submit", passwordcheck, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit2", (req, res) => {
  //console.log("Received data:", req.body); // Debugging statement
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  res.redirect("/");
  // Push new user to Vdata
  Vdata.push(newUser);

  console.log("Updated Vdata:", Vdata); // Debugging statement

  // Write updated Vdata to verfication_data.js
  const updatedData = `
const Vdata = ${JSON.stringify(Vdata, null, 2)};

export default Vdata;
  `;
  fs.writeFile(__dirname + "/verfication_data.js", updatedData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File successfully updated!");
    }
  });

  // Redirect to /signup page
  // 
});

// app.get("/submit2",(req,res)=>{
//   res.redirect("/signup");
// });

app.get("/login", (req, res) => {
  res.render("form.ejs", { flag: true });
});

// Add the signup route
app.get("/signup", (req, res) => {
  res.render("form.ejs", { flag: true });
});

let lat, long;

const getLocation = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();

    if (data.status === 'success') {
      lat = data.lat;
      long = data.lon;
      // console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    } else {
      console.error('Failed to retrieve location data');
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
  }
};

getLocation();

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
// res.render("index");
// });

app.post("/loc", async (req, res) => {
  console.error('Failed location data');
  try {
    console.log(lat);
    console.log(long);
    const result = await axios.get(API_URL, {
      params: {
        categories: "healthcare",
        filter: `circle:${long},${lat},5000`,
        limit: 15,
        apiKey: apiKey,
      },
    });
    
    res.render("cardiology1.ejs", { content: result.data , flag: 1});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
