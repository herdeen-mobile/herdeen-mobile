// src/app/(components)/support.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 1. Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">Support</Text>
        </View>

        {/* 2. Section Subtitle */}
        <Text className="text-sm font-medium text-muted-foreground mb-4">
          Need help?
        </Text>

        {/* 3. Support Options List */}
        <View className="gap-1">

          {/* Contact Us */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/contact-us' as any)}
            className="flex-row justify-between items-center py-4 px-2 rounded-xl active:bg-accent border-b border-border/50"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="phone-call" size={20} color="#374151" />
              <Text className="text-base font-semibold text-foreground">Contact Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Help Us Improve */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/help-improve' as any)}
            className="flex-row justify-between items-center py-4 px-2 rounded-xl active:bg-accent border-b border-border/50"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="message-square" size={20} color="#374151" />
              <Text className="text-base font-semibold text-foreground">Help us improve</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Frequently Asked Questions */}
          <TouchableOpacity
            onPress={() => router.push('/(components)/faq' as any)}
            className="flex-row justify-between items-center py-4 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="help-circle" size={20} color="#374151" />
              <Text className="text-base font-semibold text-foreground">Frequently Asked Questions</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}