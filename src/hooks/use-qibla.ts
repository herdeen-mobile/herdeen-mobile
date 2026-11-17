/**
 * TanStack React Query & Sensor hooks for Qibla Direction & Geolocation
 */

import { QiblaLocationData } from '@/src/types/qibla';
import {
  calculateDistanceToMecca,
  calculateQiblaBearing,
} from '@/src/utils/qibla-math';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

export const QIBLA_QUERY_KEYS = {
  location: ['qibla', 'location'] as const,
};

export const useQiblaLocationQuery = () => {
  return useQuery<QiblaLocationData, Error>({
    queryKey: QIBLA_QUERY_KEYS.location,
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error(
          'Location permission denied. Please allow location access to calculate the accurate Qibla direction.'
        );
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;
      let city = 'Current Location';
      let country = '';

      try {
        const [geocode] = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geocode) {
          city = geocode.city || geocode.subregion || geocode.district || 'Current Location';
          country = geocode.country || '';
        }
      } catch (e) {
        console.warn('[useQiblaLocationQuery] Reverse geocoding failed:', e);
      }

      const qiblaBearing = calculateQiblaBearing(latitude, longitude);
      const distanceToMeccaKm = calculateDistanceToMecca(latitude, longitude);

      return {
        latitude,
        longitude,
        city,
        country,
        qiblaBearing,
        distanceToMeccaKm,
      };
    },
    staleTime: 1000 * 60 * 30, // 30 minutes cache to preserve battery
    retry: 1,
  });
};
