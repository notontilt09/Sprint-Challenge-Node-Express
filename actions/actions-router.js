const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

// GET all actions for specified project id
router.get('/:projId', (req, res) => {
    const id = req.params.projId
    Projects.getProjectActions(id)
        .then(actions => {
            if (actions.length === 0) {
                res.status(404).json({ message: `No actions for project ${id}` });
            } else {
                res.status(200).json(actions);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Error retrieve actions for that project ID" });
        })
})

router.get('/:projId/:actionId', (req, res) => {
    const projId = req.params.projId;
    const actionId = req.params.actionId;
    Projects.getProjectActions(projId)
        .then(actions => {
            if (actions.length === 0) {
                res.status(404).json({ message: `No actions for project ${projId}` });
            } else {
                Actions.get(actionId)
                    .then(action => {
                        if (action.length === 0) {
                            res.status(404).json({ message: `There is no acton ${actionId} for project ${projId}` });
                        } else {
                            res.status(200).json(action)
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: `Error retrieving action ${actionId} for project ${projId}` });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Error retrieving project actions"})
        })
})

router.post('/:projId', (req, res) => {
    const id = req.params.projId;
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(404).json({message: "Please provide project_id, description, and notes" });
    } else {
        Actions.insert(req.body)
            .then(action => {
                res.status(201).json(action);
            })
            .catch(err => {
                res.status(500).json({ error: "Error adding action" });
            })
    }
})


module.exports = router;