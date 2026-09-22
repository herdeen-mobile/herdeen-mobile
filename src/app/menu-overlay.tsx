// src/app/menu-overlay.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MenuOverlayScreen() {
  const router = useRouter();

  // State for the "Off Solah?" toggle switch
  const [isOffSolah, setIsOffSolah] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Container */}
      <ScrollView className="flex-1 px-6 pt-12 pb-10">

        {/* 1. Header: Back / Close button or Header title area if needed */}
        <View className="flex-row justify-end items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="close" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* 2. User Profile Info Section */}
        <View className="items-start mb-6">
          {/* Avatar Image */}
          <View className="w-20 h-20 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-purple-300 mb-4 shadow-sm">
            <Image
              source={require('../../assets/images/avatar.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-xs text-gray-400 font-medium mb-0.5">Asalam alaikum</Text>
          <Text className="text-2xl font-bold text-gray-900 tracking-tight">Aishah Abdullahi</Text>
        </View>

        {/* 3. Off Solah? Toggle Row */}
        <View className="flex-row justify-between items-center bg-gray-50/60 border border-gray-100 rounded-2xl px-4 py-3.5 mb-6">
          <View>
            <Text className="text-sm font-semibold text-gray-900">Off Solah?</Text>
            <Text className="text-[11px] text-gray-400 mt-0.5">Pause prayer tracking temporarily</Text>
          </View>
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
            thumbColor={isOffSolah ? '#9333EA' : '#F3F4F6'}
            ios_backgroundColor="#E5E7EB"
            onValueChange={() => setIsOffSolah(previousState => !previousState)}
            value={isOffSolah}
          />
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 mb-4" />

        {/* 4. Active Menu Links (Profile & Settings) */}
        <View className="gap-1 mb-6">
          <TouchableOpacity
            onPress={() => router.push('/profile' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-gray-50"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="user" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-gray-800">Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-gray-50"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="settings" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-gray-800">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 mb-5" />

        {/* 5. Coming Soon Section */}
        <View className="mb-6">
          <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Coming Soon</Text>

          <View className="opacity-50 gap-1">
            <View className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center gap-3.5">
                <Feather name="book-open" size={18} color="#9CA3AF" />
                <Text className="text-sm font-medium text-gray-500">Journal</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between py-3 px-2">
              <View className="flex-row items-center gap-3.5">
                <Ionicons name="sparkles-outline" size={18} color="#9CA3AF" />
                <Text className="text-sm font-medium text-gray-500">HerDeen AI</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 mb-4" />

        {/* 6. Secondary Links (Support & Rate Us) */}
        <View className="gap-1 mb-8">
          <TouchableOpacity className="flex-row items-center gap-3.5 py-3 px-2 rounded-xl active:bg-gray-50">
            <Feather name="headphones" size={20} color="#374151" />
            <Text className="text-sm font-semibold text-gray-800">Support</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-3.5 py-3 px-2 rounded-xl active:bg-gray-50">
            <Feather name="star" size={20} color="#374151" />
            <Text className="text-sm font-semibold text-gray-800">Rate Us</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Join Her Community Banner Card */}
        <View className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-3xl p-5 mb-8 flex-row justify-between items-center relative overflow-hidden">
          <View className="flex-1 pr-3">
            <View className="flex-row items-center gap-1.5 mb-1">
              <Text className="text-base font-bold text-gray-900">Join Her Community</Text>
              {/* Green WhatsApp or icon badge reference from design */}
              <View className="w-4 h-4 rounded-full bg-emerald-500 items-center justify-center">
                <Ionicons name="logo-whatsapp" size={10} color="white" />
              </View>
            </View>
            <Text className="text-[11px] text-gray-500 leading-relaxed">
              Join a circle of Muslimah sisters learning, planning, and growing — together.
            </Text>
          </View>

          {/* Decorative Plant Graphic representation using icons/shapes */}
          <View className="w-16 h-16 items-center justify-center">
            <View className="absolute w-8 h-8 rounded-full bg-purple-400 opacity-40 top-0 right-2" />
            <Ionicons name="flower-outline" size={36} color="#A855F7" />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}