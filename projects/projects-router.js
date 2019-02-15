const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be found" });
        })
})

// GET project by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Projects.get(id)
        .then(project => {
            console.log(project);
            if(!project) {
                res.status(404).json({ message: 'The project with the specified ID could not be found' });
            } else {
                res.status(200).json({project})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved" });
        })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ message: "Please provided a name and a description for the new project" });
    } else {
        Projects.insert(newProject)
            .then(project => {
                Projects.get(newProject.id)
                    .then(project => {
                        res.status(201).json(project)
                    })
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error adding the new project to the db" });
            })
    }
})

module.exports = router;