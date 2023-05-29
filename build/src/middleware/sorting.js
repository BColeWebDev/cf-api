"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sorting = (req, results) => {
    try {
        const sorts = req.query.sort;
        let key = sorts.split(':')[0];
        let val = sorts.split(':')[1];
        console.log("key", key);
        console.log("val", val);
        return results.sort((a, b) => {
            return val === "asc" ? a[key] >= b[key] ? 1 : -1 : a[key] >= b[key] ? -1 : 1;
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = Sorting;
