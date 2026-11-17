// src/app/(components)/adhkar/list.tsx
import { useAdhkarByCategoryQuery } from '@/src/hooks/use-adhkar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AdhkarListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryTitle = (params.category as string) || 'Morning & Evening';

  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: chapters = [],
    isLoading,
    isError,
    refetch,
  } = useAdhkarByCategoryQuery(categoryTitle);

  const filteredChapters = useMemo(() => {
    return chapters.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chapters, searchQuery]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10" showsVerticalScrollIndicator={false}>
        {/* Header & Title */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-1 flex-1 mx-3 justify-center">
            <Text numberOfLines={1} className="text-xl font-bold text-gray-900">
              {categoryTitle}
            </Text>
          </View>
          <View className="w-10" />
        </View>

        <Text className="text-xs text-gray-400 font-medium mb-4">
          {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6 gap-3">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search chapters & duas"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-sm text-gray-800"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center justify-center py-16">
            <ActivityIndicator size="small" color="#D946EF" />
            <Text className="text-xs text-gray-400 mt-2 font-medium">Loading chapters...</Text>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
            <Text className="text-xs text-red-600 font-medium">Unable to load chapters</Text>
            <TouchableOpacity onPress={() => refetch()} className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Chapters List */}
        {!isLoading && filteredChapters.length > 0 && (
          <View className="bg-gray-50/40 rounded-2xl border border-gray-100 overflow-hidden mb-8">
            {filteredChapters.map((chapter, index) => (
              <TouchableOpacity
                key={chapter.id}
                onPress={() =>
                  router.push({
                    pathname: '/(components)/adhkar/reader',
                    params: { title: chapter.title, id: chapter.id },
                  } as any)
                }
                className={`flex-row justify-between items-center p-4 active:bg-gray-100 ${
                  index !== filteredChapters.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-1 pr-3">
                  <Text className="text-sm font-semibold text-gray-800">{chapter.title}</Text>
                  <Text className="text-[11px] text-gray-400 mt-0.5">
                    {chapter.category}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isLoading && !isError && filteredChapters.length === 0 && (
          <View className="items-center justify-center py-16">
            <Ionicons name="search-outline" size={40} color="#D8B4FE" />
            <Text className="text-sm font-semibold text-gray-700 mt-3">No chapters found</Text>
            <Text className="text-xs text-gray-400 mt-1">Try another search term.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
