// src/app/(components)/prayer-reminders.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/custom/button';

export default function PrayerRemindersScreen() {
  const router = useRouter();

  // Toggles for Salah prayers
  const [prayers, setPrayers] = useState({
    fajr: true,
    dhuhr: false,
    asr: false,
    maghrib: true,
    isha: true,
  });

  // Radio state for Reminder Type
  const [reminderType, setReminderType] = useState<'sound' | 'vibration' | 'silent'>('sound');

  const togglePrayer = (key: keyof typeof prayers) => {
    setPrayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Saved Prayer Reminders:', { prayers, reminderType });
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

        <Text className="text-xl font-bold text-foreground mb-6">Prayer reminders</Text>

        {/* Prayer Toggles list */}
        <View className="gap-3 mb-8">
          {[
            { key: 'fajr', label: 'Fajr', icon: 'cloud-outline' },
            { key: 'dhuhr', label: 'Dhuhr', icon: 'sunny-outline' },
            { key: 'asr', label: 'Asr', icon: 'partly-sunny-outline' },
            { key: 'maghrib', label: 'Maghrib', icon: 'sunset-outline' },
            { key: 'isha', label: 'Isha', icon: 'moon-outline' },
          ].map((item) => {
            const isChecked = prayers[item.key as keyof typeof prayers];
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                onPress={() => togglePrayer(item.key as keyof typeof prayers)}
                className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <View className="flex-row items-center">
                  <Ionicons name={item.icon as any} size={20} color="#6B7280" className="mr-3" />
                  <Text className="text-sm font-semibold text-foreground ml-3">{item.label}</Text>
                </View>
                <View className={`w-6 h-6 rounded-lg items-center justify-center border ${isChecked ? 'bg-primary border-primary' : 'border-border bg-card'}`}>
                  {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Reminder Type Selection */}
        <Text className="text-base font-bold text-foreground mb-4">Reminder Type</Text>
        <View className="gap-3 mb-12">
          {[
            { id: 'sound', label: 'Sound', icon: 'volume-high-outline' },
            { id: 'vibration', label: 'Vibration', icon: 'phone-portrait-outline' },
            { id: 'silent', label: 'Silent notification', icon: 'notifications-off-outline' },
          ].map((type) => {
            const isSelected = reminderType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                activeOpacity={0.8}
                onPress={() => setReminderType(type.id as any)}
                className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <View className="flex-row items-center">
                  <Ionicons name={type.icon as any} size={20} color="#6B7280" />
                  <Text className="text-sm font-semibold text-foreground ml-3">{type.label}</Text>
                </View>
                <View className={`w-6 h-6 rounded-full items-center justify-center border ${isSelected ? 'border-primary' : 'border-border'}`}>
                  {isSelected && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            );
          })}
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