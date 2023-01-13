import {app} from "./app"
import db from "./db"
const PORT = process.env.PORT || 8000
const start = async() =>{
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    app.get("/",(req, res) =>{
        res.json({hello:"world"})
    })
    app.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}`);
    });
}
start();