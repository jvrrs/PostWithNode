const express = require("express");
const app = express();
const port = 4000;

const fs = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(express.text());

app.get("/", async (req, res) => {
    res.send("This is working");
});

app.post("/data", async (req, res) => {
    console.log(req.body);
    fs.appendFileSync("data\\data.txt", req.body + "\n");
    res.send("Done")
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})