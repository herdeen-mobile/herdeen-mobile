import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import Svg, { Circle, Line, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.8;
const CENTER = COMPASS_SIZE / 2;

// Mecca coordinates
const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

export default function QiblahScreen() {
  const router = useRouter();

  const [heading, setHeading] = useState<number>(0);
  const [qiblaBearing, setQiblaBearing] = useState<number>(0);
  const [locationStatus, setLocationStatus] = useState<string>('Locating...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Fetch Location & Compute Qibla Bearing
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLocationStatus('Location permission denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;
        calculateQibla(latitude, longitude);
        setLocationStatus('Location acquired');
      } catch (error) {
        setErrorMsg('Could not fetch location');
        setLocationStatus('Using default position');
        // Fallback default coordinate if GPS fails
        calculateQibla(6.5244, 3.3792);
      }
    })();
  }, []);

  // Great-circle bearing calculation formula
  const calculateQibla = (lat: number, lon: number) => {
    const φ1 = (lat * Math.PI) / 180;
    const φ2 = (MECCA_LAT * Math.PI) / 180;
    const Δλ = ((MECCA_LON - lon) * Math.PI) / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    let theta = Math.atan2(y, x);
    let bearing = (theta * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    setQiblaBearing(bearing);
  };

  // 2. Subscribe to Device Magnetometer for Real Compass Rotation
  useEffect(() => {
    let subscription: any;

    const _subscribe = async () => {
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        setErrorMsg('Magnetometer sensor is not available on this device');
        return;
      }

      Magnetometer.setUpdateInterval(100);
      subscription = Magnetometer.addListener((data) => {
        let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
        let compassHeading = (angle + 360) % 360;
        setHeading(compassHeading);
      });
    };

    _subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const dialRotation = -heading;
  const qiblaNeedleRotation = qiblaBearing - heading;

  return (
    <View className="flex-1 bg-white justify-between pb-12">
      {/* Header */}
      <View className="px-5 pt-12 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Qibla Finder</Text>
        <View className="w-10" />
      </View>

      {/* Compass Body */}
      <View className="items-center px-5 justify-center">
        <View className="absolute -top-6 z-20 w-12 h-12 rounded-full bg-white border-2 border-purple-300 items-center justify-center shadow-md">
          <Ionicons name="cube" size={20} color="#7E22CE" />
        </View>

        <View
          style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}
          className="items-center justify-center relative bg-purple-50/30 rounded-full border-4 border-purple-200 shadow-inner"
        >
          <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} style={{ transform: [{ rotate: `${dialRotation}deg` }] }}>
            <Circle cx={CENTER} cy={CENTER} r={CENTER - 16} stroke="#E9D5FF" strokeWidth="2" fill="none" />

            <G>
              <Line x1={CENTER} y1="20" x2={CENTER} y2="35" stroke="#7E22CE" strokeWidth="3" />
              <Line x1={CENTER} y1={COMPASS_SIZE - 20} x2={CENTER} y2={COMPASS_SIZE - 35} stroke="#9CA3AF" strokeWidth="2" />
              <Line x1={COMPASS_SIZE - 20} y1={CENTER} x2={COMPASS_SIZE - 35} y2={CENTER} stroke="#9CA3AF" strokeWidth="2" />
              <Line x1="20" y1={CENTER} x2="35" y2={CENTER} stroke="#9CA3AF" strokeWidth="2" />
            </G>
          </Svg>

          <View
            style={{
              position: 'absolute',
              width: COMPASS_SIZE,
              height: COMPASS_SIZE,
              transform: [{ rotate: `${qiblaNeedleRotation}deg` }]
            }}
            className="items-center justify-center"
          >
            <View className="absolute top-10 items-center">
              <View className="w-4 h-16 bg-purple-600 rounded-full shadow-lg" />
            </View>
          </View>

          <View className="absolute w-10 h-10 rounded-full bg-purple-600 items-center justify-center shadow-md border-2 border-white">
            <View className="w-3 h-3 rounded-full bg-white" />
          </View>
        </View>

        <View className="mt-8 items-center">
          <Text className="text-sm font-semibold text-purple-700 mb-1">
            Qibla Bearing: {Math.round(qiblaBearing)}° from North
          </Text>
          <Text className="text-xs text-gray-400">
            {errorMsg || locationStatus}
          </Text>
        </View>
      </View>

      {/* Footer Instructions */}
      <View className="px-8 items-center">
        <Text className="text-sm text-gray-500 text-center leading-relaxed">
          To find the Qibla, hold your phone flat and follow the purple arrow.
        </Text>
      </View>
    </View>
  );
}