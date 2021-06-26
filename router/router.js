const express = require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId
require('../DB/connection');
const Class = require("../Models/Event");
const Teacher = require("../Models/teacherSchema");

// router.get("/" , (req,res)=>{
//   res.send("HELLO FROM SERVER");
// })
//working
router.post('/addSchedule' , (req,res)=>{
    
    const {teacherName , batchName , start , end } = req.body;
    let title = teacherName +"( " + batchName + " )" ;
    const event = new Class({teacherName , batchName , start , end , title });

    event.save().then(()=>{
    res.status(201).json({message:"class Added"})
    }).catch((err)=> res.status(500).json({message:err}));     
})

//Working
router.get("/getData" , (req,res)=>{
    let events = Class.find({},function(err,events){
      if(err){
        console.log(err);
      }else{
        res.json(events);
      }
    }) 
})


router.get('/getTeacher' , (req,res)=>{
      let name = req.params.name;
      let singleTeacherData = Class.find({teacherName:name} , function(err, singleTeacherData){
        if(err){
          console.log(err);
        }else{
          console.log("backend",singleTeacherData);
          res.json(singleTeacherData);
        }
      })

      
})

// Working
router.put("/:id" , (req,res)=>{
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("no record of the given id");

  let title = req.body.teacherName +"( " + req.body.batchName + " )" ;
  var updateObj = new Class({
    teacherName : req.body.teacherName,
    batchName : req.body.batchName,
    start : req.body.start,
    end : req.body.end,
    title : title
  })

  Class.findOneAndUpdate({_id:req.params.id} , {$set:updateObj , _id:req.params.id} ,{new:true} ,(err, docs) => {
      if(!err){
        res.send(docs)
      }else{ 
        console.log("error while updating record"  + JSON.stringify(err,undefined,2))
      }
  })
})

//Working
router.delete("/:id" , (req,res) => {
   if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("no record of the given id");

  Class.findByIdAndRemove(req.params.id , (err, docs) => {
    if(!err) res.send(docs)
    else console.log("error while Deleting a record"  + JSON.stringify(err,undefined,2))
  })
})

module.exports = router;
