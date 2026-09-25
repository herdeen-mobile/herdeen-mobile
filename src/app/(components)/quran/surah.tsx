import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Full Surah Data List
export const SURAHS = [
  { id: 1, name: 'Al-Faatiha', arabic: 'الفاتحة', verses: 7, type: 'Makkah', translation: 'The Opening' },
  { id: 2, name: 'Al-Baqara', arabic: 'البقرة', verses: 286, type: 'Madinah', translation: 'The Cow' },
  { id: 3, name: 'Al-i-Imraan', arabic: 'آل عمران', verses: 200, type: 'Madinah', translation: 'The Family of Imran' },
  { id: 4, name: 'An-Nisaa', arabic: 'النساء', verses: 176, type: 'Madinah', translation: 'The Women' },
  { id: 5, name: 'Al-Maaiida', arabic: 'المائدة', verses: 120, type: 'Madinah', translation: 'The Food' },
  { id: 6, name: 'Al-An\'am', arabic: 'الأنعام', verses: 165, type: 'Makkah', translation: 'The Cattle' },
  { id: 7, name: 'Al-A\'raaf', arabic: 'الأعراف', verses: 206, type: 'Makkah', translation: 'The Heights' },
  { id: 8, name: 'Al-Anfaal', arabic: 'الأنفال', verses: 75, type: 'Madinah', translation: 'The Spoils of War' },
  { id: 9, name: 'At-Tawbah', arabic: 'التوبة', verses: 129, type: 'Madinah', translation: 'The Repentance' },
  { id: 10, name: 'Yunus', arabic: 'يونس', verses: 109, type: 'Makkah', translation: 'Jonah' },
];

interface SurahListProps {
  onSelect: (surah: typeof SURAHS[0]) => void;
}

export default function SurahList({ onSelect }: SurahListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter surahs based on search query (name, translation, or number)
  const filteredSurahs = SURAHS.filter((surah) =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabic.includes(searchQuery) ||
    surah.id.toString() === searchQuery
  );

  return (
    <View className="pb-10">
      {/* Optional inline search bar for quick filtering */}
      <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-4">
        <Ionicons name="search" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search Surah by name or number..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 text-sm text-gray-900 p-0"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Surah List Items */}
      {filteredSurahs.length > 0 ? (
        filteredSurahs.map((surah) => (
          <TouchableOpacity
            key={surah.id}
            onPress={() => onSelect(surah)}
            className="py-4 border-b border-gray-100 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-9 h-9 rounded-xl bg-purple-50 items-center justify-center border border-purple-100">
                <Text className="text-xs font-bold text-purple-700">{surah.id}</Text>
              </View>
              <View>
                <Text className="text-base font-bold text-gray-900 mb-0.5">{surah.name}</Text>
                <Text className="text-xs text-gray-400">
                  {surah.verses} verses • {surah.type}
                </Text>
              </View>
            </View>
            <Text className="text-lg font-bold text-gray-800 font-serif">{surah.arabic}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View className="items-center justify-center py-16">
          <Ionicons name="search-outline" size={48} color="#D8B4FE" />
          <Text className="text-sm font-medium text-gray-400 mt-3">No Surah found</Text>
        </View>
      )}
    </View>
  );
}