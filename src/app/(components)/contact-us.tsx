// src/app/(components)/contact-us.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/auth-context';

export default function ContactUsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.firstName) setFullName(`${user.firstName} ${user.lastName || ''}`.trim());
  }, [user]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Message Required', 'Please enter your message before sending.');
      return;
    }
    Alert.alert(
      'Message Sent',
      'Thank you for reaching out! Our team will get back to you shortly.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12" contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Top Header Navigation with Close Button */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-bold text-foreground">Contact US</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center"
          >
            <Ionicons name="close" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View className="gap-4">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
            className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground text-base shadow-sm"
          />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground text-base shadow-sm"
          />

          <TextInput
            placeholder="Subject"
            placeholderTextColor="#9CA3AF"
            value={subject}
            onChangeText={setSubject}
            className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground text-base shadow-sm"
          />

          <TextInput
            placeholder="Message"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
            className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground text-base h-36 shadow-sm"
          />
        </View>

      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 border-t border-border">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSendMessage}
          className="bg-primary py-4 rounded-full items-center justify-center shadow-md active:opacity-90"
        >
          <Text className="text-white text-base font-bold">Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
