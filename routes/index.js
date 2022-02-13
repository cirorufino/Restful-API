const express = require('express');
const router = express.Router();
const { Employee } = require ('../models/employee');

//Get All 
router.get('/employees/getall', (req, res) =>{
    Employee.find({}, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

//Insert 
router.post('/employees/add', (req, res) =>{
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });
    emp.save((err, data) => {
        res.status(200).json({code:200, message: 'Dipendente aggiunto con successo', addEmployee:data })
    });
})

//Get one by ID
router.get('/employees/:id', (req, res) =>{
    Employee.findById(req.params.id, (err, data) => {
        if(!err){
            res.send(data);
        } else{
            console.log(err);
        }
    });
})

//Update 
router.put('/employees/update/:id', (req,res) =>{
    const emp = {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary 
    };
    Employee.findByIdAndUpdate(req.params.id, { $set:emp }, {new:true}, (err,data)=>{
        if(!err){
            res.status(200).json({code:200, message: 'Dipendente modificato con successo.', updateEmployee: data});
        }else {
            console.log(err);
        }
    });
});

//Delete 
router.delete('/employees/delete/:id', (req,res) => {
    Employee.findByIdAndRemove(req.params.id, (err,data) => {
        if(!err){
            res.status(200).json({code: 200, message: 'Dipendente rimosso con successo.', deleteEmployee: data});
        }else{
            console.log(err);
        }
    })
})


module.exports = router;