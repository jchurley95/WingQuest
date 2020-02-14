const express = require("express");
const router = express.Router();
const axios = require('axios');
const config = require('../config/config.js');

let authToken;
router.use((req, res, next) => {
    if (req.headers.access_token) {
        authToken = `Bearer ${req.headers.access_token}`
    }
    next();
})

router.get("/", (req, res) => {
    let url = config.urls.WING_QUEST_BASE_URL + "/restaurant"
    axios({
        method: "GET",
        url,
        headers: {
            'accept': 'application/json',
            'Authorization': authToken
        }
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

router.get("/:id", (req, res) => {
    let url = config.urls.WING_QUEST_BASE_URL + "/restaurant/" + req.params.id
    axios({
        method: "GET",
        url,
        headers: {
            'accept': 'application/json',
            'Authorization': authToken
        }
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

module.exports = router;