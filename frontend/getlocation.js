async function getLocation() {
    const locationPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    const location = await locationPromise; 
    return location.coords;
}

export default getLocation;