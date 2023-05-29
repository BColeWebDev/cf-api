"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regiment_model_1 = require("../models/regiment.model");
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const createTrainingDay = async (req, res) => {
    if (req.params.id === undefined) {
        return res.status(400).json({ message: "No Regiment Id found" });
    }
    if (req.body.name === undefined || req.body.description === undefined) {
        return res.status(400).json({ message: "missing name / description" });
    }
    try {
        const response = await regiment_model_1.Regiment.find({ _id: req.params.id });
        if (response.length === 0) {
            res.status(400).json({ message: "no regiment found" });
        }
        response[0].routines.push({ name: req.body.name, day: days[req.body.day], description: req.body.description, workouts: [] });
        const newTrainingDay = await regiment_model_1.Regiment.updateOne({ _id: req.params.id }, { routines: response[0].routines });
        return res.status(200).json(newTrainingDay);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
// Updates day, name and description
const UpdateTrainingDay = async (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).json({ message: "No Regiment Id found" });
    }
    try {
        const response = await regiment_model_1.Regiment.findOne({ _id: req.params.id });
        if (req.body.day < 0 || req.body.day > 6) {
            res.status(400).json("invalid entry");
        }
        else {
            response.routines[req.body.index].day = days[Number(req.body.day)];
            response.routines[req.body.index].name = req.body.name ?? response?.routines[req.body.index].name;
            response.routines[req.body.index].description = req.body.description ?? response?.routines[req.body.index].description;
            response.save();
            return res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
// 
const findSingleTrainingDay = async (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).json({ message: "No Regiment Id found" });
    }
    try {
        const response = await regiment_model_1.Regiment.findOne({ _id: req.params.id });
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
const DeleteTrainingDay = async (req, res) => {
    try {
        if (req.params.id === undefined || req.body._id === undefined) {
            return res.status(400).json({ message: "No Regiment Id found" });
        }
        regiment_model_1.Regiment.findOne({ _id: req.params.id }, (err, results) => {
            if (!results) {
                res.status(404).json({ message: "No Regiment Id found" });
            }
            else {
                results.routines.id(req.body._id)?.remove();
                results.save();
                res.status(200).json(results);
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
const getAllTrainingDays = async (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).json({ message: "No Regiment Id found" });
    }
    try {
        const response = await regiment_model_1.Regiment.findOne({ _id: req.params.id });
        res.status(200).json({ "routines": response?.routines });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
exports.default = {
    createTrainingDay,
    UpdateTrainingDay,
    getAllTrainingDays,
    findSingleTrainingDay,
    DeleteTrainingDay,
};
