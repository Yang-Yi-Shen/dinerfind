import express from "express";
import cors from 'cors';
import getRestaurantList from "./restaurants.js";

const app = express();
const PORT = 6900;

app.use(cors());

app.get('/getRestaurantList', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const radius = req.query.radius;

    const response = await getRestaurantList(lat, lon, radius);
    res.send(response);
})

app.listen(PORT, () => {
    'app listening on port 6900'
})