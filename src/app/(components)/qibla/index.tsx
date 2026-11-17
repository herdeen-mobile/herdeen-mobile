// src/app/(components)/qibla/index.tsx
import { useQiblaLocationQuery } from '@/src/hooks/use-qibla';
import { isAlignedWithQibla } from '@/src/utils/qibla-math';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = Math.min(width * 0.78, 320);
const CENTER = COMPASS_SIZE / 2;

export default function QiblahScreen() {
  const router = useRouter();

  // 1. TanStack Query to acquire GPS location and compute Qibla bearing & distance
  const {
    data: locationData,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
    refetch: refetchLocation,
    isRefetching,
  } = useQiblaLocationQuery();

  const [heading, setHeading] = useState<number>(0);
  const [sensorAvailable, setSensorAvailable] = useState<boolean>(true);
  const lastVibratedRef = useRef<number>(0);

  // 2. Magnetometer Sensor Subscription with throttling for optimal performance
  useEffect(() => {
    let subscription: any;
    let lastUpdate = 0;

    const subscribeToMagnetometer = async () => {
      try {
        const available = await Magnetometer.isAvailableAsync();
        setSensorAvailable(available);
        if (!available) return;

        Magnetometer.setUpdateInterval(120); // 120ms interval avoids CPU churn
        subscription = Magnetometer.addListener((data) => {
          const now = Date.now();
          if (now - lastUpdate < 80) return; // Throttled updates
          lastUpdate = now;

          const angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
          const compassHeading = (angle + 360) % 360;
          setHeading(Math.round(compassHeading));
        });
      } catch (err) {
        console.warn('[QiblaScreen] Sensor subscription error:', err);
        setSensorAvailable(false);
      }
    };

    subscribeToMagnetometer();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const qiblaBearing = locationData?.qiblaBearing ?? 0;
  const distanceKm = locationData?.distanceToMeccaKm ?? 0;
  const cityName = locationData?.city
    ? `${locationData.city}${locationData.country ? `, ${locationData.country}` : ''}`
    : 'Current Location';

  const dialRotation = -heading;
  const qiblaNeedleRotation = qiblaBearing - heading;

  // Alignment detection using spherical math utility
  const isFacingQibla = Boolean(locationData) && isAlignedWithQibla(heading, qiblaBearing, 5);

  // Haptic feedback when aligned
  useEffect(() => {
    if (isFacingQibla) {
      const now = Date.now();
      if (now - lastVibratedRef.current > 3000) {
        lastVibratedRef.current = now;
        Vibration.vibrate(40);
      }
    }
  }, [isFacingQibla]);

  return (
    <View className="flex-1 bg-white justify-between pb-12">
      {/* 1. Header */}
      <View className="px-5 pt-12 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Qibla Finder</Text>
        <TouchableOpacity
          onPress={() => refetchLocation()}
          disabled={isRefetching}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
        >
          {isRefetching ? (
            <ActivityIndicator size="small" color="#D946EF" />
          ) : (
            <Ionicons name="navigate-outline" size={18} color="#4B5563" />
          )}
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLocationLoading && !locationData && (
        <View className="items-center justify-center py-20 px-6">
          <ActivityIndicator size="large" color="#D946EF" />
          <Text className="text-base font-bold text-gray-900 mt-4">Acquiring GPS Position...</Text>
          <Text className="text-xs text-gray-500 text-center mt-1">
            Calculating your precise bearing and distance to the Holy Kaaba.
          </Text>
        </View>
      )}

      {/* Error State */}
      {isLocationError && !locationData && (
        <View className="items-center justify-center py-20 px-6">
          <Ionicons name="location-outline" size={48} color="#EF4444" />
          <Text className="text-base font-bold text-gray-900 mt-4">Location Access Required</Text>
          <Text className="text-xs text-gray-500 text-center mt-1 mb-6">
            {locationError?.message ||
              'Please grant location permissions to calculate your Qibla direction.'}
          </Text>
          <TouchableOpacity
            onPress={() => refetchLocation()}
            className="bg-primary px-6 py-3 rounded-full active:opacity-80"
          >
            <Text className="text-sm font-bold text-white">Retry Location</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 2. Compass Center Container (Rendered when location data is available) */}
      {locationData && (
        <>
          <View className="items-center px-5 justify-center">
            {/* Alignment Badge */}
            <View className="mb-4">
              {isFacingQibla ? (
                <View className="bg-emerald-50 border border-emerald-300 px-4 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-xs">
                  <Ionicons name="checkmark-circle" size={16} color="#059669" />
                  <Text className="text-xs font-bold text-emerald-800">Facing the Qibla (Kaaba)</Text>
                </View>
              ) : (
                <View className="bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full flex-row items-center gap-1.5">
                  <Text className="text-xs font-semibold text-purple-700">
                    Rotate phone until needle aligns with Kaaba
                  </Text>
                </View>
              )}
            </View>

            {/* Kaaba Badge Watermark */}
            <View
              className={`z-20 w-12 h-12 rounded-full items-center justify-center shadow-md mb-[-24px] ${
                isFacingQibla
                  ? 'bg-emerald-500 border-2 border-emerald-300'
                  : 'bg-white border-2 border-purple-300'
              }`}
            >
              <Ionicons name="cube" size={22} color={isFacingQibla ? '#FFFFFF' : '#7E22CE'} />
            </View>

            {/* SVG Compass Body */}
            <View
              style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}
              className={`items-center justify-center relative rounded-full border-4 shadow-inner ${
                isFacingQibla
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-purple-50/30 border-purple-200'
              }`}
            >
              {/* Compass Dial Rotating With Device Orientation */}
              <Svg
                width={COMPASS_SIZE}
                height={COMPASS_SIZE}
                style={{ transform: [{ rotate: `${dialRotation}deg` }] }}
              >
                <Circle
                  cx={CENTER}
                  cy={CENTER}
                  r={CENTER - 16}
                  stroke={isFacingQibla ? '#A7F3D0' : '#E9D5FF'}
                  strokeWidth="2"
                  fill="none"
                />

                {/* Cardinal Marks */}
                <G>
                  <Line x1={CENTER} y1="18" x2={CENTER} y2="32" stroke="#DC2626" strokeWidth="3" />
                  <SvgText
                    x={CENTER}
                    y="46"
                    fill="#DC2626"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    N
                  </SvgText>

                  <Line
                    x1={CENTER}
                    y1={COMPASS_SIZE - 18}
                    x2={CENTER}
                    y2={COMPASS_SIZE - 32}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  />
                  <SvgText
                    x={CENTER}
                    y={COMPASS_SIZE - 36}
                    fill="#9CA3AF"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    S
                  </SvgText>

                  <Line
                    x1={COMPASS_SIZE - 18}
                    y1={CENTER}
                    x2={COMPASS_SIZE - 32}
                    y2={CENTER}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  />
                  <SvgText
                    x={COMPASS_SIZE - 38}
                    y={CENTER + 4}
                    fill="#9CA3AF"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    E
                  </SvgText>

                  <Line x1="18" y1={CENTER} x2="32" y2={CENTER} stroke="#9CA3AF" strokeWidth="2" />
                  <SvgText
                    x="40"
                    y={CENTER + 4}
                    fill="#9CA3AF"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    W
                  </SvgText>
                </G>
              </Svg>

              {/* Qibla Direction Needle */}
              <View
                style={{
                  position: 'absolute',
                  width: COMPASS_SIZE,
                  height: COMPASS_SIZE,
                  transform: [{ rotate: `${qiblaNeedleRotation}deg` }],
                }}
                className="items-center justify-center pointer-events-none"
              >
                <View className="absolute top-10 items-center">
                  <View
                    className={`w-3.5 h-16 rounded-full shadow-lg ${
                      isFacingQibla ? 'bg-emerald-600' : 'bg-primary'
                    }`}
                  />
                  <View className="w-4 h-4 rounded-full bg-white border-2 border-purple-500 mt-[-8px]" />
                </View>
              </View>

              {/* Heading Center Pin */}
              <View className="w-6 h-6 rounded-full bg-gray-900 border-2 border-white items-center justify-center shadow-sm">
                <View className="w-1.5 h-1.5 rounded-full bg-white" />
              </View>
            </View>
          </View>

          {/* 3. Bottom Information & Bearing Cards */}
          <View className="px-5">
            <View className="bg-gray-50 border border-gray-100 rounded-3xl p-5 mb-3 flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 items-center justify-center">
                  <MaterialCommunityIcons name="compass-outline" size={22} color="#D946EF" />
                </View>
                <View>
                  <Text className="text-xs text-gray-400 font-medium">Qibla Direction</Text>
                  <Text className="text-base font-bold text-gray-900">
                    {Math.round(qiblaBearing)}° from North
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-400 font-medium">Distance</Text>
                <Text className="text-sm font-bold text-purple-700">{distanceKm} km</Text>
              </View>
            </View>

            <View className="bg-gray-50/70 border border-gray-100 rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="location-sharp" size={16} color="#9CA3AF" />
                <Text numberOfLines={1} className="text-xs text-gray-600 font-medium max-w-[200px]">
                  {cityName}
                </Text>
              </View>
              <Text className="text-[11px] text-gray-400 font-medium">Device: {heading}°</Text>
            </View>
          </View>
        </>
      )}

      {/* Sensor Warning banner if magnetometer not available */}
      {!sensorAvailable && (
        <View className="mx-5 bg-amber-50 border border-amber-200 p-3 rounded-2xl flex-row items-center gap-2">
          <Ionicons name="warning-outline" size={18} color="#D97706" />
          <Text className="text-xs text-amber-800 flex-1">
            Compass sensor not detected. You can still orient yourself using the bearing of{' '}
            {Math.round(qiblaBearing)}°.
          </Text>
        </View>
      )}
    </View>
  );
}
