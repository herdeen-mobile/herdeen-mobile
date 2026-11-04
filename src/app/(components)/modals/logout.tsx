// src/app/(components)/modal/logout.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export default function LogoutModal({ visible, onClose, onConfirmLogout }: LogoutModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* 1. Backdrop overlay */}
      <View className="flex-1 bg-black/50 justify-end">

        {/* 2. Bottom Sheet Container */}
        <View className="bg-card rounded-t-[32px] p-6 pb-12 border-t border-border shadow-2xl">

          {/* 3. Close Button Header */}
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* 4. Illustration / Icon Container */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-amber-50 items-center justify-center border border-amber-100 relative overflow-hidden">
              {/* Decorative graphic matching your design theme */}
              <View className="w-16 h-16 rounded-full bg-amber-300 items-center justify-center opacity-90">
                <Ionicons name="reload" size={28} color="#D97706" />
              </View>
            </View>
          </View>

          {/* 5. Title & Description */}
          <Text className="text-xl font-bold text-foreground text-center mb-2">
            Log Out
          </Text>
          <Text className="text-xs text-muted-foreground text-center px-6 mb-8 leading-relaxed">
            Are you sure you want to log out?
          </Text>

          {/* 6. Action Buttons */}
          <View className="gap-3">
            {/* Confirm Logout Button */}
            <TouchableOpacity
              onPress={onConfirmLogout}
              className="bg-primary active:opacity-90 rounded-full py-4 items-center justify-center shadow-sm"
            >
              <Text className="text-white font-bold text-base">Yes, log out</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onClose}
              className="py-3 items-center justify-center active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">No, Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}