// src/app/(components)/quran/juz.tsx
import { useJuzQuery } from '@/src/hooks/use-quran';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function JuzScreen() {
  const router = useRouter();
  const { data: juzList = [], isLoading, isError, refetch } = useJuzQuery();

  return (
    <View className="flex-1 bg-white pt-2">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Juz Header Title */}
        <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-100">
          <Text className="text-base font-bold text-gray-900">30 Juz Division</Text>
          <Text className="text-base font-bold text-gray-800 font-serif">الأَجْزَاءُ الثَّلَاثُونَ</Text>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center justify-center py-16">
            <ActivityIndicator size="small" color="#D946EF" />
            <Text className="text-xs text-gray-400 mt-2 font-medium">Loading Juz list...</Text>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
            <Text className="text-xs text-red-600 font-medium">Failed to load Juz list</Text>
            <TouchableOpacity onPress={() => refetch()} className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Juz List */}
        {!isLoading && (
          <View className="pb-10">
            {juzList.map((juz) => (
              <TouchableOpacity
                key={juz.id}
                onPress={() =>
                  router.push({
                    pathname: '/(components)/quran/reader',
                    params: {
                      surahNumber: 1,
                      surahName: juz.startSurah,
                    },
                  } as any)
                }
                className="py-4 border-b border-gray-100 flex-row items-center justify-between active:bg-gray-50/50"
              >
                {/* Left Badge/Icon container */}
                <View className="w-10 items-center justify-center mr-3 relative">
                  <MaterialCommunityIcons name="octagram-outline" size={36} color="#D1D5DB" />
                  <Text className="absolute text-[11px] font-bold text-gray-700">
                    {juz.number}
                  </Text>
                </View>

                {/* Right content: Juz details and starting surah */}
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900 mb-0.5">
                    {juz.name}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    Starts at {juz.startSurah} ({juz.startVerse}) • Ends at {juz.endSurah} ({juz.endVerse})
                  </Text>
                </View>

                <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
