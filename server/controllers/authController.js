const express = require("express");
const router = express.Router();
const axios = require("axios");
const btoa = require('btoa');
const config = require('../config/config.js');

router.post("/getToken", (req, res) => {
    let data = `grant_type=password&username=${req.body.username}&password=${req.body.password}`;
    let auth = `Basic ${btoa(config.clientId+":")}`;
    let url = config.urls.WING_QUEST_BASE_URL + "/auth/token";
    axios({
        method: "POST",
        url,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth
        },
        data
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err)
        res.send(err.response);
    })
})

module.exports = router;