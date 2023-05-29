"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regiment_model_1 = require("../models/regiment.model");
const CreateRegimentPlan = async (req, res) => {
    const { name, description, userid } = req.body;
    try {
        if (name === undefined || description === undefined || userid === undefined) {
            return res.status(400).send('missing values');
        }
        const newRegiment = await regiment_model_1.Regiment.build({ name, description, userid, routines: [], isCompleted: false });
        newRegiment.save();
        return res.json(newRegiment);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// PUT - Update workout Plans (Regiment ID)
const UpdateRegimentPlan = async (req, res) => {
    const { name, description, isCompleted } = req.body;
    const response = await regiment_model_1.Regiment.findByIdAndUpdate(req.params.id, { name, description, isCompleted });
    return res.status(200).json(response);
};
// GET  - Get all Workout Plans (Regiment ID)
const GetAllRegimentPlan = async (req, res) => {
    try {
        const allRegiments = await regiment_model_1.Regiment.find({ userid: req.params.id });
        return res.status(200).json(allRegiments);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - Get Workout Plan (Regiment ID)
const GetSingleRegimentPlan = async (req, res) => {
    try {
        const singleWorkout = await regiment_model_1.Regiment.findById(req.params.id);
        return res.status(200).json(singleWorkout);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// DELETE - Delete Regiment plans (Training ID)
const DeleteRegimentPlan = async (req, res) => {
    try {
        const deleteRegiment = await regiment_model_1.Regiment.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteRegiment);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.default = {
    CreateRegimentPlan,
    UpdateRegimentPlan,
    GetAllRegimentPlan,
    GetSingleRegimentPlan,
    DeleteRegimentPlan
};
