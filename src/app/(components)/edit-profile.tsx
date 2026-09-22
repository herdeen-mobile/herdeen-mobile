// src/components/edit-profile.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function EditProfileComponent() {
  const router = useRouter();

  // Form states matching the design mockup inputs
  const [firstName, setFirstName] = useState('Aishah');
  const [lastName, setLastName] = useState('Abdullah');
  const [email, setEmail] = useState('aishah@email.com');

  const handleSaveChanges = () => {
    // Handle saving user profile updates here
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      {/* Scrollable Container */}
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 1. Top Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">Edit Profile</Text>
        </View>

        {/* 2. Avatar with Camera Badge */}
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-primary shadow-sm">
              <Image
                source={require('../../../assets/images/avatar.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border items-center justify-center shadow-xs">
              <Feather name="camera" size={14} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Form Input Fields using Custom Input Component */}
        <View className="gap-5 mb-10">
          <Input
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
          />

          <Input
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter email"
            className="text-muted-foreground"
          />
        </View>

        {/* 4. Save Changes Button using Custom Button Component */}
        <Button
          label="Save changes"
          variant="primary"
          onPress={handleSaveChanges}
          className="bg-primary active:opacity-90"
          textClassName="text-white font-bold"
        />

      </ScrollView>
    </View>
  );
}