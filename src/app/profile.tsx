// src/app/profile.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Container */}
      <ScrollView className="flex-1 px-6 pt-12 pb-12">

        {/* 1. Top Header Navigation */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-900">Profile</Text>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center">
              <Feather name="share-2" size={18} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/settings' as any)}
              className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
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
            <Text className="text-2xl font-bold text-gray-900">Aishah Abdullahi</Text>
            <TouchableOpacity className="p-1">
              <Feather name="edit-2" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Today's Statistics Summary Box */}
        <View className="bg-white border border-gray-100 rounded-3xl p-4 mb-6 shadow-xs flex-row justify-between items-center">
          <View className="flex-1 items-center border-r border-gray-100 pr-1">
            <Text className="text-base font-bold text-gray-900">3/5</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Prayers</Text>
          </View>
          <View className="flex-1 items-center border-r border-gray-100 px-1">
            <Text className="text-base font-bold text-gray-900">5 <Text className="text-xs font-normal text-gray-500">pages</Text></Text>
            <Text className="text-[10px] text-gray-400 font-medium">Quran read</Text>
          </View>
          <View className="flex-1 items-center border-r border-gray-100 px-1">
            <Text className="text-base font-bold text-gray-900">1/2</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Adhkar</Text>
          </View>
          <View className="flex-1 items-center pl-1">
            <Text className="text-base font-bold text-gray-900">120</Text>
            <Text className="text-[10px] text-gray-400 font-medium">Dhikr</Text>
          </View>
        </View>

        {/* 4. Streak Banner Card */}
        <View className="bg-[#FCF5FF] border border-[#F3E8FF] rounded-3xl p-5 mb-6 relative overflow-hidden flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-4xl font-extrabold text-gray-900 mb-1">6</Text>
            <Text className="text-sm font-bold text-gray-900 mb-3">days streak!</Text>
            <Text className="text-xs text-gray-500 leading-snug">
              You’ve shown up for 6 days. Keep going!
            </Text>
          </View>
          {/* Flame Icon Illustration Container */}
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
                <View className="w-[80%] h-full bg-gray-900 rounded-full" />
              </View>
              <Text className="text-sm font-bold text-gray-900">80%</Text>
            </View>
          </View>

          <View className="h-[1px] bg-gray-100 mb-4" />

          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-gray-800">Qur’an: <Text className="font-bold text-gray-900">25 pages</Text></Text>
            <Text className="text-sm font-semibold text-gray-800">Adhkar: <Text className="font-bold text-gray-900">5/7 days</Text></Text>
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

        {/* 7. Your Intentions Section */}
        <View className="mb-4">
          <View className="flex-row items-center gap-1 mb-3">
            <Text className="text-sm font-bold text-gray-900">Your Intentions</Text>
            <Text>🌸</Text>
          </View>

          <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs gap-3.5">
            <View className="flex-row items-center gap-3">
              <View className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <Text className="text-sm font-medium text-gray-800">Pray on time</Text>
            </View>
            <View className="h-[1px] bg-gray-50" />
            <View className="flex-row items-center gap-3">
              <View className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <Text className="text-sm font-medium text-gray-800">Read Qur’an daily</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}