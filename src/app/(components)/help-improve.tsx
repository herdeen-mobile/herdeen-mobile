// src/app/(components)/help-improve.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HelpImproveScreen() {
  const router = useRouter();

  // State management for form fields and UI interactions
  const [topic, setTopic] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hasMedia, setHasMedia] = useState<boolean>(false);
  const [isTopicModalVisible, setIsTopicModalVisible] = useState<boolean>(false);

  // List of feedback topics
  const topicsList = ['Bug Report', 'Feature Request', 'Performance Issue', 'General Feedback'];

  // Check if form has minimum required input to enable submit button
  const isFormValid = topic.length > 0 && description.length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;

    // Log submission data for development verification
    console.log('Feedback Submitted:', { topic, description, hasMedia });

    // Navigate back after submission
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-12" contentContainerStyle={{ paddingBottom: 120 }}>

        {/* 1. Header Navigation */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-bold text-foreground">Help us improve</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center shadow-sm"
          >
            <Ionicons name="close" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* 2. Select Topic Dropdown Trigger */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsTopicModalVisible(true)}
          className="w-full bg-card border border-border rounded-2xl px-5 py-4 flex-row items-center justify-between shadow-sm mb-6"
        >
          <Text className={`text-base ${topic ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            {topic || 'Select Topic'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* 3. Description Input Box with Floating Label design */}
        <View className="w-full bg-card border border-border rounded-2xl p-4 shadow-sm mb-6 relative">
          <View className="absolute -top-2.5 left-4 bg-card px-1.5">
            <Text className="text-xs font-semibold text-primary">Description</Text>
          </View>
          <TextInput
            placeholder="I think this app needs to add..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            className="text-foreground text-base h-36 pt-1"
          />
        </View>

        {/* 4. Media Attachment Section */}
        <View className="flex-row items-center gap-4 flex-wrap">
          {/* Attached Media Thumbnail (Conditional) */}
          {hasMedia && (
            <View className="w-24 h-24 bg-gray-300 rounded-2xl relative items-center justify-center shadow-sm">
              <View className="w-8 h-8 bg-black/40 rounded-full items-center justify-center">
                <Feather name="image" size={16} color="#FFFFFF" />
              </View>
              {/* Remove attachment button */}
              <TouchableOpacity
                onPress={() => setHasMedia(false)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full border border-border items-center justify-center shadow-md"
              >
                <Ionicons name="close" size={14} color="#374151" />
              </TouchableOpacity>
            </View>
          )}

          {/* Attach Media Button */}
          {!hasMedia && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setHasMedia(true)}
              className="w-36 h-32 rounded-2xl border-2 border-dashed border-border items-center justify-center bg-card/50"
            >
              <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center mb-2">
                <Ionicons name="add" size={18} color="#374151" />
              </View>
              <Text className="text-xs font-medium text-muted-foreground">Attach Media</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>

      {/* 5. Fixed Bottom Submit Button Container */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border">
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!isFormValid}
          className={`py-4 rounded-full items-center justify-center shadow-sm ${
            isFormValid ? 'bg-primary' : 'bg-muted border border-border'
          }`}
        >
          <Text className={`font-bold text-base ${isFormValid ? 'text-white' : 'text-muted-foreground'}`}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* 6. Topic Selection Bottom Modal */}
      <Modal
        visible={isTopicModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsTopicModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-background rounded-t-3xl p-6 border-t border-border shadow-2xl">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-foreground">Select Topic</Text>
              <TouchableOpacity onPress={() => setIsTopicModalVisible(false)}>
                <Ionicons name="close" size={20} color="#374151" />
              </TouchableOpacity>
            </View>
            <View className="gap-2 pb-6">
              {topicsList.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setTopic(item);
                    setIsTopicModalVisible(false);
                  }}
                  className="py-3 px-4 rounded-xl active:bg-secondary flex-row items-center justify-between"
                >
                  <Text className="text-base font-semibold text-foreground">{item}</Text>
                  {topic === item && <Ionicons name="checkmark" size={18} color="#C084FC" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}