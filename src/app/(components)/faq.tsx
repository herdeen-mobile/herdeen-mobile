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
    answer: "HerDeen is a faith-based platform designed specifically to help Muslim women structure and balance their Deen & Dunya.",
  },
  {
    id: '2',
    question: "How does Salah tracking work?",
    answer: "You can check off completed prayers on your home tracker dashboard or receive tailored adhan notifications for each salah time.",
  },
  {
    id: '3',
    question: "How is my Menstrual cycle calculated?",
    answer: "HerDeen uses your recorded last flow date and average cycle length to estimate upcoming cycles and activate Off-Salah ibadah mode automatically.",
  },
  {
    id: '4',
    question: "How do I change my prayer calculation method?",
    answer: "Navigate to Solah Settings > Calculation Method to choose from standard authorities like MWL, ISNA, and Umm al-Qura.",
  },
  {
    id: '5',
    question: "Can I track my daily Qur'an recitation?",
    answer: "Yes! Use the Qur'an reader or update your pages read in the daily Ibadah tracker to maintain consistency.",
  },
  {
    id: '6',
    question: "Are my personal notes and data secure?",
    answer: "Yes, all your reflections, daily plans, and account data are securely stored with end-to-end encrypted authentication.",
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