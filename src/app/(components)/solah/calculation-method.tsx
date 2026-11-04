import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CalculationMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('Muslim World League (MWL)');

  const methods = [
    'Muslim World League (MWL)',
    'North America (ISNA)',
    'Umm al-Qura University, Makkah',
    'MUIS (Majis Ugama Islam Singapura)',
    'Egyptian General Authority of Survey',
    'Muslim Board of Uzbekistan',
    'University of Islamic Sciences, Karachi',
    'Turkey Presidency of Religious Affairs',
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Navigation Header */}
        <View className="flex-row items-center mb-6 gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Calculation Method</Text>
        </View>

        {/* Methods List */}
        <View className="gap-2">
          {methods.map((method, index) => {
            const isSelected = selectedMethod === method;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMethod(method)}
                className={`flex-row justify-between items-center p-4 rounded-2xl border ${
                  isSelected ? 'bg-purple-50/40 border-purple-200' : 'bg-white border-gray-100'
                }`}
              >
                <Text className={`text-sm font-semibold ${isSelected ? 'text-purple-900' : 'text-gray-800'}`}>
                  {method}
                </Text>
                {isSelected && <Ionicons name="checkmark" size={18} color="#D946EF" />}
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}