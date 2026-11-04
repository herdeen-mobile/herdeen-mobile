// src/app/(components)/daily-nudges.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function DailyNudgesScreen() {
  const router = useRouter();

  const [nudges, setNudges] = useState({
    quran: true,
    adhkar: true,
    reflection: false,
  });

  const [selectedTime, setSelectedTime] = useState('7:00 AM');

  const toggleNudge = (key: keyof typeof nudges) => {
    setNudges((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Saved Daily Nudges:', { nudges, time: selectedTime });
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold text-foreground mb-6">Daily Nudges</Text>

        {/* Nudges List */}
        <View className="gap-3 mb-8">
          {[
            { key: 'quran', label: "Qur'an Reminder", icon: 'cloud-outline' },
            { key: 'adhkar', label: 'Adhkar Reminder', icon: 'sunny-outline' },
            { key: 'reflection', label: 'Reflection', icon: 'moon-outline' },
          ].map((item) => {
            const isChecked = nudges[item.key as keyof typeof nudges];
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                onPress={() => toggleNudge(item.key as keyof typeof nudges)}
                className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <View className="flex-row items-center">
                  <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                  <Text className="text-sm font-semibold text-foreground ml-3">{item.label}</Text>
                </View>
                <View className={`w-6 h-6 rounded-lg items-center justify-center border ${isChecked ? 'bg-primary border-primary' : 'border-border bg-card'}`}>
                  {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Time Trigger Field */}
        <View className="mb-12">
          <Text className="text-xs font-semibold text-muted-foreground mb-2">Time</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <View pointerEvents="none">
              <Input value={selectedTime} editable={false} />
            </View>
            <View className="absolute right-4 top-3.5">
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <Button
          label="Save"
          variant="primary"
          onPress={handleSave}
          className="bg-primary active:opacity-90 rounded-full py-4"
          textClassName="text-white font-bold text-base"
        />
      </ScrollView>
    </View>
  );
}