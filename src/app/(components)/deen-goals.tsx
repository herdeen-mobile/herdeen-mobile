// src/components/deen-goals.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/custom/button';

export default function DeenGoalsComponent() {
  const router = useRouter();
  const [goals, setGoals] = useState({
    prayer: true,
    quran: true,
    journaling: false,
    planning: false,
    menstrual: false,
  });

  const toggleGoal = (key: keyof typeof goals) => {
    setGoals(prev => ({ ...prev, [key]: !prev[key] }));
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
          <Text className="text-lg font-bold text-foreground">Your Deen Goals</Text>
        </View>

        <Text className="text-xs text-muted-foreground mb-6">
          Choose what you’d like support with, you’re in control.
        </Text>

        {/* Goal options list */}
        <View className="gap-3 mb-10">
          {[
            { key: 'prayer', label: 'Prayer consistency' },
            { key: 'quran', label: 'Qur’an memorization & revision' },
            { key: 'journaling', label: 'Journaling & reflection' },
            { key: 'planning', label: 'Daily planning' },
            { key: 'menstrual', label: 'Menstrual tracking' },
          ].map(item => {
            const isChecked = goals[item.key as keyof typeof goals];
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => toggleGoal(item.key as keyof typeof goals)}
                className="flex-row justify-between items-center bg-secondary/60 border border-border p-4 rounded-2xl active:bg-secondary"
              >
                <Text className="text-sm font-semibold text-foreground">{item.label}</Text>
                <View className={`w-6 h-6 rounded-md items-center justify-center ${isChecked ? 'bg-primary' : 'border border-gray-300 bg-white'}`}>
                  {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
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