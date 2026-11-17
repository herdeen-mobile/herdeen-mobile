/**
 * Types for Qibla Compass & Geolocation
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface QiblaLocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  qiblaBearing: number;
  distanceToMeccaKm: number;
}

export interface QiblaCompassState {
  heading: number; // 0 to 360 degrees
  qiblaBearing: number; // True North bearing to Kaaba
  relativeAngle: number; // Angle relative to device heading
  isFacingQibla: boolean; // Aligned within tolerance
  sensorAvailable: boolean;
}

