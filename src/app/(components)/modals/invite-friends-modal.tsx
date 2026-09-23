// src/(components)/modals/invite-friends-modal.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../../components/custom/button';

interface InviteFriendsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function InviteFriendsModal({ visible, onClose }: InviteFriendsModalProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out HerDeen, an amazing app to keep track of your daily prayers and dhikr!',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleCopyLink = () => {
    console.log('Link copied to clipboard');
    // Add clipboard logic here if needed (e.g., using expo-clipboard)
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
            Invite Friends
          </Text>
          <Text className="text-xs text-muted-foreground text-center px-6 mb-8 leading-relaxed">
            You have clicked 33 times today. Resetting will clear your dhikr count.
          </Text>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button
              label="Share Invite Link"
              variant="primary"
              onPress={handleShare}
              className="bg-primary active:opacity-90 rounded-full py-4 shadow-sm"
              textClassName="text-white font-bold text-base"
            />

            <TouchableOpacity
              onPress={handleCopyLink}
              className="py-3 items-center justify-center active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">Copy Link</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}