const url = "http://localhost:6900"

// dummy data from southern manhattan
const userLatitude = 40.712670;
const userLongitude = -73.995819;
const radius = 500;

const restaurantList = await fetch(`${url}/getRestaurantList?lat=${userLatitude}&lon=${userLongitude}&radius=${radius}`)
    .then(response => response.json())

console.log(restaurantList)