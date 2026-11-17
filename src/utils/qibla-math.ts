/**
 * Qibla Spherical Trigonometry & Geodesic Distance Calculations
 */

// Coordinates of the Holy Kaaba in Mecca, Saudi Arabia
export const MECCA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206,
} as const;

export const MECCA_LAT = MECCA_COORDINATES.latitude;
export const MECCA_LON = MECCA_COORDINATES.longitude;

/**
 * Calculates Qibla direction bearing from true North (0° to 360°)
 * Using the great-circle forward azimuth formula
 */
export function calculateQiblaBearing(latitude: number, longitude: number): number {
  const φ1 = (latitude * Math.PI) / 180;
  const φ2 = (MECCA_LAT * Math.PI) / 180;
  const Δλ = ((MECCA_LON - longitude) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const theta = Math.atan2(y, x);
  const bearing = (theta * 180) / Math.PI;
  return (bearing + 360) % 360;
}

/**
 * Calculates Great-Circle Distance to Mecca in Kilometers using Haversine formula
 */
export function calculateDistanceToMecca(latitude: number, longitude: number): number {
  const R = 6371; // Earth's mean radius in kilometers
  const dLat = ((MECCA_LAT - latitude) * Math.PI) / 180;
  const dLon = ((MECCA_LON - longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((MECCA_LAT * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Normalizes an angle into the 0° - 359.99° range
 */
export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Determines whether the user device heading is aligned with the Qibla bearing
 * within a given tolerance threshold (default +/- 4 degrees)
 */
export function isAlignedWithQibla(
  heading: number,
  qiblaBearing: number,
  toleranceDegrees: number = 4
): boolean {
  const diff = Math.abs(normalizeAngle(qiblaBearing - heading));
  return diff <= toleranceDegrees || diff >= 360 - toleranceDegrees;
}

