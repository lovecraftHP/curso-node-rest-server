const {request,response} = require('express')

const userGet = (req,res=response)=>{
    res.json({
        msg:'User get - controlador'
    })
}

const userGetDetails = (req=request,res=response)=>{
    res.json({
        msg:`Datos por get ->${req.params.id} `
    })
}
const userGetDetailsQuery = (req=request,res=response)=>{
    const data = req.query
    if(Object.keys(data).length==0){
        res.json({
            msg:'Datos de get por query',
            
        })
    }else{
        res.json({
            msg:'Datos de get por query',
           data  
        })
    }
    
}

const userPost = (req=request,res=response)=>{
    // const {nombre,id} = req.query
    const {nombre,salario}=req.body
    res.status(201).json({
        msg:"peticion por post",
        nombre,salario
    })
}

module.exports={
    userGet,
    userGetDetails,
    userGetDetailsQuery,
    userPost
}