import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function MorningEveningAdhkarScreen() {
  const router = useRouter();

  const sections = [
    {
      title: 'Words of remembrance for morning and evening',
      subtitle: 'Authentic Hisn al-Muslim supplications',
      icon: <MaterialCommunityIcons name="weather-night-partly-cloudy" size={32} color="#D946EF" />,
      route: '/(components)/adhkar/reader?title=Words+of+remembrance+for+morning+and+evening&id=27',
    },
    {
      title: 'What to say before sleeping',
      subtitle: 'Authentic night & sleep supplications',
      icon: <MaterialCommunityIcons name="bed-outline" size={32} color="#D946EF" />,
      route: '/(components)/adhkar/reader?title=What+to+say+before+sleeping&id=28',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12">
        {/* Top Header */}
        <View className="flex-row items-center mb-8 gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Adhkar</Text>
        </View>

        {/* Section Cards */}
        <View className="gap-4">
          {sections.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route as any)}
              className="bg-gray-50/70 border border-gray-100/80 rounded-3xl p-6 flex-row items-center justify-between shadow-2xs"
            >
              <View className="flex-1 pr-3">
                <Text className="text-base font-bold text-gray-900">{item.title}</Text>
                <Text className="text-xs text-gray-400 mt-1">{item.subtitle}</Text>
              </View>
              <View className="bg-purple-50 p-3 rounded-2xl border border-purple-100/50">
                {item.icon}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
