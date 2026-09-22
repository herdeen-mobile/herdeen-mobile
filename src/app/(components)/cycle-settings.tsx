// src/components/cycle-settings.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function CycleSettingsComponent() {
  const router = useRouter();

  // Date state initialized safely
  const [date, setDate] = useState<Date>(new Date(2026, 5, 15)); // June 15, 2026
  const [showPicker, setShowPicker] = useState(false);

  const [cycleLength, setCycleLength] = useState('28 days');
  const [isCycleLengthModalOpen, setIsCycleLengthModalOpen] = useState(false);

  const cycleOptions = ['21 days', '25 days', '28 days', '30 days', '35 days'];

  // Compute safeDate first so we never call methods on undefined/non-Date objects
  const safeDate = (date instanceof Date && !isNaN(date.getTime()))
    ? date
    : new Date();

  // Format safely from safeDate
  const formattedDate = safeDate.toISOString().split('T')[0];

  const handleUpdate = () => {
    console.log('Updated Cycle Settings:', { lastDate: formattedDate, cycleLength });
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
          <Text className="text-lg font-bold text-foreground">Cycle Settings</Text>
        </View>

        {/* Inputs */}
        <View className="gap-5 mb-10">
          {/* Real Calendar Date Picker Trigger */}
          <View>
            <Text className="text-xs font-semibold text-muted-foreground mb-2">Last Period Date</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowPicker(true)}
            >
              <View pointerEvents="none">
                <Input
                  value={formattedDate}
                  placeholder="Select Date"
                  editable={false}
                />
              </View>
              <View className="absolute right-4 top-3.5">
                <Feather name="calendar" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Native DateTimePicker Component with modern event handling */}
          {showPicker && (
            <DateTimePicker
              value={safeDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                if (Platform.OS === 'android') {
                  setShowPicker(false);
                }
                if (event.type === 'set' && selectedDate) {
                  setDate(selectedDate);
                } else if (event.type === 'dismissed') {
                  setShowPicker(false);
                }
              }}
            />
          )}

          {/* iOS Confirmation button wrapper if spinner is open */}
          {showPicker && Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={() => setShowPicker(false)}
              className="bg-primary/20 py-2 rounded-xl items-center mb-2"
            >
              <Text className="text-xs font-bold text-primary">Done Selecting Date</Text>
            </TouchableOpacity>
          )}

          {/* Cycle Length Dropdown Trigger */}
          <View>
            <Text className="text-xs font-semibold text-muted-foreground mb-2">Cycle Length</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsCycleLengthModalOpen(true)}
            >
              <View pointerEvents="none">
                <Input
                  value={cycleLength}
                  editable={false}
                />
              </View>
              <View className="absolute right-4 top-3.5">
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Update Button */}
        <Button
          label="Update"
          variant="primary"
          onPress={handleUpdate}
          className="bg-primary active:opacity-90"
          textClassName="text-white font-bold"
        />
      </ScrollView>

      {/* Cycle Length Selection Modal */}
      <Modal
        visible={isCycleLengthModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCycleLengthModalOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setIsCycleLengthModalOpen(false)}
        >
          <View className="w-full bg-card rounded-3xl p-6 border border-border shadow-lg">
            <Text className="text-base font-bold text-foreground mb-4">Select Cycle Length</Text>
            <FlatList
              data={cycleOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`py-3.5 px-4 rounded-xl mb-2 flex-row justify-between items-center ${cycleLength === item ? 'bg-secondary' : 'bg-transparent'}`}
                  onPress={() => {
                    setCycleLength(item);
                    setIsCycleLengthModalOpen(false);
                  }}
                >
                  <Text className={`text-sm font-medium ${cycleLength === item ? 'text-primary font-bold' : 'text-foreground'}`}>
                    {item}
                  </Text>
                  {cycleLength === item && (
                    <Ionicons name="checkmark" size={18} color="#D8B4FE" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}