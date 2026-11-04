// src/app/(components)/account-security.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function AccountSecurityScreen() {
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
          <Text className="text-xl font-bold text-foreground">Account & Security</Text>
        </View>

        {/* Options List */}
        <View className="gap-4">
          {/* Password Item */}
          <TouchableOpacity
            onPress={() => router.push('/change-password')}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center mr-3">
                <Feather name="lock" size={20} color="#6B7280" />
              </View>
              <View>
                <Text className="text-sm font-bold text-foreground">Password</Text>
                <Text className="text-xs text-muted-foreground mt-0.5">••••••••</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Reset Data Item */}
          <TouchableOpacity
            onPress={() => {
              console.log('Reset Data pressed');
            }}
            className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
          >
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center mr-3">
                <Ionicons name="refresh-outline" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">Reset Data</Text>
                <Text className="text-xs text-muted-foreground mt-0.5" numberOfLines={2}>
                  This will clear; Salah tracking, Qur'an logs, Adhkar progress
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}