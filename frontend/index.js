const url = "http://localhost:6900"

// dummy data from southern manhattan
const userLatitude = 40.712670;
const userLongitude = -73.995819;
const radius = 500;

const restaurantData = await fetch(`${url}/getRestaurantList?lat=${userLatitude}&lon=${userLongitude}&radius=${radius}`)
    .then(response => response.json())

const restaurantList = document.getElementById('restaurant-list')
const restaurantListItems = restaurantData.map(restaurant => 
    `<li class="restaurant border-t last:border-b  px-4 pt-2 pb-3">
        <h2 class="restaurant-name text-lg font-bold">${restaurant.name}</h2>
        <p class="restaurant-address text-sm font-light text-slate-400">${restaurant.address}</p>
        <div class="restaurant-meta text-sm flex gap-2 mt-1">
            <p class="restaurant-meta-item text-slate-50 border-none px-1 rounded-sm bg-slate-300">${restaurant.distance}</p>
            <p class="restaurant-meta-item text-slate-50 border-none px-1 rounded-sm bg-slate-300">${restaurant.cuisine}</p>
        </div>
    </li>`).join('')
restaurantList.innerHTML = restaurantListItems