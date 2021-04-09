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
router.get('/:id', mw.validateId, (req,res)=>{
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
router.post('/', mw.checkActionBody, (req,res)=>{
    const newAction = req.body
    Actions.insert(newAction)
    .then(action=>{
        res.status(201).json(action)
    })
    .catch(()=>{
        res.status(500).json({message: "Error adding the actions."})
    })
})


// //- `[PUT] `/:id` returns the updated action as the body of the _response_.
router.put('/:id', mw.validateId, mw.checkActionBody, (req,res)=>{
    const {id} = req.params
    const changes = req.body
    Actions.get(id)
    .then(userFound=>{
        if(!userFound){
            res.status(404).json({message: "the action you are trying to update was not found"})
        }
        else{
            return Actions.update(id,changes)
        }
    })
    .then(data=>{
        if(data){
            return Actions.get(id)
        }
    })
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(()=>{
        res.status(500).json({message: "Error updating the action."})
    })
})
// //- `[DELETE] `/:id` returns no _response_ body.
router.delete('/:id', mw.validateId, async (req,res)=>{
    const {id} = req.params
    try{ const action = await Actions.get(id)
        if(!action){
          res.status(404).json({message: "This action does not exist."})
        }else{
          await Actions.remove(id)
          res.json(action)
        }
      }catch{
        res.status(500).json({message: "Error removing the action."})
      }

})

module.exports = router;