// src/components/personalization.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PersonalizationComponent() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">Personalisation</Text>
        </View>

        {/* Options List */}
        <View className="gap-2">
          {/* Deen Goals */}
          <TouchableOpacity
            onPress={() => router.push('./deen-goals' as any)}
            className="flex-row justify-between items-center py-4 px-3 rounded-2xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5 flex-1">
              <View className="w-10 h-10 rounded-xl bg-purple-50 items-center justify-center">
                <Ionicons name="flower-outline" size={20} color="#D8B4FE" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-0.5">Deen Goals</Text>
                <Text className="text-xs text-muted-foreground">What you want to stay consistent with</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="h-[1px] bg-border my-1" />

          {/* Daily Preferences */}
          <TouchableOpacity
            onPress={() => router.push('./daily-preferences' as any)}
            className="flex-row justify-between items-center py-4 px-3 rounded-2xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5 flex-1">
              <View className="w-10 h-10 rounded-xl bg-purple-50 items-center justify-center">
                <Feather name="clock" size={20} color="#D8B4FE" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-0.5">Daily Preferences</Text>
                <Text className="text-xs text-muted-foreground">Adjust reminders and how the app supports you</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="h-[1px] bg-border my-1" />

          {/* Cycle Settings */}
          <TouchableOpacity
            onPress={() => router.push('./cycle-settings' as any)}
            className="flex-row justify-between items-center py-4 px-3 rounded-2xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5 flex-1">
              <View className="w-10 h-10 rounded-xl bg-purple-50 items-center justify-center">
                <MaterialCommunityIcons name="water-outline" size={20} color="#D8B4FE" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-0.5">Cycle Settings</Text>
                <Text className="text-xs text-muted-foreground">Manage your menstrual cycle and off-salah mode</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}