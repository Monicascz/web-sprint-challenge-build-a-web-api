// Write your "projects" router here!
const express = require("express")
const router = express.Router()

const Projects = require('../projects/projects-model.js')
const mw = require('../middlewares/middlewares.js')



//   - `[GET] `/` returns an array of projects (or an empty array) as the body of the response.
router.get('/', (req,res)=>{
    Projects.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(()=>{
        res.status(500).json({message: "Error getting the projects."})
    })
})

//   - `[GET] `/:id` returns a project with the given `id` as the body of the _response_.
 router.get('/:id', mw.checkActionId, (req,res)=>{
    const {id} = req.params
    Projects.get(id)
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(()=>{
        res.status(500).json({message: "Error getting the projects."})
    })
 })
// //   - `[POST] `/` returns the newly created project as the body of the _response_.
router.post('/', mw.checkProjectsBody, (req,res)=>{
    const newProject = req.body
    Projects.insert(newProject)
    .then(projects=>{
        res.status(201).json(projects)
    })
    .catch(()=>{
        res.status(500).json({message: "Error adding the projects."})
    })
})
// //   - `[PUT] `/:id` returns the updated project as the body of the _response_.
// router.put('/:id', mw.checkActionId, (req,res)=>{

// })
// //   - `[DELETE] `/:id` returns no _response_ body.
// router.delete('/:id', mw.checkActionId, (req,res)=>{

// })

module.exports = router;