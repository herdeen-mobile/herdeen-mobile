// src/app/(components)/notifications.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">Notifications</Text>
        </View>

        {/* Options List */}
        <View className="gap-4">
          {/* Prayer Reminders */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/prayer-reminders')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center mr-3">
                <Ionicons name="cloud-outline" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">Prayer Reminders</Text>
                <Text className="text-xs text-muted-foreground mt-0.5">Control alerts for each salah</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Daily Nudges */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/daily-nudges')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center mr-3">
                <Feather name="clock" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">Daily Nudges</Text>
                <Text className="text-xs text-muted-foreground mt-0.5">Reminders for Qur'an, adhkar, and reflection</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Quiet Hours */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/quiet-hours')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center mr-3">
                <Ionicons name="notifications-off-outline" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">Quiet Hours</Text>
                <Text className="text-xs text-muted-foreground mt-0.5">Choose when you don't want to be disturbed</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}