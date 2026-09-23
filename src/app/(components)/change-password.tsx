// src/app/(components)/change-password.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function ChangePasswordScreen() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility toggle states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = () => {
    console.log('Updating password...');
    // Add your API / update logic here
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-bold text-foreground mb-8">Change Password</Text>

        {/* Inputs */}
        <View className="gap-4 mb-12">
          {/* Current Password */}
          <View className="relative justify-center">
            <Input
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current password"
              secureTextEntry={!showCurrent}
            />
            <TouchableOpacity
              onPress={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 p-2"
            >
              <Feather name={showCurrent ? 'eye' : 'eye-off'} size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* New Password */}
          <View className="relative justify-center">
            <Input
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
              secureTextEntry={!showNew}
            />
            <TouchableOpacity
              onPress={() => setShowNew(!showNew)}
              className="absolute right-4 p-2"
            >
              <Feather name={showNew ? 'eye' : 'eye-off'} size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View className="relative justify-center">
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 p-2"
            >
              <Feather name={showConfirm ? 'eye' : 'eye-off'} size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Update Button */}
        <Button
          label="Update Password"
          variant="primary"
          onPress={handleUpdatePassword}
          className="bg-primary active:opacity-90 rounded-full py-4"
          textClassName="text-white font-bold text-base"
        />
      </ScrollView>
    </View>
  );
}