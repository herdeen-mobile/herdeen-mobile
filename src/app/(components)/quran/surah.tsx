// src/app/(components)/quran/surah.tsx
import { useSurahsQuery } from '@/src/hooks/use-quran';
import { SurahMeta } from '@/src/types/quran';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SurahListProps {
  onSelect: (surah: SurahMeta) => void;
}

export default function SurahList({ onSelect }: SurahListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // TanStack Query to fetch all 114 Surahs
  const { data: surahs = [], isLoading, isError, refetch } = useSurahsQuery();

  // Filter surahs based on search query (name, translation, or number)
  const filteredSurahs = useMemo(() => {
    return surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.name.includes(searchQuery) ||
        surah.number.toString() === searchQuery.trim()
    );
  }, [surahs, searchQuery]);

  return (
    <View className="pb-10">
      {/* Search bar */}
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

      {/* Loading state */}
      {isLoading && (
        <View className="items-center justify-center py-16">
          <ActivityIndicator size="small" color="#D946EF" />
          <Text className="text-xs text-gray-400 mt-2 font-medium">Loading surahs...</Text>
        </View>
      )}

      {/* Error state */}
      {isError && (
        <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
          <Text className="text-xs text-red-600 font-medium">Failed to load surahs</Text>
          <TouchableOpacity onPress={() => refetch()} className="bg-red-600 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Surah List Items */}
      {!isLoading && filteredSurahs.length > 0 ? (
        filteredSurahs.map((surah) => (
          <TouchableOpacity
            key={surah.number}
            activeOpacity={0.7}
            onPress={() => onSelect(surah)}
            className="py-4 border-b border-gray-100 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-9 h-9 rounded-xl bg-purple-50 items-center justify-center border border-purple-100">
                <Text className="text-xs font-bold text-purple-700">{surah.number}</Text>
              </View>
              <View>
                <Text className="text-base font-bold text-gray-900 mb-0.5">
                  {surah.englishName}
                </Text>
                <Text className="text-xs text-gray-400">
                  {surah.numberOfAyahs} verses • {surah.revelationType}
                </Text>
              </View>
            </View>
            <Text className="text-lg font-bold text-gray-800 font-serif">{surah.name}</Text>
          </TouchableOpacity>
        ))
      ) : !isLoading ? (
        <View className="items-center justify-center py-16">
          <Ionicons name="search-outline" size={48} color="#D8B4FE" />
          <Text className="text-sm font-medium text-gray-400 mt-3">No Surah found</Text>
        </View>
      ) : null}
    </View>
  );
}