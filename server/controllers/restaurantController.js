const express = require("express");
const router = express.Router();
const axios = require('axios');
const config = require('../config/config.js');

router.get("/", (req, res) => {
    console.log(req.headers.access_token)
    let authToken = `Bearer ${req.headers.access_token}`
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
        res.send(err);
    })
})

router.get("/:id", (req, res) => {
    console.log(req.headers.access_token)
    let authToken = `Bearer ${req.headers.access_token}`
    let url = config.urls.WING_QUEST_BASE_URL + "/restaurant/" + req.header.restaurantId
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
        res.send(err);
    })
})

module.exports = router;