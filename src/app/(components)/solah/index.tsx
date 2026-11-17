// src/app/(components)/solah/index.tsx
import { usePrayerTimesQuery } from '@/src/hooks/use-prayer';
import { useTodayTrackerQuery, useTogglePrayerMutation } from '@/src/hooks/use-tracker';
import {
  formatPrayerTime12Hour,
  getHijriDateString,
  timeToMinutes,
} from '@/src/utils/time-utils';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SolahScreen() {
  const router = useRouter();

  // 1. Clock timer updating every second
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 2. TanStack React Queries for Prayer Times & Today's Ibadah Tracker
  const {
    data: prayerData,
    isLoading: isPrayerLoading,
    isError: isPrayerError,
    error: prayerError,
    refetch: refetchPrayer,
    isRefetching: isPrayerRefetching,
  } = usePrayerTimesQuery();

  const {
    data: trackerData,
    isLoading: isTrackerLoading,
    refetch: refetchTracker,
    isRefetching: isTrackerRefetching,
  } = useTodayTrackerQuery();

  const { mutate: togglePrayerApi, isPending: isTogglingPrayer } = useTogglePrayerMutation();

  const [soundSettings, setSoundSettings] = useState<Record<string, boolean>>({
    Fajr: true,
    Sunrise: false,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });

  const toggleSound = (prayerName: string) => {
    setSoundSettings((prev) => ({
      ...prev,
      [prayerName]: !prev[prayerName],
    }));
  };

  const isRefreshing = isPrayerRefetching || isTrackerRefetching;
  const handleRefresh = async () => {
    await Promise.all([refetchPrayer(), refetchTracker()]);
  };

  // 3. Computed prayer times and active countdown calculation
  const prayerTimesPayload = prayerData?.payload?.prayers;
  const salahTracker = trackerData?.payload?.tracker?.salah;

  const prayerSchedule = useMemo(() => {
    if (!prayerTimesPayload) return null;

    const fajrTime = formatPrayerTime12Hour(prayerTimesPayload.fajr);
    const sunriseTime = formatPrayerTime12Hour(prayerTimesPayload.sunrise);
    const dhuhrTime = formatPrayerTime12Hour(prayerTimesPayload.dhuhr);
    const asrTime = formatPrayerTime12Hour(prayerTimesPayload.asr);
    const maghribTime = formatPrayerTime12Hour(prayerTimesPayload.maghrib);
    const ishaTime = formatPrayerTime12Hour(prayerTimesPayload.isha);

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const rawPrayers = [
      {
        name: 'Fajr',
        key: 'fajr' as const,
        time: fajrTime,
        icon: <MaterialCommunityIcons name="weather-sunset-up" size={20} color="#4B5563" />,
        completed: Boolean(salahTracker?.fajr),
      },
      {
        name: 'Sunrise',
        key: null,
        time: sunriseTime,
        icon: <MaterialCommunityIcons name="weather-sunny" size={20} color="#4B5563" />,
        completed: false,
      },
      {
        name: 'Dhuhr',
        key: 'dhuhr' as const,
        time: dhuhrTime,
        icon: <MaterialCommunityIcons name="white-balance-sunny" size={20} color="#D946EF" />,
        completed: Boolean(salahTracker?.dhuhr),
      },
      {
        name: 'Asr',
        key: 'asr' as const,
        time: asrTime,
        icon: <MaterialCommunityIcons name="weather-cloudy" size={20} color="#4B5563" />,
        completed: Boolean(salahTracker?.asr),
      },
      {
        name: 'Maghrib',
        key: 'maghrib' as const,
        time: maghribTime,
        icon: <MaterialCommunityIcons name="weather-sunset" size={20} color="#4B5563" />,
        completed: Boolean(salahTracker?.maghrib),
      },
      {
        name: 'Isha',
        key: 'isha' as const,
        time: ishaTime,
        icon: <Ionicons name="moon-outline" size={20} color="#4B5563" />,
        completed: Boolean(salahTracker?.isha),
      },
    ];

    let currentIndex = rawPrayers.findIndex((p, idx) => {
      const pMins = timeToMinutes(p.time);
      const nextPMins =
        idx < rawPrayers.length - 1 ? timeToMinutes(rawPrayers[idx + 1].time) : 1440;
      return currentMinutes >= pMins && currentMinutes < nextPMins;
    });

    if (currentIndex === -1) currentIndex = rawPrayers.length - 1;

    const nextIndex = (currentIndex + 1) % rawPrayers.length;
    const currentPrayer = rawPrayers[currentIndex];
    const nextPrayer = rawPrayers[nextIndex];

    const nextPrayerMins = timeToMinutes(nextPrayer.time);
    let diffMins = nextPrayerMins - currentMinutes;
    if (diffMins < 0) diffMins += 1440;

    const hoursLeft = Math.floor(diffMins / 60);
    const minsLeft = diffMins % 60;
    const countdownText =
      hoursLeft > 0
        ? `${hoursLeft}h ${minsLeft}m to ${nextPrayer.name}`
        : `${minsLeft} Min to ${nextPrayer.name} Prayer`;

    const hijri = getHijriDateString(currentTime);

    const prayers = rawPrayers.map((item, idx) => ({
      ...item,
      current: idx === currentIndex,
      isNext: idx === nextIndex,
      sound: soundSettings[item.name] ?? true,
    }));

    return {
      prayers,
      currentPrayer,
      nextPrayer,
      countdownText,
      hijri,
    };
  }, [prayerTimesPayload, salahTracker, currentTime, soundSettings]);

  const handleTogglePrayer = (
    prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | null,
    currentCompleted: boolean
  ) => {
    if (!prayerKey) return;
    togglePrayerApi({
      prayer: prayerKey,
      completed: !currentCompleted,
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-12 pb-10"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#D946EF" />
        }
      >
        {/* Header Title & Settings Icon */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Solah</Text>
          <TouchableOpacity
            onPress={() => router.push('/(components)/solah/settings' as any)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
          >
            <Ionicons name="settings-outline" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {isPrayerLoading && !prayerSchedule && (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#D946EF" />
            <Text className="text-sm font-semibold text-gray-700 mt-4">
              Loading accurate prayer times...
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              Calculating astronomical timings from server
            </Text>
          </View>
        )}

        {/* Error State */}
        {isPrayerError && !prayerSchedule && (
          <View className="items-center justify-center py-20 px-6">
            <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" />
            <Text className="text-base font-bold text-gray-900 mt-4">
              Unable to load prayer times
            </Text>
            <Text className="text-xs text-gray-500 text-center mt-1 mb-6">
              {prayerError?.message || 'Check your internet connection and try again.'}
            </Text>
            <TouchableOpacity
              onPress={() => refetchPrayer()}
              className="bg-primary px-6 py-3 rounded-full active:opacity-80"
            >
              <Text className="text-sm font-bold text-white">Retry Prayer Times</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Prayer Schedule Loaded */}
        {prayerSchedule && (
          <>
            {/* Date & Countdown Info Banner */}
            <View className="bg-purple-50/80 border border-purple-100 rounded-3xl p-5 mb-8">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-xs text-gray-500 mb-0.5">{prayerSchedule.hijri}</Text>
                  <Text className="text-lg font-bold text-gray-900">Today</Text>
                </View>
                <Text className="text-3xl font-bold text-gray-900 tracking-tight">{formattedTime}</Text>
              </View>

              <View className="flex-row justify-between items-center bg-white/80 rounded-full px-4 py-2 border border-purple-100/60">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-xs text-gray-700">
                    ☀️ Now {prayerSchedule.currentPrayer.name} time
                  </Text>
                  <Ionicons name="information-circle-outline" size={14} color="#6B7280" />
                </View>
                <View className="bg-purple-200/60 rounded-full px-3 py-1">
                  <Text className="text-xs font-semibold text-purple-900">
                    {prayerSchedule.countdownText}
                  </Text>
                </View>
              </View>
            </View>

            {/* Timeline Prayer List */}
            <View className="relative pl-4 mb-10">
              {/* Vertical timeline spine line */}
              <View className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-purple-200" />

              <View className="gap-4">
                {prayerSchedule.prayers.map((item, index) => (
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
                    <View className="flex-row items-center gap-3.5 flex-1">
                      <View
                        className={`w-10 h-10 rounded-xl items-center justify-center z-10 ${
                          item.isNext || item.current
                            ? 'bg-purple-100 border border-purple-300'
                            : 'bg-gray-50 border border-gray-100'
                        }`}
                      >
                        {item.icon}
                      </View>
                      <View className="flex-1">
                        <Text
                          className={`text-base font-bold ${
                            item.isNext || item.current ? 'text-purple-700' : 'text-gray-800'
                          }`}
                        >
                          {item.name}
                        </Text>
                        {item.isNext && (
                          <Text className="text-[10px] text-purple-500 font-medium">Next Prayer</Text>
                        )}
                      </View>
                    </View>

                    <View className="flex-row items-center gap-3">
                      <Text
                        className={`text-sm font-semibold ${
                          item.isNext ? 'text-purple-800' : 'text-gray-600'
                        }`}
                      >
                        {item.time}
                      </Text>

                      {/* Sound toggle */}
                      <TouchableOpacity
                        onPress={() => toggleSound(item.name)}
                        className="p-1 active:opacity-70"
                      >
                        <Ionicons
                          name={item.sound ? 'volume-high' : 'volume-mute'}
                          size={18}
                          color={item.sound ? '#D946EF' : '#9CA3AF'}
                        />
                      </TouchableOpacity>

                      {/* Completion checkmark for Salah prayers */}
                      {item.key ? (
                        <TouchableOpacity
                          onPress={() => handleTogglePrayer(item.key, item.completed)}
                          disabled={isTogglingPrayer}
                          className={`w-7 h-7 rounded-full items-center justify-center border active:opacity-75 ${
                            item.completed
                              ? 'bg-emerald-500 border-emerald-600'
                              : 'bg-gray-50 border-gray-300'
                          }`}
                        >
                          {item.completed ? (
                            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                          ) : (
                            <View className="w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </TouchableOpacity>
                      ) : (
                        <View className="w-7 h-7" />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
