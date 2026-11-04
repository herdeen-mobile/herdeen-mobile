// src/components/daily-preferences.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/custom/button';

export default function DailyPreferencesComponent() {
  const router = useRouter();
  const [reminderStyle, setReminderStyle] = useState('Gentle nudges');
  const [growthStyle, setGrowthStyle] = useState('Spiritual growth');

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
          <Text className="text-lg font-bold text-foreground">Daily Preferences</Text>
        </View>

        {/* Section 1: Reminder Style */}
        <Text className="text-xs font-semibold text-muted-foreground mb-3">Reminder Style</Text>
        <View className="gap-3 mb-6">
          {['Gentle nudges', 'Structured guidance', 'Minimal reminders'].map(style => {
            const isSelected = reminderStyle === style;
            return (
              <TouchableOpacity
                key={style}
                onPress={() => setReminderStyle(style)}
                className="flex-row justify-between items-center bg-secondary/60 border border-border p-4 rounded-2xl active:bg-secondary"
              >
                <Text className="text-sm font-semibold text-foreground">{style}</Text>
                <View className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? 'border-2 border-primary bg-purple-50' : 'border border-gray-300 bg-white'}`}>
                  {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section 2: Reminder Style / Focus */}
        <Text className="text-xs font-semibold text-muted-foreground mb-3">Reminder Style</Text>
        <View className="gap-3 mb-10">
          {['Productivity balance', 'Spiritual growth'].map(style => {
            const isSelected = growthStyle === style;
            return (
              <TouchableOpacity
                key={style}
                onPress={() => setGrowthStyle(style)}
                className="flex-row justify-between items-center bg-secondary/60 border border-border p-4 rounded-2xl active:bg-secondary"
              >
                <Text className="text-sm font-semibold text-foreground">{style}</Text>
                <View className={`w-6 h-6 rounded-md items-center justify-center ${isSelected ? 'bg-primary' : 'border border-gray-300 bg-white'}`}>
                  {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          label="Save"
          variant="primary"
          onPress={() => router.back()}
          className="bg-primary active:opacity-90"
          textClassName="text-white font-bold"
        />
      </ScrollView>
    </View>
  );
}