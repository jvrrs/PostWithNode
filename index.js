const express = require("express"); // Use "npm install express" if the module is not available
const app = express();
const port = 80;

const fs = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(express.text()); // This is required as the data that is sent is in text format

app.get("/", async (req, res) => {
    res.send("The Server is Online"); // Just to see if the server is online
});

// Accepting POST request to url - "/data" and saving the data in "data.txt" or "data.csv" file in the "data" folder
app.post("/data", async (req, res) => {
    console.log(req.body);
    
    //-- Saving formatted data as ".csv" --

    var data = JSON.parse(req.body);
    // Formatting data based on the template "data_csv_template.csv" with the following keys - utc, temp, hum, pres, rain, ws and wd
    var store = data["utc"] + "," + data["temp"] + "," + data["hum"] + "," + data["pres"] + "," + data["rain"] + "," + data["ws"] + "," + data["wd"]
    fs.appendFileSync("data\\data.csv", store + "\n"); // Change the "data\\data.csv" to the location where the data should be stored
    res.send("Done");


    //-- Saving raw data as ".txt" --

    // fs.appendFileSync("data\\data.txt", req.body + "\n"); // Change the "data\\data.txt" to the location where the data should be stored
    // res.send("Done");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})