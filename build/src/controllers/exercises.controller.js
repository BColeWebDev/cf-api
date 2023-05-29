"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const needle_1 = __importDefault(require("needle"));
let error = [];
const pagination_1 = __importDefault(require("../middleware/pagination"));
const regiment_model_1 = require("../models/regiment.model");
// Call 3rd Party endpoint 
const data_1 = __importDefault(require("./data"));
const WorkoutsProxy = async (method, query) => {
    const options = {
        "headers": {
            "x-rapidapi-host": `${process.env.API_HOST_EXERCISES}`,
            "x-rapidapi-key": `${process.env.API_KEY_EXERCISES}`
        }
    };
    const resData = await (0, needle_1.default)(`${method}`, `${process.env.API_URL_EXERCISES}${query ? query : " "}`, options);
    const body = resData.body;
    return body;
};
const MuscleGroupProxy = async (method, query, params) => {
    const options = {
        "headers": {
            "X-RapidAPI-Host": `${process.env.API_HOST_MUSCLE_GROUP}`,
            "X-RapidAPI-Key": `${process.env.API_KEY_MUSCLE_GROUP}`
        },
    };
    try {
        const response = await (0, needle_1.default)(`${method}`, `${process.env.API_URL_MUSCLE_GROUP}${query ? query : ""}${params ? `?${params}` : ""}`, options);
        return response.body;
    }
    catch (error) {
        console.log(error);
    }
};
//    ***EXERCISES***
// GET - All Excercises route 
const GetAllExercises = async (req, res) => {
    const page = req.query.page;
    const pageDisplay = req.query.limit;
    const sortation = req.query.sort;
    const filters = req.query.filters;
    console.log("fitlers", filters);
    if (page === undefined || pageDisplay === undefined) {
        return res.status(400).json({ error: "Page Number or Page Limit Missing" });
    }
    try {
        // let data = await WorkoutsProxy('get', "")
        // const filters = data.filter((val:any,) => val.target === "" || val.target === "chest")
        // // Pagination Check  
        let data = (0, pagination_1.default)(req, data_1.default);
        let results = {
            page: Number(page),
            pageDisplay: Number(pageDisplay),
            items: data
        };
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - All Body Parts
const GetAllBodyParts = async (req, res) => {
    try {
        const data = await WorkoutsProxy('get', "/bodyPartList");
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - Single Body Part
const GetSingleBodyPart = async (req, res) => {
    const name = req.params.name;
    const page = req.query.page;
    const pageDisplay = req.query.limit;
    try {
        const data = await WorkoutsProxy('get', `/bodyPart/${name}`);
        if (page === undefined || pageDisplay === undefined) {
            res.status(400).json({ error: "Page Number or Page Limit Missing" });
        }
        let results = {
            page: Number(page),
            pageDisplay: Number(pageDisplay),
            items: data
        };
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET- Muscle Group 
const GetAllMuscleGroup = async (req, res) => {
    try {
        const data = await WorkoutsProxy('get', '/targetList');
        res.json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - Muscle Single Group
const GetSingleMuscleGroup = async (req, res) => {
    const name = req.params.name;
    try {
        const data = await WorkoutsProxy('get', `/target/${name}`);
        let results = {
            page: Number(req.query.page),
            pageDisplay: Number(req.query.limit),
            items: (0, pagination_1.default)(req, data)
        };
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - All Equipment
const GetAllEquipment = async (req, res) => {
    try {
        const data = await WorkoutsProxy('get', '/equipmentList');
        res.json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
const GetSingleEquipment = async (req, res) => {
    const name = req.params.name;
    try {
        const data = await WorkoutsProxy('get', `/equipment/${name}`);
        let results = {
            page: Number(req.query.page),
            pageDisplay: Number(req.query.limit),
            items: (0, pagination_1.default)(req, data)
        };
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// GET - Get By Name
const GetByName = async (req, res) => {
    const name = req.params.name;
    try {
        const data = await WorkoutsProxy('get', `/name/${name}`);
        let results = {
            page: Number(req.query.page),
            pageDisplay: Number(req.query.limit),
            items: (0, pagination_1.default)(req, data)
        };
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
//  ***Muscle Group***
// Available Muscle Groups
const GetMuscleGroup = async (req, res) => {
    try {
        const data = await MuscleGroupProxy('get', "/getMuscleGroups");
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Available Muscle Groups
const GetImages = async (req, res) => {
    try {
        let params = {
            muscleGroups: 'biceps,chest,hamstring',
            color: '200,100,80',
            transparentBackground: '0'
        };
        const data = await MuscleGroupProxy('get', `/getImage`, 'muscleGroups=biceps,chest,hamstring&color=200,100,80&transparentBackground=0');
        res.status(200).send(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Routines
const createWorkout = async (req, res) => {
    const { name, imageUrl, equipment, muscle_target, bodyPart, regimentID } = req.body;
    try {
        if (regimentID === undefined) {
            return res.status(400).json({ message: "no workoutid found" });
        }
        if (name === undefined || imageUrl === undefined || equipment === undefined || muscle_target === undefined || bodyPart === undefined) {
            return res.status(400).json({ message: "missing values" });
        }
        await regiment_model_1.Regiment.findById(req.params.id, (err, results) => {
            if (!results) {
                return res.status(404).json({ message: "No Regiment Id found" });
            }
            results?.routines.id(regimentID).workouts.push({ name, equipment, muscle_target, imageUrl, bodyPart });
            results?.save();
            res.status(200).json({ message: `Success! workout ${name} has been added!` });
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
const updateWorkout = async (req, res) => {
    try {
        const { name, imageUrl, equipment, muscle_target, bodyPart, regimentID, workoutID } = req.body;
        if (regimentID === undefined || workoutID === undefined) {
            return res.status(400).json({ message: "Error! missing ids" });
        }
        regiment_model_1.Regiment.findOne({ _id: req.params.id }, (err, results) => {
            if (!results) {
                return res.status(404).json({ message: "No Regiment Id found" });
            }
            results.routines.id(regimentID).workouts.id(workoutID).name = name;
            results.routines.id(regimentID).workouts.id(workoutID).equipment = equipment;
            results.routines.id(regimentID).workouts.id(workoutID).muscle_target = muscle_target;
            results.routines.id(regimentID).workouts.id(workoutID).bodyPart = bodyPart;
            results.routines.id(regimentID).workouts.id(workoutID).imageUrl = imageUrl;
            results?.save();
            res.status(200).json(results);
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
const getAllWorkouts = async (req, res) => {
    const { regimentID } = req.body;
    try {
        await regiment_model_1.Regiment.findById(req.params.id, (err, results) => {
            if (!results) {
                return res.status(404).json({ message: "No Regiment Id found" });
            }
            res.status(200).json({ "workouts": results?.routines.id(regimentID).workouts });
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
const getSingleWorkout = async (req, res) => {
    const { regimentID, workoutID } = req.body;
    try {
        const response = await regiment_model_1.Regiment.findById(req.params.id, (err, results) => {
            if (!results) {
                return res.status(404).json({ message: "No Regiment ID found" });
            }
            res.status(200).json(results.routines.id(regimentID).workout(workoutID));
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
const deleteWorkout = async (req, res) => {
    const { regimentID, workoutID } = req.body;
    try {
        if (regimentID === undefined || workoutID === undefined) {
            return res.status(400).json({ message: "missing ids" });
        }
        regiment_model_1.Regiment.findOne({ _id: req.params.id }, (err, results) => {
            if (!results) {
                return res.status(404).json({ message: "No Regiment Id found" });
            }
            if (results.routines.id(regimentID).workouts.id(workoutID)) {
                results.routines.id(regimentID).workouts.id(workoutID)?.remove();
                results.save();
                return res.status(200).json({ message: results.routines.id(regimentID).workouts.id(workoutID) });
            }
            else {
                return res.status(404).json({ message: "workout ID not found!" });
            }
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.default = {
    GetAllExercises,
    GetAllBodyParts,
    GetSingleBodyPart,
    GetAllMuscleGroup,
    GetSingleMuscleGroup,
    GetSingleEquipment,
    GetAllEquipment,
    GetByName,
    GetMuscleGroup,
    GetImages,
    createWorkout,
    updateWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout
};
