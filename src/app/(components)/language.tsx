// src/app/(components)/language.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

  // Handle the update action when the user presses the bottom button
  const handleUpdateLanguage = () => {
    console.log('Language updated to:', selectedLanguage);
    // Add your localization persistence logic here (e.g., i18n, AsyncStorage)
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
                className={`flex-row items-center justify-between py-4 px-5 ${
                  !isLast ? 'border-b border-border' : ''
                }`}
              >
                {/* Left side: Flag emoji and language name */}
                <View className="flex-row items-center gap-3.5">
                  <Text className="text-2xl">{lang.flag}</Text>
                  <Text className={`text-base font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {lang.name}
                  </Text>
                </View>

                {/* Right side: Checkmark indicator if selected */}
                {isSelected && (
                  <Ionicons name="checkmark" size={20} color="#C084FC" /> // Adjust checkmark color to match your primary theme color
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 3. Fixed Bottom Update Button Container */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border">
        <TouchableOpacity
          onPress={handleUpdateLanguage}
          activeOpacity={0.8}
          className="bg-primary py-4 rounded-full items-center justify-center shadow-sm"
        >
          <Text className="text-white font-bold text-base">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}