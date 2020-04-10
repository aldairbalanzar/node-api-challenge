const express = require("express");
const router = express.Router();

const Projects = require('./data/helpers/projectModel');

router.get('/', (req, res) => {
    res.status(200).json({message: "projectsRouter is working."})
});

module.exports = router;