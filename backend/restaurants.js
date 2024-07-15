import axios from 'axios';
import haversine from 'haversine-distance';

// replace if switching API instance
const overpassUrl = "https://overpass-api.de/api/interpreter";

async function fetchRestaurants(lat, lon, radius) {
    const query = `
    [out:json];
    node
        ["amenity"="restaurant"]
        (around:${radius},${lat},${lon});
    out body;
    `;

    try {
        const response = await axios.post(overpassUrl, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return response.data.elements;
    } catch (error) {
        console.error("Error fetching data from Overpass API:", error);
    }
}

// fetch and display restaurants in vicinity
async function getRestaurantList(userLatitude, userLongitude, radius) {
    const restaurantData = await fetchRestaurants(userLatitude, userLongitude, radius);

    let restaurantList = []
    for (const restaurant of restaurantData) {
        // IMPORTANT: using geoJSON convention, meaning lon first then lat
        const name = restaurant.tags.name;
        const distance = haversine([restaurant.lon, restaurant.lat], [userLongitude, userLatitude]);
        const cuisine = restaurant.tags.cuisine;

        const addressObject = Object.fromEntries(
            Object.entries(restaurant.tags).filter(([key]) => key.startsWith('addr:'))
        );
        let addressArray = [];
        for (const key in addressObject) {
            addressArray.push(addressObject[key]);
        }
        const address = addressArray.join(' ');

        restaurantList.push({
            name: name,
            address: address,
            distance: distance,
            cuisine: cuisine
        })
    }

    restaurantList.sort((a, b) => a.distance - b.distance)
    
    return restaurantList;
}

// // test call using location in southern manhattan
// const userLatitude = 40.712670;
// const userLongitude = -73.995819;
// const radius = 500;

// const restaurantList = getRestaurantList(userLatitude, userLongitude, radius);

export default getRestaurantList;