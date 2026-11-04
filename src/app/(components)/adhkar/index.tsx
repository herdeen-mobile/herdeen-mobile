import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdhkarScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // Categories based on your design
  const categories = [
    { name: 'All', icon: <MaterialCommunityIcons name="cards-outline" size={24} color="#D946EF" /> },
    { name: 'Morning & Evening', icon: <MaterialCommunityIcons name="weather-night-partly-cloudy" size={24} color="#D946EF" /> },
    { name: 'Food & Drink', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#D946EF" /> },
    { name: 'Hajj & Umrah', icon: <MaterialCommunityIcons name="cube-outline" size={24} color="#D946EF" /> },
    { name: 'Prayer', icon: <MaterialCommunityIcons name="hands-pray" size={24} color="#D946EF" /> },
    { name: 'Mosque', icon: <MaterialCommunityIcons name="home-roof" size={24} color="#D946EF" /> },
    { name: 'Sickness & Death', icon: <MaterialCommunityIcons name="account-heart-outline" size={24} color="#D946EF" /> },
    { name: 'Forgiveness', icon: <MaterialCommunityIcons name="hand-extended-outline" size={24} color="#D946EF" /> },
    { name: 'Protection', icon: <MaterialCommunityIcons name="shield-outline" size={24} color="#D946EF" /> },
    { name: 'Travel', icon: <MaterialCommunityIcons name="airplane" size={24} color="#D946EF" /> },
    { name: 'Sleeping & Waking Up', icon: <MaterialCommunityIcons name="bed-outline" size={24} color="#D946EF" /> },
    { name: 'Home & Family', icon: <MaterialCommunityIcons name="home-outline" size={24} color="#D946EF" /> },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-12 pb-10">

        {/* Header & Bookmark Icon */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Adhkar</Text>
          <TouchableOpacity
            onPress={() => setShowFavorites(true)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <Ionicons name="bookmark-outline" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6 gap-3">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search duas"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-sm text-gray-800"
          />
        </View>

        {/* Categories 2-Column Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {filteredCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push({ pathname: '/(components)/adhkar/list', params: { category: item.name } } as any)}
              className="w-[48%] bg-gray-50/60 border border-gray-100/80 rounded-3xl p-5 justify-between h-32 shadow-2xs"
            >
              <Text className="text-sm font-bold text-gray-900 leading-tight pr-2">
                {item.name}
              </Text>
              <View className="self-end bg-purple-50 p-2.5 rounded-2xl border border-purple-100/50">
                {item.icon}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Favorites Modal / Sheet */}
      <Modal visible={showFavorites} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[32px] p-6 h-[75%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900">Favorites</Text>
              <TouchableOpacity onPress={() => setShowFavorites(false)} className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                <Ionicons name="close" size={18} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView className="gap-4">
              {[
                'Supplication when turning over during the night',
                'Supplication when turning over during the night',
                'Upon experiencing unrest, fear, apprehensiveness and the like during sleep'
              ].map((fav, i) => (
                <View key={i} className="flex-row justify-between items-center py-4 border-b border-gray-100">
                  <Text className="text-sm font-medium text-gray-800 flex-1 pr-4">{fav}</Text>
                  <Ionicons name="star" size={20} color="#D946EF" />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}