import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AdhkarReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = (params.title as string) || 'When waking up';

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const duas = [
    {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      transliteration: 'Yā ayyuhā alladhīna āmanū kutiba ‘alaykumu al-ṣiyāmu kamā kutiba ‘alā alladhīna min qablikum la‘allakum tattaqūn.',
      translation: 'Oh! you believe, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
    },
    {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      transliteration: 'Yā ayyuhā alladhīna āmanū kutiba ‘alaykumu al-ṣiyāmu kamā kutiba ‘alā alladhīna min qablikum la‘allakum tattaqūn.',
      translation: 'Oh! you believe, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-16">

        {/* Navigation Header */}
        <View className="flex-row items-center mb-6 gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100">
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">{title}</Text>
        </View>

        {/* Duas Cards Feed */}
        <View className="gap-8">
          {duas.map((item, index) => (
            <View key={index} className="border-b border-gray-100 pb-8">

              {/* Arabic Text */}
              <Text className="text-right text-2xl font-bold text-gray-900 leading-[45px] mb-4">
                {item.arabic}
              </Text>

              {/* Transliteration */}
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                {item.transliteration}
              </Text>

              {/* Translation */}
              <Text className="text-sm text-gray-500 mb-6 leading-relaxed">
                {item.translation}
              </Text>

              {/* Action Buttons Toolbar */}
              <View className="flex-row items-center gap-6">
                <TouchableOpacity
                  onPress={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
                >
                  <Ionicons name={isPlaying ? "pause" : "play"} size={16} color="#4B5563" />
                </TouchableOpacity>

                <TouchableOpacity className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 items-center justify-center">
                  <Ionicons name="copy-outline" size={16} color="#4B5563" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setIsBookmarked(!isBookmarked)}
                  className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 items-center justify-center"
                >
                  <Ionicons name={isBookmarked ? "star" : "star-outline"} size={16} color={isBookmarked ? "#D946EF" : "#4B5563"} />
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>

      {/* Floating Bottom Pagination Bar */}
      <View className="absolute bottom-6 left-5 right-5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full px-6 py-3 flex-row justify-between items-center shadow-md">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center">
          <Ionicons name="arrow-back" size={18} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-800">{title}</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center">
          <Ionicons name="arrow-forward" size={18} color="#1F2937" />
        </TouchableOpacity>
      </View>
    </View>
  );
}