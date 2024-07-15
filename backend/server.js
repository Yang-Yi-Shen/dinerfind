import express from "express";
import restaurantList from "./restaurants.js";

const app = express();
const PORT = 6900;

app.listen(PORT, () => {
    'app listening on port 6900'
})