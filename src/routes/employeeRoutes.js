const employeeModel = require('../models/employee.js');
const express = require('express');
const employeeRoutes = express.Router();
const query = require('express-validator')

employeeRoutes.get('/emp/employees', async (req, res) => {
    try {
        const employee = await employeeModel.find();
        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving employees."
        });
    }
});

employeeRoutes.post('/emp/employees', async (req, res) => {
    const content = req.body;
    try {
        const employee = new employeeModel({
            first_name: content.first_name,
            last_name: content.last_name,
            email: content.email,
            position: content.position,
            salary: content.salary,
            date_of_joining: content.date_of_joining,
            department: content.department,
            created_at: content.created_at,
            updated_at: content.updated_at
        });
        const data = await employee.save();
        res.status(201).send({
            message: "Employee created successfully",
            employee: data
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Employee."
        });
    }
});

employeeRoutes.get('/emp/employees/:id', async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(200).send(employee);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(500).send({
            message: "Error retrieving employee with id " + req.params.id
        });
    }
});

employeeRoutes.get('/emp/employees/:search/:topic', async (req, res) => {
    try {
        const { search, topic } = req.params;
       
        switch(search){
            case "position":
                  employee = await employeeModel.find({position:`${topic}`});
            break;
            case "department":
                  employee = await employeeModel.find({department:`${topic}`});
            break;
            default:
                 employee = await employeeModel.findById(req.params.id);
        }
        
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found" + req.params.id
            });
        }
        res.status(200).send(employee);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found" + req.params.id
            });
        }
        res.status(500).send({
            message: "Error retrieving employee" + req.params.id
        });
    }
});

employeeRoutes.put('/emp/employees/:id', async (req, res) => {
    const content = req.body;
    try {
        if (!content.updated_at) {
            content.updated_at = Date.now();
        }
        const employee = await employeeModel.findByIdAndUpdate(
            req.params.id,
            content,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(200).send({
            message: "Employee updated successfully",
            employee: employee
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    }
});

employeeRoutes.delete('/emp/employees/:id', async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(204).send({
            message: "Employee deleted successfully!",
            employee: employee
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    }
});

module.exports = employeeRoutes