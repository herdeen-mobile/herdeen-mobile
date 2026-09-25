//quran/search.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Fathia', 'Fathia', 'Fathia']);

  return (
    <View className="flex-1 bg-white pt-12 px-5">
      <View className="flex-row items-center gap-3 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2.5">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search by surahs, juz, verses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-sm text-gray-900"
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm font-semibold text-gray-500">Recent Searches</Text>
        <TouchableOpacity onPress={() => setRecentSearches([])}>
          <Text className="text-sm font-semibold text-purple-600">Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {recentSearches.map((item, index) => (
          <View key={index} className="py-3.5 flex-row items-center justify-between border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <Ionicons name="time-outline" size={18} color="#9CA3AF" />
              <Text className="text-base text-gray-800">{item}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setRecentSearches(recentSearches.filter((_, i) => i !== index))
              }
            >
              <Ionicons name="close" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}