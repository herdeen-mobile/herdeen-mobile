// src/app/(components)/adhkar/reader.tsx
import {
  useAdhkarDetailQuery,
  useAdhkarFavoritesQuery,
  useCompleteAdhkarSessionMutation,
  useToggleAdhkarFavoriteMutation,
} from '@/src/hooks/use-adhkar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AdhkarReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = (params.title as string) || 'When waking up';
  const id = (params.id as string) || title;

  const { data: chapter, isLoading, isError, refetch } = useAdhkarDetailQuery(id);
  const { data: favorites = [] } = useAdhkarFavoritesQuery();
  const { mutate: toggleFavorite } = useToggleAdhkarFavoriteMutation();
  const { mutate: completeSession, isPending: isCompleting } = useCompleteAdhkarSessionMutation();

  // Progress counters per dua: { [duaId]: count }
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [completedNotice, setCompletedNotice] = useState(false);

  const duas = chapter?.duas || [];

  const handleIncrement = (duaId: string, maxRepeat = 1) => {
    setCounts((prev) => {
      const current = prev[duaId] || 0;
      return {
        ...prev,
        [duaId]: current < maxRepeat ? current + 1 : maxRepeat,
      };
    });
  };

  const handleCopy = async (dua: any) => {
    try {
      await Share.share({
        message: `${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n— ${dua.reference || 'Hisn al-Muslim'}`,
      });
    } catch {}
  };

  const handleCompleteSession = () => {
    completeSession(undefined, {
      onSuccess: () => {
        setCompletedNotice(true);
        Alert.alert(
          'MashaAllah!',
          'Adhkar completed and recorded in your Today’s Ibadah tracker.',
          [{ text: 'Alhamdulillah', onPress: () => router.back() }]
        );
      },
      onError: (err) => {
        Alert.alert('Session Recorded', 'Adhkar completed locally.');
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-12 pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3.5 flex-1 pr-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
            >
              <Ionicons name="arrow-back" size={20} color="#1F2937" />
            </TouchableOpacity>
            <Text numberOfLines={1} className="text-xl font-bold text-gray-900 flex-1">
              {chapter?.title || title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCompleteSession}
            disabled={isCompleting}
            className="bg-purple-100 px-3 py-1.5 rounded-full flex-row items-center gap-1 active:opacity-80"
          >
            {isCompleting ? (
              <ActivityIndicator size="small" color="#9333EA" />
            ) : (
              <>
                <Ionicons name="checkmark-done" size={14} color="#9333EA" />
                <Text className="text-xs font-bold text-purple-900">Done</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="small" color="#D946EF" />
            <Text className="text-xs text-gray-400 mt-2">Loading supplication...</Text>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex-row items-center justify-between">
            <Text className="text-xs text-red-600 font-medium">Failed to load content</Text>
            <TouchableOpacity onPress={() => refetch()} className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Duas Cards Feed */}
        <View className="gap-8 mb-16">
          {duas.map((item, index) => {
            const isFavorited = favorites.includes(item.id);
            const targetCount = item.repeat || 1;
            const currentCount = counts[item.id] || 0;
            const isDuaFinished = currentCount >= targetCount;

            return (
              <View key={item.id || index} className="border-b border-gray-100 pb-8">
                {/* Repeat Badge & Index */}
                <View className="flex-row justify-between items-center mb-4">
                  <View className="bg-gray-100 px-2.5 py-1 rounded-full">
                    <Text className="text-[11px] font-semibold text-gray-600">
                      {index + 1} of {duas.length}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleIncrement(item.id, targetCount)}
                    className={`px-3 py-1 rounded-full border flex-row items-center gap-1.5 active:opacity-80 ${
                      isDuaFinished
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-purple-50 border-purple-200'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isDuaFinished ? 'text-emerald-700' : 'text-purple-700'
                      }`}
                    >
                      {currentCount} / {targetCount} {targetCount === 1 ? 'time' : 'times'}
                    </Text>
                    {isDuaFinished && <Ionicons name="checkmark-circle" size={14} color="#059669" />}
                  </TouchableOpacity>
                </View>

                {/* Arabic Text */}
                <Text className="text-right text-2xl font-bold text-gray-900 leading-[48px] mb-4 font-serif">
                  {item.arabic}
                </Text>

                {/* Transliteration */}
                <Text className="text-sm font-semibold text-purple-900 mb-2 leading-relaxed">
                  {item.transliteration}
                </Text>

                {/* Translation */}
                <Text className="text-sm text-gray-600 mb-3 leading-relaxed">
                  "{item.translation}"
                </Text>

                {/* Reference */}
                {item.reference && (
                  <Text className="text-[11px] font-medium text-gray-400 mb-6">
                    Reference: {item.reference}
                  </Text>
                )}

                {/* Action Buttons Toolbar */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                      onPress={() => handleCopy(item)}
                      className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
                    >
                      <Ionicons name="share-outline" size={16} color="#4B5563" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id)}
                      className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
                    >
                      <Ionicons
                        name={isFavorited ? 'star' : 'star-outline'}
                        size={16}
                        color={isFavorited ? '#D946EF' : '#4B5563'}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleIncrement(item.id, targetCount)}
                    className={`px-4 py-2 rounded-full active:opacity-80 ${
                      isDuaFinished ? 'bg-emerald-600' : 'bg-primary'
                    }`}
                  >
                    <Text className="text-xs font-bold text-white">
                      {isDuaFinished ? 'Completed' : 'Tap to Count'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}