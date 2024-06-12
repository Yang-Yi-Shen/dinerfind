import axios from 'axios';

async function fetchNumRestaurants(lat, lon, radius) {
    // overpass API endpoint
    const overpassUrl = "https://overpass-api.de/api/interpreter";

    // overpass QL query
    const query = `
    [out:json];
    node
      ["amenity"="restaurant"]
      (around:${radius},${lat},${lon});
    out count;
    `;

    try {
        // request to overpass API
        const response = await axios.post(overpassUrl, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        // extract number of restaurants from response
        const count = response.data.elements[0]?.tags?.total || 0;

        // return result
        return count;
    } catch (error) {
        // catch error
        console.error("Error fetching data from Overpass API:", error);
    }
}

// test fetch from southern manhattan
const latitude = 40.712670; 
const longitude = -73.995819;
const radius = 500; 

// Fetch and display the number of restaurants
console.log(await fetchNumRestaurants(latitude, longitude, radius));