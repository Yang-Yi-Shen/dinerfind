const url = "http://localhost:6900"

// dummy data from southern manhattan
const userLatitude = 40.712670;
const userLongitude = -73.995819;
const radius = 500;

const restaurantData = await fetch(`${url}/getRestaurantList?lat=${userLatitude}&lon=${userLongitude}&radius=${radius}`)
    .then(response => response.json())

const restaurantList = document.getElementById('restaurant-list')
const restaurantListItems = restaurantData.map(restaurant => 
    `<li>
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <p class="restaurant-address">${restaurant.address}</p>
        <div class="restaurant-meta">
            <p class="restaurant-meta-item">${restaurant.distance}</p>
            <p class="restaurant-meta-item">${restaurant.cuisine}</p>
        </div>
    </li>`).join('')
restaurantList.innerHTML = restaurantListItems