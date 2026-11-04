import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SolahSettingsScreen() {
  const router = useRouter();
  const [adhanSound, setAdhanSound] = useState(false);
  const [vibration, setVibration] = useState(true);
  const [jumuahReminder, setJumuahReminder] = useState(true);
  const [tahajjudReminder, setTahajjudReminder] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Navigation Header */}
        <View className="flex-row items-center mb-6 gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Prayer settings</Text>
        </View>

        {/* Section 1: Prayer Location & Calculations */}
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Prayer Location</Text>
        <View className="bg-gray-50/50 rounded-2xl border border-gray-100 mb-6 overflow-hidden">

          <TouchableOpacity
            onPress={() => router.push('/(components)/solah/location' as any)}
            className="flex-row justify-between items-center p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="navigate-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-semibold text-gray-800">Current Location</Text>
                <Text className="text-xs text-gray-500">Ilorin East, Nigeria</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/solah/calculation-method' as any)}
            className="flex-row justify-between items-center p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="calculator-variant-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-semibold text-gray-800">Calculation method</Text>
                <Text className="text-xs text-gray-500">Muslim World League (MWL)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/solah/asr-method' as any)}
            className="flex-row justify-between items-center p-4"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="sunny-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-semibold text-gray-800">Asr Method</Text>
                <Text className="text-xs text-gray-500">Standard / Hanafi</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Section 2: Adhan & Sound */}
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Adhan & Sound</Text>
        <View className="bg-gray-50/50 rounded-2xl border border-gray-100 mb-6 overflow-hidden">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <Ionicons name="volume-high-outline" size={20} color="#4B5563" />
              <Text className="text-sm font-semibold text-gray-800">Adhan sound</Text>
            </View>
            <Switch value={adhanSound} onValueChange={setAdhanSound} trackColor={{ true: '#D946EF', false: '#E5E7EB' }} />
          </View>

          <View className="flex-row justify-between items-center p-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="phone-portrait-outline" size={20} color="#4B5563" />
              <Text className="text-sm font-semibold text-gray-800">Vibration</Text>
            </View>
            <Switch value={vibration} onValueChange={setVibration} trackColor={{ true: '#D946EF', false: '#E5E7EB' }} />
          </View>
        </View>

        {/* Section 3: Special Times */}
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Special Times</Text>
        <View className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="home-roof" size={20} color="#4B5563" />
              <Text className="text-sm font-semibold text-gray-800">Jumu’ah reminder</Text>
            </View>
            <Switch value={jumuahReminder} onValueChange={setJumuahReminder} trackColor={{ true: '#D946EF', false: '#E5E7EB' }} />
          </View>

          <View className="flex-row justify-between items-center p-4">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="bed-outline" size={20} color="#4B5563" />
              <Text className="text-sm font-semibold text-gray-800">Tahajjud reminder</Text>
            </View>
            <Switch value={tahajjudReminder} onValueChange={setTahajjudReminder} trackColor={{ true: '#D946EF', false: '#E5E7EB' }} />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}