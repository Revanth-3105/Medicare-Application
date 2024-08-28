
import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const API_URL = "https://api.geoapify.com/v2/places";
const apiKey = "bda2830d9e3442a5adebd5f04d3cb533";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// $.getJSON('https://api.ipify.org?format=json', function(data) {
    //         ipaddr=data.ip;
    //         console.log(ipaddr);
    //       });
    
    let lat,long;

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", async (req, res) => {
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
    res.render("index", { content: result.data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/reset_password", (req, res) => {
  res.send("Reset password functionality not implemented yet.");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
