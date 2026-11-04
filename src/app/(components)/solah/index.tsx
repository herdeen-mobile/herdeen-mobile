import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Helper to convert "HH:MM am/pm" into total minutes from midnight for easy comparison
const timeToMinutes = (timeStr: string) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier.toLowerCase() === 'pm' && hours < 12) hours += 12;
  if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export default function SolahScreen() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock update loop
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Define prayer schedule
  const rawPrayers = [
    { name: 'Fajr', time: '5:25 AM', icon: <MaterialCommunityIcons name="weather-sunset-up" size={20} color="#4B5563" />, sound: true },
    { name: 'Sunrise', time: '6:45 AM', icon: <MaterialCommunityIcons name="weather-sunny" size={20} color="#4B5563" />, sound: false },
    { name: 'Dhuhr', time: '12:44 PM', icon: <MaterialCommunityIcons name="white-balance-sunny" size={20} color="#D946EF" />, sound: true },
    { name: 'Asr', time: '3:50 PM', icon: <MaterialCommunityIcons name="weather-cloudy" size={20} color="#4B5563" />, sound: false },
    { name: 'Maghrib', time: '6:45 PM', icon: <MaterialCommunityIcons name="weather-sunset" size={20} color="#4B5563" />, sound: true },
    { name: 'Isha', time: '7:56 PM', icon: <Ionicons name="moon-outline" size={20} color="#4B5563" />, sound: true },
  ];

  // Determine current active prayer and next prayer dynamically
  let currentIndex = rawPrayers.findIndex((p, idx) => {
    const currentMins = timeToMinutes(p.time);
    const nextMins = rawPrayers[idx + 1] ? timeToMinutes(rawPrayers[idx + 1].time) : 1440;
    return currentMinutes >= currentMins && currentMinutes < nextMins;
  });

  // Fallback if before Fajr or after Isha
  if (currentIndex === -1) {
    currentIndex = currentMinutes < timeToMinutes(rawPrayers[0].time) ? rawPrayers.length - 1 : 0;
  }

  const nextIndex = (currentIndex + 1) % rawPrayers.length;
  const currentPrayer = rawPrayers[currentIndex];
  const nextPrayer = rawPrayers[nextIndex];

  // Calculate countdown minutes to next prayer
  const nextPrayerMins = timeToMinutes(nextPrayer.time);
  let diffMins = nextPrayerMins - currentMinutes;
  if (diffMins < 0) diffMins += 1440; // Next day rollover

  const hoursLeft = Math.floor(diffMins / 60);
  const minsLeft = diffMins % 60;
  const countdownText = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m to ${nextPrayer.name}` : `${minsLeft} Min to ${nextPrayer.name} Prayer`;

  // Attach dynamic active/current indicators to the list
  const prayers = rawPrayers.map((item, idx) => ({
    ...item,
    current: idx === currentIndex,
    isNext: idx === nextIndex,
  }));

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Header Title & Settings Icon */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Solah</Text>
          <TouchableOpacity
            onPress={() => router.push('/(components)/solah/settings' as any)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <Ionicons name="settings-outline" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Date & Countdown Info Banner */}
        <View className="bg-purple-50/80 border border-purple-100 rounded-3xl p-5 mb-8">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xs text-gray-500 mb-0.5">17 Ramadan 1446 AH</Text>
              <Text className="text-lg font-bold text-gray-900">Today</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 tracking-tight">{formattedTime}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-white/80 rounded-full px-4 py-2 border border-purple-100/60">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs text-gray-700">☀️ Now {currentPrayer.name} time</Text>
              <Ionicons name="information-circle-outline" size={14} color="#6B7280" />
            </View>
            <View className="bg-purple-200/60 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-purple-900">{countdownText}</Text>
            </View>
          </View>
        </View>

        {/* Timeline Prayer List */}
        <View className="relative pl-4">
          {/* Vertical timeline spine line */}
          <View className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-purple-200" />

          <View className="gap-4">
            {prayers.map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center justify-between py-3 px-3 rounded-2xl border shadow-xs ${
                  item.isNext
                    ? 'bg-purple-50/60 border-purple-300'
                    : item.current
                    ? 'bg-white border-purple-200'
                    : 'bg-white border-gray-100'
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-10 h-10 rounded-xl items-center justify-center z-10 ${item.isNext || item.current ? 'bg-purple-100 border border-purple-300' : 'bg-gray-50 border border-gray-100'}`}>
                    {item.icon}
                  </View>
                  <View>
                    <Text className={`text-base font-bold ${item.isNext || item.current ? 'text-purple-700' : 'text-gray-800'}`}>
                      {item.name}
                    </Text>
                    {item.isNext && <Text className="text-[10px] text-purple-500 font-medium">Next Prayer</Text>}
                  </View>
                </View>

                <View className="flex-row items-center gap-4">
                  <Text className={`text-sm font-semibold ${item.isNext ? 'text-purple-800' : 'text-gray-600'}`}>{item.time}</Text>
                  <Ionicons
                    name={item.sound ? "volume-high" : "volume-mute"}
                    size={18}
                    color={item.sound ? "#D946EF" : "#9CA3AF"}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}