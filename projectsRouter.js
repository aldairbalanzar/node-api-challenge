const express = require("express");
const router = express.Router();

const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');

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
        console.log(project);
        !project
        ?res.status(400).json({ message: "could not find that project.",})
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
});

//actions
router.get('/:id/actions/:actionId', (req, res) => {
    const actionId = req.params.actionId;


    Actions.get(actionId)
    .then(actions => {
        !actions
        ?res.status(400).json({ message: "there are no actions."})
        :res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ errorMessage: "error getting actions.", err }))
});

router.post('/:id/actions', (req, res) => {
    const action = {
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    };

    Actions.insert(action)
    .then(action => res.status(200).json({ message: "action successfuly posted.", action }))
    .catch(err => res.status(500).json({ errorMessage: "error in posting action."}))
});

router.put('/:id/actions/:actionId', (req, res) => {
    const actionId = req.params.actionId;
    const updatedAction = {
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    };

    if(updatedAction.description || updatedAction.notes){
        Actions.update(actionId, updatedAction)
        .then(res.status(201).json({ message: "action successfuly updated."}))
        .catch(res.status(500).json({ errorMessage: "error in updating action."}))
    }else {
        res.status(400).json({ message: "please provide data to update."})
    }
});

router.delete('/:id/actions/:actionId', (req, res) => {
    const actionId = req.params.actionId;

    Actions.remove(actionId)
    .then(res.status(200).json({ message: "action successfuly removed." }))
    .catch(res.status(500).json({ errorMessage: "error in removing that action." }))
});

module.exports = router;