import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AdhkarListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryTitle = (params.category as string) || 'Morning & Evening';

  const [searchQuery, setSearchQuery] = useState('');

  const chapters = [
    'When waking up',
    'Remembrance said in the morning',
    'Remembrance said in the evening',
    'Remembrance before sleeping',
    'Supplication when turning over during the night',
    'Upon experiencing unrest, fear, apprehensiveness and the like during sleep',
    'Upon seeing a good dream or a bad dream',
    'Etiquette of retiring for the night',
  ];

  const filteredChapters = chapters.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Header & Title */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-1">
            <Text className="text-xl font-bold text-gray-900">{categoryTitle}</Text>
            <Ionicons name="chevron-down" size={16} color="#4B5563" />
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="bookmark-outline" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-400 font-medium mb-4">12 Chapters</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6 gap-3">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search duas"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-sm text-gray-800"
          />
        </View>

        {/* Chapters List */}
        <View className="bg-gray-50/40 rounded-2xl border border-gray-100 overflow-hidden">
          {filteredChapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push({ pathname: '/(components)/adhkar/reader', params: { title: chapter } } as any)}
              className={`flex-row justify-between items-center p-4 ${
                index !== filteredChapters.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <Text className="text-sm font-semibold text-gray-800 flex-1 pr-3">{chapter}</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}