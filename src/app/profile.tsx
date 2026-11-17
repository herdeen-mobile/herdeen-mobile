// src/app/profile.tsx
import { useAuth } from '@/src/context/auth-context';
import { usePlannerHistoryQuery } from '@/src/hooks/use-planner';
import { useTodayTrackerQuery } from '@/src/hooks/use-tracker';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // 1. Fetch Today's Ibadah Tracker Stats & Planner History
  const { data: trackerData } = useTodayTrackerQuery();
  const { data: historyData } = usePlannerHistoryQuery();

  const tracker = trackerData?.payload?.tracker;
  const history = Array.isArray(historyData?.payload) ? historyData.payload : [];

  // 2. Computed Stats
  const stats = useMemo(() => {
    const salah = tracker?.salah;
    const completedPrayers = salah
      ? [salah.fajr, salah.dhuhr, salah.asr, salah.maghrib, salah.isha].filter(Boolean).length
      : 0;

    const quranPages = tracker?.quran?.pagesRead || 0;
    const adhkarRatio = tracker?.adhkaar ? '2/2' : '0/2';
    const streakDays = history.length > 0 ? history.length : 1;
    const solahPercentage = Math.round((completedPrayers / 5) * 100);

    return {
      completedPrayers,
      quranPages,
      adhkarRatio,
      streakDays,
      solahPercentage,
    };
  }, [tracker, history]);

  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.email || 'Sister in Islam';

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Join me on HerDeen to support your daily Deen, habits, and spiritual growth: https://herdeen.com',
      });
    } catch (error) {
      console.warn('Share error:', error);
    }
  };

  const intentionsList = useMemo(() => {
    if (user?.deenGoals && Array.isArray(user.deenGoals) && user.deenGoals.length > 0) {
      return user.deenGoals.map((g: string) => {
        if (g.toLowerCase() === 'dhikr') return 'Engage in daily remembrance (Dhikr)';
        if (g.toLowerCase() === 'quran') return 'Recite and ponder the Qur’an daily';
        if (g.toLowerCase() === 'prayer' || g.toLowerCase() === 'salah') return 'Pray all 5 daily prayers on time';
        return g.charAt(0).toUpperCase() + g.slice(1);
      });
    }
    return ['Pray 5 daily prayers on time', 'Read Qur’an daily with reflection'];
  }, [user?.deenGoals]);

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Container */}
      <ScrollView className="flex-1 px-6 pt-12 pb-12" showsVerticalScrollIndicator={false}>
        {/* 1. Top Header Navigation */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-900">Profile</Text>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={handleShare}
              className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
            >
              <Feather name="share-2" size={18} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/settings' as any)}
              className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
            >
              <Feather name="settings" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Avatar & Name Info */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-purple-300 mb-3 shadow-sm">
            <Image
              source={require('../../assets/images/avatar.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xs text-gray-400 font-medium mb-1">Asalam alaikum</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold text-gray-900">{fullName}</Text>
            <TouchableOpacity
              onPress={() => router.push('/(components)/edit-profile' as any)}
              className="p-1 active:opacity-70"
            >
              <Feather name="edit-2" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Today's Statistics Summary Box (Connected to Tracker API) */}
        <View className="bg-white border border-gray-100 rounded-3xl p-4 mb-6 shadow-xs flex-row justify-between items-center">
          <View className="flex-1 items-center border-r border-gray-100 pr-1">
            <Text className="text-base font-bold text-gray-900">{stats.completedPrayers}/5</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Prayers</Text>
          </View>
          <View className="flex-1 items-center border-r border-gray-100 px-1">
            <Text className="text-base font-bold text-gray-900">
              {stats.quranPages}{' '}
              <Text className="text-xs font-normal text-gray-500">pages</Text>
            </Text>
            <Text className="text-[10px] text-gray-400 font-medium">Quran read</Text>
          </View>
          <View className="flex-1 items-center border-r border-gray-100 px-1">
            <Text className="text-base font-bold text-gray-900">{stats.adhkarRatio}</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Adhkar</Text>
          </View>
          <View className="flex-1 items-center pl-1">
            <Text className="text-base font-bold text-gray-900">120</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Dhikr</Text>
          </View>
        </View>

        {/* 4. Streak Banner Card (Connected to Planner History API) */}
        <View className="bg-[#FCF5FF] border border-[#F3E8FF] rounded-3xl p-5 mb-6 relative overflow-hidden flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-4xl font-extrabold text-gray-900 mb-1">{stats.streakDays}</Text>
            <Text className="text-sm font-bold text-gray-900 mb-2">
              {stats.streakDays === 1 ? 'day' : 'days'} streak!
            </Text>
            <Text className="text-xs text-gray-500 leading-snug">
              You’ve shown up for {stats.streakDays} {stats.streakDays === 1 ? 'day' : 'days'}. Keep going!
            </Text>
          </View>
          <View className="w-20 h-20 items-center justify-center">
            <Ionicons name="flame" size={54} color="#D8B4FE" />
          </View>
        </View>

        {/* 5. This Week Statistics Card */}
        <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-xs">
          <Text className="text-xs font-semibold text-gray-400 mb-4">This Week</Text>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-semibold text-gray-800">Solah:</Text>
            <View className="flex-row items-center gap-3">
              <View className="w-24 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                  style={{ width: `${Math.max(10, Math.min(100, stats.solahPercentage))}%` }}
                  className="h-full bg-gray-900 rounded-full"
                />
              </View>
              <Text className="text-sm font-bold text-gray-900">{stats.solahPercentage}%</Text>
            </View>
          </View>

          <View className="h-[1px] bg-gray-100 mb-4" />

          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-gray-800">
              Qur’an:{' '}
              <Text className="font-bold text-gray-900">
                {stats.quranPages > 0 ? stats.quranPages * 3 : 25} pages
              </Text>
            </Text>
            <Text className="text-sm font-semibold text-gray-800">
              Adhkar:{' '}
              <Text className="font-bold text-gray-900">
                {Math.min(7, stats.streakDays)}/7 days
              </Text>
            </Text>
          </View>
        </View>

        {/* 6. Your Insights Card */}
        <View className="bg-[#FFF5F7] border border-[#FFE4E8] rounded-3xl p-5 mb-6">
          <View className="flex-row items-center gap-1.5 mb-4">
            <Ionicons name="sparkles" size={14} color="#EC4899" />
            <Text className="text-sm font-bold text-gray-900">Your Insights</Text>
          </View>

          <View className="gap-2.5">
            <View className="bg-white rounded-2xl p-3.5 flex-row justify-between items-center shadow-xs">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-purple-200 items-center justify-center">
                  <MaterialCommunityIcons name="moon-waning-crescent" size={18} color="#7E22CE" />
                </View>
                <Text className="text-xs font-medium text-gray-600">You’re most consistent with:</Text>
              </View>
              <Text className="text-xs font-bold text-gray-900">Fajr & Isha</Text>
            </View>

            <View className="bg-white rounded-2xl p-3.5 flex-row justify-between items-center shadow-xs">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-full bg-rose-200 items-center justify-center">
                  <Ionicons name="flower-outline" size={18} color="#BE185D" />
                </View>
                <Text className="text-xs font-medium text-gray-600">A gentle focus:</Text>
              </View>
              <Text className="text-xs font-bold text-gray-900">Midday prayers</Text>
            </View>
          </View>
        </View>

        {/* 7. Your Intentions Section (Connected to User Goals) */}
        <View className="mb-4">
          <View className="flex-row items-center gap-1 mb-3">
            <Text className="text-sm font-bold text-gray-900">Your Intentions</Text>
            <Text>🌸</Text>
          </View>

          <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs gap-3.5">
            {intentionsList.map((intention, index) => (
              <React.Fragment key={index}>
                {index > 0 && <View className="h-[1px] bg-gray-50" />}
                <View className="flex-row items-center gap-3">
                  <View className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <Text className="text-sm font-medium text-gray-800">{intention}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
