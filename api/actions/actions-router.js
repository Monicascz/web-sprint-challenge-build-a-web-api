// Write your "actions" router here!
const express = require("express")


const router = express.Router();

const Actions = require('./actions-model.js')
const mw = require('../middlewares/middlewares.js')

//- `[GET] /` returns an array of actions (or an empty array) as the body of the _response_.
router.get('/', (req,res)=>{
    Actions.get()
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(()=>{
        res.status(500).json({message: "Error getting the actions."})
    })
})


//- `[GET] `/:id` returns an action with the given `id` as the body of the _response_.
router.get('/:id', mw.checkActionId, (req,res)=>{
    const {id}= req.params
    Actions.get(id)
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(()=>{
        res.status(500).json({message: "Error getting the actions."})
    })
})


//- `[POST] `/` returns the newly created action as the body of the _response_.
// router.post('/', (req,res)=>{})
// //- `[PUT] `/:id` returns the updated action as the body of the _response_.
// router.put('/:id', (req,res)=>{})
// //- `[DELETE] `/:id` returns no _response_ body.
// router.delete('/:id', (req,res)=>{})

module.exports = router;