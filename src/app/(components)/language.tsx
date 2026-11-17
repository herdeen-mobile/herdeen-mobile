// src/app/(components)/language.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TokenStorage } from '@/src/services/storage/token-storage';

// Define the structure of a language option
interface LanguageOption {
  id: string;
  name: string;
  flag: string; // Emoji representation of the flag
}

const LANGUAGES: LanguageOption[] = [
  { id: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { id: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
];

export default function LanguageScreen() {
  const router = useRouter();

  // State to track the currently selected language ID (defaulting to English UK)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-GB');

  useEffect(() => {
    (async () => {
      try {
        const saved = await TokenStorage.getItem('app_language');
        if (saved) setSelectedLanguage(saved);
      } catch (e) {
        console.warn('Failed to load language:', e);
      }
    })();
  }, []);

  // Handle the update action when the user presses the bottom button
  const handleUpdateLanguage = async () => {
    try {
      await TokenStorage.setItem('app_language', selectedLanguage);
    } catch (e) {
      console.warn('Failed to save language:', e);
    }
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      {/* Scrollable list of languages */}
      <ScrollView
        className="flex-1 px-6 pt-12"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. Top Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">Language</Text>
        </View>

        {/* 2. Language Options List */}
        <View className="bg-card rounded-2xl border border-border overflow-hidden">
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLanguage === lang.id;
            const isLast = index === LANGUAGES.length - 1;

            return (
              <TouchableOpacity
                key={lang.id}
                activeOpacity={0.7}
                onPress={() => setSelectedLanguage(lang.id)}
                className={`flex-row items-center justify-between p-4 ${
                  !isLast ? 'border-b border-border' : ''
                }`}
              >
                {/* Left side: Flag and Language Name */}
                <View className="flex-row items-center gap-3">
                  <Text className="text-xl">{lang.flag}</Text>
                  <Text className="text-base font-semibold text-foreground">
                    {lang.name}
                  </Text>
                </View>

                {/* Right side: Checkmark Icon if selected */}
                {isSelected && (
                  <Ionicons name="checkmark" size={20} color="#A855F7" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 3. Bottom Sticky Action Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 border-t border-border">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleUpdateLanguage}
          className="bg-primary py-4 rounded-full items-center justify-center"
        >
          <Text className="text-white text-base font-bold">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
