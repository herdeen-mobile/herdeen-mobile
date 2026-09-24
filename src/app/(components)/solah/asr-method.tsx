import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AsrMethodScreen() {
  const router = useRouter();
  const [selectedAsr, setSelectedAsr] = useState('Shafi');

  const asrMethods = [
    { title: 'Shafi', desc: 'Standard calculation method (Standard juristic views)' },
    { title: 'Hanafi', desc: 'Later shadow length calculation method' },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Navigation Header */}
        <View className="flex-row items-center mb-6 gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Asr Method</Text>
        </View>

        {/* Asr Options */}
        <View className="gap-3">
          {asrMethods.map((item, index) => {
            const isSelected = selectedAsr === item.title;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAsr(item.title)}
                className={`flex-row justify-between items-center p-4 rounded-2xl border ${
                  isSelected ? 'bg-purple-50/40 border-purple-200' : 'bg-white border-gray-100'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 items-center justify-center">
                    <Ionicons name="sunny-outline" size={18} color="#4B5563" />
                  </View>
                  <Text className={`text-base font-bold ${isSelected ? 'text-purple-900' : 'text-gray-800'}`}>
                    {item.title}
                  </Text>
                </View>
                {isSelected && <Ionicons name="checkmark" size={18} color="#D946EF" />}
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}