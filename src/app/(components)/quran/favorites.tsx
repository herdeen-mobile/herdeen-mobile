// src/app/(components)/quran/favorites.tsx
import { useSurahsQuery } from '@/src/hooks/use-quran';
import { SurahMeta } from '@/src/types/quran';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FavoritesScreenProps {
  favorites?: number[]; // Array of favorited surah IDs
  onToggleFavorite?: (id: number) => void;
  onSelect?: (surah: SurahMeta) => void;
}

export default function FavoritesScreen({
  favorites = [],
  onToggleFavorite,
  onSelect,
}: FavoritesScreenProps) {
  const router = useRouter();
  const { data: surahs = [] } = useSurahsQuery();

  const favoriteSurahs = useMemo(() => {
    return surahs.filter((s) => favorites.includes(s.number || s.id));
  }, [surahs, favorites]);

  return (
    <View className="flex-1 bg-white pt-2">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {favoriteSurahs.length === 0 ? (
          <View className="items-center justify-center py-20 px-6">
            <Image
              source={require('../../../../assets/images/empty.png')}
              className="w-48 h-48 mb-4"
              resizeMode="contain"
            />
            <Text className="text-base font-semibold text-gray-400 mt-2">No favorites yet!</Text>
            <Text className="text-xs text-gray-400 text-center mt-1">
              Add any Surah to your favorites to see it listed here.
            </Text>
          </View>
        ) : (
          <View className="pb-10">
            {favoriteSurahs.map((surah) => (
              <TouchableOpacity
                key={surah.number}
                onPress={() => {
                  if (onSelect) {
                    onSelect(surah);
                  } else {
                    router.push({
                      pathname: '/(components)/quran/reader',
                      params: { surahNumber: surah.number, surahName: surah.englishName },
                    } as any);
                  }
                }}
                className="py-4 border-b border-gray-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity
                    onPress={() => onToggleFavorite && onToggleFavorite(surah.number)}
                    className="p-1 active:opacity-70"
                  >
                    <Ionicons name="star" size={22} color="#9333EA" />
                  </TouchableOpacity>
                  <View>
                    <Text className="text-base font-bold text-gray-900">{surah.englishName}</Text>
                    <Text className="text-xs text-gray-400">
                      {surah.numberOfAyahs} verses • {surah.revelationType}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-semibold text-purple-700 font-serif">
                  {surah.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}