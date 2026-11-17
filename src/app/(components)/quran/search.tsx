// quran/search.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSurahsQuery } from '@/src/hooks/use-quran';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Al-Fatihah', 'Al-Baqarah', 'Ya-Sin']);

  const { data: surahs, isLoading } = useSurahsQuery();

  const filteredSurahs = (surahs || []).filter((surah) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      surah.englishName.toLowerCase().includes(q) ||
      surah.englishNameTranslation.toLowerCase().includes(q) ||
      surah.name.includes(q) ||
      surah.number.toString() === q
    );
  });

  const handleSelectSurah = (surahNumber: number, surahName: string) => {
    if (!recentSearches.includes(surahName)) {
      setRecentSearches((prev) => [surahName, ...prev.slice(0, 9)]);
    }
    router.push({
      pathname: '/(components)/quran/reader',
      params: { surahNumber: surahNumber.toString() },
    });
  };

  const handleSelectRecent = (name: string) => {
    const found = (surahs || []).find(
      (s) =>
        s.englishName.toLowerCase() === name.toLowerCase() ||
        s.name.includes(name)
    );
    if (found) {
      handleSelectSurah(found.number, found.englishName);
    } else {
      setSearchQuery(name);
    }
  };

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

      {/* Show search results if user is typing */}
      {searchQuery.trim().length > 0 ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {isLoading && (
            <View className="py-8 items-center">
              <ActivityIndicator size="small" color="#9333EA" />
            </View>
          )}

          {!isLoading && filteredSurahs.length === 0 && (
            <View className="py-12 items-center">
              <Text className="text-sm text-gray-400">No surahs found matching "{searchQuery}"</Text>
            </View>
          )}

          {filteredSurahs.map((surah) => (
            <TouchableOpacity
              key={surah.number}
              onPress={() => handleSelectSurah(surah.number, surah.englishName)}
              className="py-3.5 flex-row items-center justify-between border-b border-gray-100"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-purple-50 items-center justify-center">
                  <Text className="text-xs font-bold text-purple-700">{surah.number}</Text>
                </View>
                <View>
                  <Text className="text-sm font-semibold text-gray-900">{surah.englishName}</Text>
                  <Text className="text-xs text-gray-400">{surah.englishNameTranslation} • {surah.numberOfAyahs} verses</Text>
                </View>
              </View>
              <Text className="text-base font-bold text-gray-800">{surah.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-semibold text-gray-500">Recent Searches</Text>
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text className="text-sm font-semibold text-purple-600">Clear all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectRecent(item)}
                className="py-3.5 flex-row items-center justify-between border-b border-gray-100"
              >
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
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}
