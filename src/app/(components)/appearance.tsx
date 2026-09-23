// src/app/(components)/appearance.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AppearanceScreen() {
  const router = useRouter();

  // State for the selected theme mode ('light' | 'dark' | 'system')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const handleSelectTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    console.log('Selected Theme:', selectedTheme);
    // Add your color scheme toggle logic here (e.g., NativeWind useColorScheme or Appearance API)
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 1. Header Navigation */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">Appearance</Text>
        </View>

        {/* 2. Theme Options List */}
        <View className="gap-4">

          {/* Light Mode Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSelectTheme('light')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center gap-4">
              {/* Light Mode Mockup Icon */}
              <View className="w-16 h-12 rounded-xl bg-gray-100 border border-gray-200 p-1.5 justify-between">
                <View className="flex-row justify-between items-center">
                  <View className="w-3 h-1.5 bg-gray-300 rounded-sm" />
                  <View className="w-2 h-2 bg-gray-300 rounded-full" />
                </View>
                <View className="w-full h-4 bg-white rounded border border-gray-200 shadow-sm" />
                <View className="flex-row justify-between">
                  <View className="w-2.5 h-2 bg-gray-300 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-300 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-300 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-300 rounded-sm" />
                </View>
              </View>
              <Text className="text-base font-semibold text-foreground">Light</Text>
            </View>

            {/* Radio Button */}
            <View className={`w-6 h-6 rounded-full items-center justify-center border ${theme === 'light' ? 'border-primary' : 'border-border'}`}>
              {theme === 'light' && <View className="w-3 h-3 rounded-full bg-primary" />}
            </View>
          </TouchableOpacity>

          {/* Dark Mode Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSelectTheme('dark')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center gap-4">
              {/* Dark Mode Mockup Icon */}
              <View className="w-16 h-12 rounded-xl bg-gray-900 border border-gray-800 p-1.5 justify-between">
                <View className="flex-row justify-between items-center">
                  <View className="w-3 h-1.5 bg-gray-700 rounded-sm" />
                  <View className="w-2 h-2 bg-gray-700 rounded-full" />
                </View>
                <View className="w-full h-4 bg-gray-800 rounded border border-gray-700" />
                <View className="flex-row justify-between">
                  <View className="w-2.5 h-2 bg-gray-700 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-700 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-700 rounded-sm" />
                  <View className="w-2.5 h-2 bg-gray-700 rounded-sm" />
                </View>
              </View>
              <Text className="text-base font-semibold text-foreground">Dark</Text>
            </View>

            {/* Radio Button */}
            <View className={`w-6 h-6 rounded-full items-center justify-center border ${theme === 'dark' ? 'border-primary' : 'border-border'}`}>
              {theme === 'dark' && <View className="w-3 h-3 rounded-full bg-primary" />}
            </View>
          </TouchableOpacity>

          {/* System Mode Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSelectTheme('system')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center gap-4">
              {/* System Split Mockup Icon */}
              <View className="w-16 h-12 rounded-xl overflow-hidden border border-gray-300 flex-row">
                <View className="w-1/2 bg-gray-100 p-1.5 justify-between">
                  <View className="w-2 h-1 bg-gray-300 rounded-sm" />
                  <View className="w-full h-4 bg-white rounded" />
                  <View className="w-2 h-1.5 bg-gray-300 rounded-sm" />
                </View>
                <View className="w-1/2 bg-gray-900 p-1.5 justify-between">
                  <View className="w-2 h-1 bg-gray-700 rounded-sm" />
                  <View className="w-full h-4 bg-gray-800 rounded" />
                  <View className="w-2 h-1.5 bg-gray-700 rounded-sm" />
                </View>
              </View>
              <Text className="text-base font-semibold text-foreground">System</Text>
            </View>

            {/* Radio Button */}
            <View className={`w-6 h-6 rounded-full items-center justify-center border ${theme === 'system' ? 'border-primary' : 'border-border'}`}>
              {theme === 'system' && <View className="w-3 h-3 rounded-full bg-primary" />}
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}