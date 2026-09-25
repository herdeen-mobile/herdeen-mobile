import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QuranSettingsScreen() {
  const router = useRouter();

  // State configurations based on your design
  const [selectedTheme, setSelectedTheme] = useState<'Modern' | 'Stone age' | 'Dark'>('Modern');
  const [readingMode, setReadingMode] = useState<'Scroll' | 'Page'>('Page');
  const [textSize, setTextSize] = useState(50); // Slider value percentage

  const [alwaysOn, setAlwaysOn] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-5 flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="close" size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Reading Theme */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="moon-outline" size={18} color="#4B5563" />
            <Text className="text-sm font-semibold text-gray-700">Reading Theme</Text>
          </View>
          <View className="flex-row gap-3">
            {(['Modern', 'Stone age', 'Dark'] as const).map((theme) => {
              const isSelected = selectedTheme === theme;
              return (
                <TouchableOpacity
                  key={theme}
                  onPress={() => setSelectedTheme(theme)}
                  className={`flex-1 p-3 rounded-2xl border-2 items-center justify-center ${
                    isSelected ? 'border-purple-600 bg-purple-50/20' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <View className={`w-full h-10 rounded-xl mb-2 ${
                    theme === 'Modern' ? 'bg-white border border-gray-200' :
                    theme === 'Stone age' ? 'bg-amber-100 border border-amber-300' : 'bg-gray-900'
                  }`} />
                  <Text className={`text-xs font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                    {theme}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Reading Mode */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="book-outline" size={18} color="#4B5563" />
            <Text className="text-sm font-semibold text-gray-700">Reading Mode</Text>
          </View>
          <View className="flex-row gap-3">
            {(['Scroll', 'Page'] as const).map((mode) => {
              const isSelected = readingMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setReadingMode(mode)}
                  className={`flex-1 py-4 px-5 rounded-2xl border flex-row items-center justify-center gap-2 ${
                    isSelected ? 'border-purple-600 bg-purple-50/10' : 'border-gray-200 bg-white'
                  }`}
                >
                  <Ionicons
                    name={mode === 'Scroll' ? 'list-outline' : 'book-outline'}
                    size={20}
                    color={isSelected ? '#9333EA' : '#4B5563'}
                  />
                  <Text className={`text-sm font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Text Size */}
        <View className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="text-outline" size={18} color="#4B5563" />
            <Text className="text-sm font-semibold text-gray-700">Text Size</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <Text className="text-xs font-bold text-gray-500">A</Text>
            <View className="flex-1 h-2 bg-purple-200 rounded-full relative justify-center">
              <View className="absolute left-0 h-2 bg-purple-600 rounded-full" style={{ width: `${textSize}%` }} />
              <TouchableOpacity
                onPress={() => setTextSize((prev) => (prev >= 100 ? 20 : prev + 20))}
                className="w-5 h-5 bg-white rounded-full shadow border border-purple-600 absolute"
                style={{ left: `${textSize}%` }}
              />
            </View>
            <Text className="text-lg font-bold text-gray-700">A</Text>
          </View>
        </View>

        {/* Switches Section */}
        <View className="space-y-4 pb-10">
          {/* Always On */}
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <Ionicons name="phone-portrait-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-bold text-gray-900">Always on</Text>
                <Text className="text-xs text-gray-400">Keep screen on while reading</Text>
              </View>
            </View>
            <Switch
              value={alwaysOn}
              onValueChange={setAlwaysOn}
              trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
              thumbColor={alwaysOn ? '#9333EA' : '#F3F4F6'}
            />
          </View>

          {/* Show Translation */}
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center gap-3">
              <Ionicons name="language-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-bold text-gray-900">Show Translation</Text>
                <Text className="text-xs text-gray-400">Show verse translation</Text>
              </View>
            </View>
            <Switch
              value={showTranslation}
              onValueChange={setShowTranslation}
              trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
              thumbColor={showTranslation ? '#9333EA' : '#F3F4F6'}
            />
          </View>

          {/* Translation Language Navigation Row */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/quran/languages' as any)}
            className="flex-row items-center justify-between py-3.5 border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="globe-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-bold text-gray-900">Translation language</Text>
                <Text className="text-xs text-gray-400">English (UK)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Show Transliteration */}
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center gap-3">
              <Ionicons name="text-outline" size={20} color="#4B5563" />
              <View>
                <Text className="text-sm font-bold text-gray-900">Show Transliteration</Text>
                <Text className="text-xs text-gray-400">Show phonetic spelling</Text>
              </View>
            </View>
            <Switch
              value={showTransliteration}
              onValueChange={setShowTransliteration}
              trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
              thumbColor={showTransliteration ? '#9333EA' : '#F3F4F6'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}