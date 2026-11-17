// src/app/(components)/adhkar/index.tsx
import {
  useAdhkarCategoriesQuery,
  useAdhkarFavoritesQuery,
  useToggleAdhkarFavoriteMutation,
} from '@/src/hooks/use-adhkar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ICON_MAP: Record<string, string> = {
  'Morning & Evening': 'weather-night-partly-cloudy',
  Prayer: 'hands-pray',
  Mosque: 'home-roof',
  'Food & Drink': 'silverware-fork-knife',
  Protection: 'shield-outline',
  Forgiveness: 'hand-extended-outline',
  'Sleeping & Waking Up': 'bed-outline',
  Travel: 'airplane',
  'Hajj & Umrah': 'cube-outline',
  'Home & Family': 'home-outline',
};

export default function AdhkarScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // TanStack Queries
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useAdhkarCategoriesQuery();

  const { data: favorites = [] } = useAdhkarFavoritesQuery();
  const { mutate: toggleFavorite } = useToggleAdhkarFavoriteMutation();

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10" showsVerticalScrollIndicator={false}>
        {/* Header & Bookmark Icon */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Adhkar</Text>
          <TouchableOpacity
            onPress={() => setShowFavorites(true)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70 relative"
          >
            <Ionicons
              name={favorites.length > 0 ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={favorites.length > 0 ? '#D946EF' : '#1F2937'}
            />
            {favorites.length > 0 && (
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-fuchsia-500" />
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6 gap-3">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search duas & adhkar categories"
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
        {isCategoriesLoading && (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="small" color="#D946EF" />
            <Text className="text-xs text-gray-400 mt-2 font-medium">Loading categories...</Text>
          </View>
        )}

        {/* Error State */}
        {isCategoriesError && (
          <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
            <Text className="text-xs text-red-600 font-medium">Failed to load categories</Text>
            <TouchableOpacity onPress={() => refetchCategories()} className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Categories 2-Column Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-10">
          {filteredCategories.map((item, index) => {
            const iconName = (ICON_MAP[item.name] || 'cards-outline') as any;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: '/(components)/adhkar/list',
                    params: { category: item.name },
                  } as any)
                }
                className="w-[48%] bg-gray-50/60 border border-gray-100/80 rounded-3xl p-5 justify-between h-32 shadow-2xs"
              >
                <View>
                  <Text className="text-sm font-bold text-gray-900 leading-tight pr-2">
                    {item.name}
                  </Text>
                  <Text className="text-[11px] text-gray-400 mt-1 font-medium">
                    {item.chapterCount} {item.chapterCount === 1 ? 'chapter' : 'chapters'}
                  </Text>
                </View>
                <View className="self-end bg-purple-50 p-2.5 rounded-2xl border border-purple-100/50">
                  <MaterialCommunityIcons name={iconName} size={22} color="#D946EF" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Favorites Modal / Sheet */}
      <Modal visible={showFavorites} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[32px] p-6 h-[75%]">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-bold text-gray-900">Favorites</Text>
                <View className="bg-fuchsia-100 px-2 py-0.5 rounded-full">
                  <Text className="text-xs font-bold text-fuchsia-700">{favorites.length}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShowFavorites(false)}
                className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center active:opacity-70"
              >
                <Ionicons name="close" size={18} color="#1F2937" />
              </TouchableOpacity>
            </View>

            {favorites.length === 0 ? (
              <View className="flex-1 items-center justify-center pb-12">
                <Ionicons name="star-outline" size={48} color="#D8B4FE" />
                <Text className="text-sm font-semibold text-gray-700 mt-3">No favorites yet</Text>
                <Text className="text-xs text-gray-400 text-center px-8 mt-1">
                  Star any supplication in the reader to save it here for quick daily access.
                </Text>
              </View>
            ) : (
              <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
                {favorites.map((favId, i) => (
                  <View
                    key={i}
                    className="flex-row justify-between items-center py-4 border-b border-gray-100"
                  >
                    <Text className="text-sm font-medium text-gray-800 flex-1 pr-4">
                      {favId}
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(favId)}
                      className="p-1 active:opacity-70"
                    >
                      <Ionicons name="star" size={20} color="#D946EF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}