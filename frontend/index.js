import getLocation from "./getlocation.js";

const url = "http://localhost:6900"

// get user coordinates
const userCoords = await getLocation()
const userLatitude = userCoords.latitude;
const userLongitude = userCoords.longitude;
const radius = 500;

const restaurantData = await fetch(`${url}/getRestaurantList?lat=${userLatitude}&lon=${userLongitude}&radius=${radius}`)
    .then(response => response.json())

const restaurantList = document.getElementById('restaurant-list')
const restaurantListItems = restaurantData.map(restaurant => 
    `<li class="restaurant border-t px-4 pt-2 pb-3 last:border-b hover:bg-slate-50">
        <a class="hover:text-slate-600" href="https://www.google.com/maps/search/${restaurant.name}"><h2 class="restaurant-name text-lg font-bold inline">${restaurant.name !== undefined ? restaurant.name : '(Name unavailable)'}</h2></a>
        <p class="restaurant-address text-sm font-light text-slate-400">${restaurant.address}</p>
        <div class="restaurant-meta text-sm flex gap-2 mt-1">
            <p class="restaurant-meta-item text-slate-700 border-none px-1 rounded-sm bg-slate-200">${restaurant.distance}m</p>
            ${restaurant.cuisine !== undefined ? `<p class="restaurant-meta-item text-slate-700 border-none px-1 rounded-sm bg-slate-200">${restaurant.cuisine}</p>` : ''}
        </div>
    </li>`).join('')
restaurantList.innerHTML = restaurantListItems