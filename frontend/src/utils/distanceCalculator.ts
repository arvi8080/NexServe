/**
 * Calculates Haversine geodesic distance between two GPS coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Number(distance.toFixed(2));
}

/**
 * Estimates doorstep travel arrival time in minutes based on distance.
 */
export function estimateTravelTimeMinutes(distanceKm: number): number {
  const averageCitySpeedKmh = 22; // City traffic average
  const prepTimeMins = 8;
  const travelMins = Math.ceil((distanceKm / averageCitySpeedKmh) * 60);
  return prepTimeMins + travelMins;
}

/**
 * Calculates travel charges if distance exceeds base free radius (5 km).
 */
export function calculateTravelFee(distanceKm: number): number {
  const freeRadiusKm = 5.0;
  if (distanceKm <= freeRadiusKm) return 0;
  const extraKm = distanceKm - freeRadiusKm;
  const ratePerKm = 15; // ₹15 per km beyond 5 km
  return Math.round(extraKm * ratePerKm);
}
