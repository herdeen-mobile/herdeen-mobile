import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useUpdatePrayerSettingsMutation } from '@/src/hooks/use-prayer';

export default function LocationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [autoDetect, setAutoDetect] = useState(true);
  const [currentCity, setCurrentCity] = useState('Oko Erin Kwara Nigeria');
  const { mutate: updateSettings, isPending } = useUpdatePrayerSettingsMutation();

  const [recentLocations, setRecentLocations] = useState(['Oko Erin', 'Ibadan', 'Oke odo']);

  const handleAutoDetectToggle = async () => {
    const nextVal = !autoDetect;
    setAutoDetect(nextVal);
    if (nextVal) {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({});
          const reverse = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
          if (reverse.length > 0) {
            const place = reverse[0];
            const name = [place.city || place.subregion, place.region, place.country]
              .filter(Boolean)
              .join(' ');
            if (name) setCurrentCity(name);
          }

          updateSettings({
            data: {
              latitude: loc.coords.latitude.toString(),
              longitude: loc.coords.longitude.toString(),
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lagos',
            },
            wakeWorker: true,
          });
        }
      } catch (err) {
        console.warn('Location detection error:', err);
      }
    }
  };

  const handleSelectRecent = (locName: string) => {
    setAutoDetect(false);
    setCurrentCity(locName);
    updateSettings(
      {
        data: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lagos',
        },
        wakeWorker: true,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const filteredLocations = recentLocations.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Navigation Header */}
        <View className="flex-row items-center mb-6 gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Location</Text>
          {isPending && <ActivityIndicator size="small" color="#9333EA" style={{ marginLeft: 8 }} />}
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6 gap-3">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search for location"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-sm text-gray-800"
          />
        </View>

        {/* Current Location Toggle Card */}
        <View className="flex-row justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100 mb-6">
          <View className="flex-row items-center gap-3">
            <Ionicons name="navigate-outline" size={20} color="#4B5563" />
            <View>
              <Text className="text-sm font-semibold text-gray-800">Current location</Text>
              <Text className="text-xs text-gray-500">{currentCity}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleAutoDetectToggle} className={`w-12 h-7 rounded-full px-1 justify-center ${autoDetect ? 'bg-purple-500 items-end' : 'bg-gray-300 items-start'}`}>
            <View className="w-5 h-5 rounded-full bg-white shadow-sm" />
          </TouchableOpacity>
        </View>

        {/* Recent Locations Section */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent location</Text>
          <TouchableOpacity onPress={() => setRecentLocations([])}>
            <Text className="text-xs font-semibold text-purple-600">Clear all</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden mb-8">
          {filteredLocations.map((loc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectRecent(loc)}
              className={`flex-row justify-between items-center p-4 ${index !== filteredLocations.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons name="time-outline" size={18} color="#9CA3AF" />
                <Text className="text-sm font-medium text-gray-800">{loc}</Text>
              </View>
              <TouchableOpacity onPress={() => setRecentLocations(prev => prev.filter(p => p !== loc))}>
                <Ionicons name="close" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-center text-xs text-gray-400">
          Manually selecting a location will turn off auto-detect location
        </Text>

      </ScrollView>
    </View>
  );
}
