export const generateSteps = (pickup, drop, steps = 50) => {
    const latStep = (drop.lat - pickup.lat) / steps;
    const lngStep = (drop.lng - pickup.lng) / steps;
    const path = [];
    for (let i = 0; i <= steps; i++) {
        path.push({
            lat: pickup.lat + latStep * i,
            lng: pickup.lng + lngStep * i
        });
    }
    return path;
};
//# sourceMappingURL=movement.js.map