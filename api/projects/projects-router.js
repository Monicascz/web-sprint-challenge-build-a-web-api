// Write your "projects" router here!
const express = require("express")
const router = express.Router()

const Projects = require('../projects/projects-model.js')
const Actions = require('../actions/actions-model.js')
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
 router.get('/:id', mw.validateId, (req,res)=>{
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
router.put('/:id', mw.validateId, mw.checkProjectsBody, (req,res)=>{
    const {id} = req.params
    const changes = req.body
    Projects.get(id)
    .then(userFound=>{
        if(!userFound){
            res.status(404).json({message: "the project you are trying to update was not found"})
        }
        else{
            return Projects.update(id,changes)
        }
    })
    .then(data=>{
        if(data){
            return Projects.get(id)
        }
    })
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(()=>{
        res.status(500).json({message: "Error updating the project."})
    })
})
// //   - `[DELETE] `/:id` returns no _response_ body.
router.delete('/:id', mw.validateId, async (req,res)=>{
    const {id} = req.params
    try{ const project = await Projects.get(id)
        if(!project){
          res.status(404).json({message: "This project does not exist."})
        }else{
          await Projects.remove(id)
          res.json(project)
        }
      }catch{
        res.status(500).json({message: "Error removing the project."})
      }
})

//`[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.
router.get('/:id/actions', mw.validateId, (req,res)=>{
    const {id} = req.params
    Projects.get(id)
    .then(projects=>{
        if(projects){
            return Actions.get()
        }
        })
        .then(actions=>{
            if(!actions){
                res.json([])
            }else{
                res.status(200).json(actions)
            }
        })
    .catch(()=>{
        res.status(500).json({message: "Error getting the projects."})
    })
})

module.exports = router;