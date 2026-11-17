// src/app/(components)/quran/index.tsx
import {
  useLastReadQuery,
  useQuranFavoritesQuery,
  useToggleQuranFavoriteMutation,
} from '@/src/hooks/use-quran';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Import your dedicated sub-pages/components
import FavoritesList from './favorites';
import JuzList from './juz';
import SurahList from './surah';

export default function QuranScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Surah' | 'Juz' | 'Favorite'>('Surah');

  // TanStack Queries for Favorites & Last Read
  const { data: favorites = [] } = useQuranFavoritesQuery();
  const { mutate: toggleFavorite } = useToggleQuranFavoriteMutation();
  const { data: lastRead } = useLastReadQuery();

  const handleSelectSurah = (surah: any) => {
    router.push({
      pathname: '/(components)/quran/reader',
      params: {
        surahNumber: surah.number || surah.id,
        surahName: surah.englishName || surah.name,
      },
    } as any);
  };

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-5 flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Quran</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(components)/quran/search' as any)}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
        >
          <Ionicons name="search" size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Tabs Switcher */}
      <View className="px-5 mb-6">
        <View className="flex-row bg-gray-100/80 p-1 rounded-full">
          {(['Surah', 'Juz', 'Favorite'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                  isActive ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Banner with #C572E3 background and dynamic Last Read info */}
        {activeTab !== 'Favorite' && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: '/(components)/quran/reader',
                params: {
                  surahNumber: lastRead?.surahNumber || 1,
                  surahName: lastRead?.surahName || 'Al-Faatiha',
                },
              } as any)
            }
            className="rounded-[28px] p-6 mb-6 relative overflow-hidden flex-row justify-between items-center shadow-sm bg-primary"
          >
            {/* Background Quran vector illustration watermark */}
            <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
              <Ionicons name="book" size={110} color="#FFFFFF" />
            </View>

            <View className="z-10">
              <Text className="text-xs font-semibold text-white/80 mb-1">Last Read</Text>
              <Text className="text-xl font-bold text-white mb-1">
                {lastRead?.surahName || 'Al-Faatiha'}
              </Text>
              <Text className="text-xs text-white/90 font-medium">
                Ayah No: {lastRead?.ayahNumber || 1}
              </Text>
            </View>

            <View className="bg-white/20 p-2.5 rounded-2xl">
              <Ionicons name="arrow-forward" size={18} color="white" />
            </View>
          </TouchableOpacity>
        )}

        {/* Dynamic Tab Content */}
        {activeTab === 'Surah' && (
          <SurahList key="surah-list" onSelect={handleSelectSurah} />
        )}

        {activeTab === 'Juz' && <JuzList key="juz-list" />}

        {activeTab === 'Favorite' && (
          <FavoritesList
            key="favorites-list"
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={handleSelectSurah}
          />
        )}
      </ScrollView>
    </View>
  );
}