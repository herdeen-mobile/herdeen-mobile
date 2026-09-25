import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LANGUAGES = [
  { id: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
  { id: 'en-us', name: 'English (US)', flag: '🇺🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'de', name: 'Deutsche', flag: '🇩🇪' },
  { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
];

export default function TranslationLanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('en-gb');

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-5 flex-row items-center gap-4 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Translation language</Text>
      </View>

      {/* Languages List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLang === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              onPress={() => setSelectedLang(lang.id)}
              className="py-4 border-b border-gray-100 flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-4">
                <Text className="text-2xl">{lang.flag}</Text>
                <Text className={`text-base font-medium ${isSelected ? 'text-purple-700 font-bold' : 'text-gray-900'}`}>
                  {lang.name}
                </Text>
              </View>

              {isSelected && (
                <Ionicons name="checkmark" size={20} color="#9333EA" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}