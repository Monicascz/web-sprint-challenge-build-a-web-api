const Actions = require('../actions/actions-model.js')

const checkActionId = async (req,res,next)=>{
    const {id}=req.params
    const action = await Actions.get(id)
    if(!action){
        res.status(404).json({ message: "action not found" })
    }else{
        next()
    }
}

const checkActionBody = (req,res,next)=>{
    if(!req.body.description || !req.body.notes || !req.body.project_id){
        res.status(400).json({message: "Must include project_id, description and notes to add new action."})
    }else{
        next()
    }
}

module.exports={
    checkActionId,
    checkActionBody
}