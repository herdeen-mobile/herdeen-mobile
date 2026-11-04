// src/app/(components)/faq.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    question: "What's HerDeen?",
    answer: "HerDeen is a faith-based platform that helps Muslimah structure the Deen & Dunya[cite: 12].",
  },
  {
    id: '2',
    question: "What's HerDeen?",
    answer: "HerDeen offers daily reminders, Quran tracking, dhikr counters, and lifestyle planning tailored for Muslim women.",
  },
  {
    id: '3',
    question: "What's HerDeen?",
    answer: "It provides a secure and organized space to keep your daily spiritual routines on track.",
  },
  {
    id: '4',
    question: "What's HerDeen?",
    answer: "You can set custom prayer notifications, track habits, and connect with a supportive community.",
  },
  {
    id: '5',
    question: "What's HerDeen?",
    answer: "Our goal is to make balancing your religious obligations and everyday life seamless and rewarding.",
  },
  {
    id: '6',
    question: "What's HerDeen?",
    answer: "Download the app and start structuring your spiritual goals today!",
  },
];

export default function FaqScreen() {
  const router = useRouter();
  // Track which accordion item is open (defaulting to the first item as seen in the mockup)
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Top Header Navigation with Close Button */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">FAQs</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center"
          >
            <Ionicons name="close" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* FAQ Accordion List */}
        <View className="gap-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => toggleAccordion(item.id)}
                className={`p-5 rounded-2xl bg-card border border-border transition-all ${
                  isOpen ? 'bg-card shadow-sm' : ''
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <Text className={`text-base font-semibold ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                    {item.question}
                  </Text>
                  <View className="w-7 h-7 rounded-full items-center justify-center bg-secondary">
                    <Ionicons
                      name={isOpen ? 'remove' : 'add'}
                      size={18}
                      color="#374151"
                    />
                  </View>
                </View>

                {isOpen && (
                  <View className="mt-3 pt-3 border-t border-border/60">
                    <Text className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}