// src/app/(components)/deen-goals.tsx
import { Button } from '../../../components/custom/button';
import { useAuth } from '@/src/context/auth-context';
import { useUpdateUserDataMutation } from '@/src/hooks/use-auth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DeenGoalsComponent() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { mutateAsync: updateUserData, isPending } = useUpdateUserDataMutation();

  const [goals, setGoals] = useState({
    prayer: true,
    quran: true,
    journaling: false,
    planning: false,
    menstrual: false,
  });

  useEffect(() => {
    if (user?.deenGoals && Array.isArray(user.deenGoals) && user.deenGoals.length > 0) {
      setGoals({
        prayer: user.deenGoals.some((g: string) => g.toLowerCase().includes('prayer')),
        quran: user.deenGoals.some((g: string) => g.toLowerCase().includes('quran')),
        journaling: user.deenGoals.some((g: string) => g.toLowerCase().includes('journal')),
        planning: user.deenGoals.some((g: string) => g.toLowerCase().includes('plan')),
        menstrual: user.deenGoals.some((g: string) => g.toLowerCase().includes('menstrual')),
      });
    }
  }, [user?.deenGoals]);

  const toggleGoal = (key: keyof typeof goals) => {
    setGoals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    const selectedGoals: string[] = [];
    if (goals.prayer) selectedGoals.push('prayer');
    if (goals.quran) selectedGoals.push('quran');
    if (goals.journaling) selectedGoals.push('journaling');
    if (goals.planning) selectedGoals.push('planning');
    if (goals.menstrual) selectedGoals.push('menstrual');

    try {
      await updateUserData({ deenGoals: selectedGoals });
      await updateUser({ deenGoals: selectedGoals });
      router.back();
    } catch (e) {
      console.warn('Error updating deen goals on server, updating locally:', e);
      await updateUser({ deenGoals: selectedGoals });
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6 pt-12 pb-12"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center mr-4 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Your Deen Goals</Text>
        </View>

        <Text className="text-xs text-gray-400 mb-6">
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
          ].map((item) => {
            const isChecked = goals[item.key as keyof typeof goals];
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => toggleGoal(item.key as keyof typeof goals)}
                className="flex-row justify-between items-center bg-gray-50 border border-gray-100 p-4 rounded-2xl active:bg-gray-100"
              >
                <Text className="text-sm font-semibold text-gray-800">{item.label}</Text>
                <View
                  className={`w-6 h-6 rounded-md items-center justify-center ${
                    isChecked ? 'bg-primary' : 'border border-gray-300 bg-white'
                  }`}
                >
                  {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          label={
            isPending ? <ActivityIndicator size="small" color="#FFFFFF" /> : 'Save'
          }
          variant="primary"
          onPress={handleSave}
          disabled={isPending}
          className="bg-primary active:opacity-90 rounded-full h-12"
          textClassName="text-white font-bold"
        />
      </ScrollView>
    </View>
  );
}