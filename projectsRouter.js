const express = require("express");
const router = express.Router();

const Projects = require('./data/helpers/projectModel');

router.get('/', (req, res) => {
  Projects.get()
  .then(projects => {
      res.status(200).json(projects)
  })
  .catch(err => res.status(400).json({ errorMessage: "error with trying to get data." }))
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        !project
        ?res.status(400).json({ message: "could not find that project."})
        :res.status(200).json(project)
    })
    .catch(err => res.status(500).json({ errorMessage: "error with trying to get data." }))
});

router.post('/', (req, res) => {
    const project = req.body;
    if(!project){
        res.status(400).json({ message: "please provide data for project."})
    }else if(project.name.length === 0 || project.description.length === 0){
        res.status(400).json({ message: "please provide missing data for the project."})
    }else {
        Projects.insert(project)
        .then(res.status(201).json({ message: "project successfuly created" }))
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedProject = req.body;
    console.log(updatedProject);

    if(updatedProject.name || updatedProject.description){
        Projects.update(id, updatedProject)
        .then(project => res.status(201).json(project))
        .catch(err => res.status(500).json({ errorMessage: "error trying to update project.", err }))
    } else {
        res.status(400).json({ message: "please provide something to update."})
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(res.status(200).json({ message: "project successfuly removed." }))
    .catch(res.status(500).json({ errorMessage: "error trying to remove project."}))
});

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Projects.getProjectActions(id)
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ message: "error in getting actions to project.", err}))
})

module.exports = router;