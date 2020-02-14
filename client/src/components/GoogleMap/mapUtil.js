function getLocationsFromRestaurants(restaurants) {
    return restaurants.map(restaurant => {
        if (restaurant.latitude && restaurant.longitude) {
            return {
                name: restaurant.name,
                points: {
                    lat: restaurant.latitude,
                    lng: restaurant.longitude
                }
            }
        }
    })
}

export {
    getLocationsFromRestaurants
}