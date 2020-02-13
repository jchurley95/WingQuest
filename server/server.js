const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname + "../client/build"));

const authController = require("./controllers/authController.js");
app.use("/api/auth", authController);

const restaurantController = require("./controllers/restaurantController.js");
app.use("/api/restaurants", restaurantController);

app.use("/", (req, res) => {
    res.sendFile(express.static(__dirname, "../client/build", "index.html"))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>  {
    console.log("Express listening on port: ", PORT);
})