// src/(components)/modals/rate-us-modal.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../../components/custom/button';

interface RateUsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RateUsModal({ visible, onClose }: RateUsModalProps) {
  const handleRateOnStore = () => {
    console.log('Redirecting to Google Play / App Store...');
    // Add store link redirection logic here (e.g., Linking.openURL)
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View className="flex-1 bg-black/50 justify-end">
        {/* Modal Card */}
        <View className="bg-card rounded-t-[32px] p-6 pb-12 border-t border-border shadow-2xl">

          {/* Close Button Header */}
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity onPress={onClose} className="p-1">
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Decorative Icon / Graphic Placeholder */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-secondary items-center justify-center border border-border">
              <Ionicons name="repeat-outline" size={36} color="#EF4444" />
            </View>
          </View>

          {/* Title & Description */}
          <Text className="text-xl font-bold text-foreground text-center mb-2">
            Rate HerDeen
          </Text>
          <Text className="text-xs text-muted-foreground text-center px-6 mb-8 leading-relaxed">
            You have clicked 33 times today. Resetting will clear your dhikr count.
          </Text>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button
              label="Rate on Google Play"
              variant="primary"
              onPress={handleRateOnStore}
              className="bg-primary active:opacity-90 rounded-full py-4 shadow-sm"
              textClassName="text-white font-bold text-base"
            />

            <TouchableOpacity
              onPress={onClose}
              className="py-3 items-center justify-center active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">Do this later</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}