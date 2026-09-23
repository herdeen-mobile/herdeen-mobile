// src/app/(components)/quiet-hours.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/custom/input';
import { Button } from '../../../components/custom/button';

export default function QuietHoursScreen() {
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(true);
  const [fromTime, setFromTime] = useState('10:00 PM');
  const [toTime, setToTime] = useState('10:00 PM');

  const handleSave = () => {
    console.log('Saved Quiet Hours:', { isEnabled, fromTime, toTime });
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

        <Text className="text-xl font-bold text-foreground mb-6">Quiet Hours</Text>

        {/* Enable Switch Row */}
        <View className="flex-row items-center justify-between p-4 bg-card rounded-2xl border border-border mb-6">
          <Text className="text-sm font-semibold text-foreground">Enable Quiet Hours</Text>
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#D8B4FE' }}
            thumbColor={isEnabled ? '#A855F7' : '#9CA3AF'}
            onValueChange={() => setIsEnabled(!isEnabled)}
            value={isEnabled}
          />
        </View>

        {/* Time Inputs */}
        <View className="gap-5 mb-12">
          {/* From */}
          <View>
            <Text className="text-xs font-semibold text-muted-foreground mb-2">From</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <View pointerEvents="none">
                <Input value={fromTime} editable={false} />
              </View>
              <View className="absolute right-4 top-3.5">
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* To */}
          <View>
            <Text className="text-xs font-semibold text-muted-foreground mb-2">To</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <View pointerEvents="none">
                <Input value={toTime} editable={false} />
              </View>
              <View className="absolute right-4 top-3.5">
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <Button
          label="Save"
          variant="primary"
          onPress={handleSave}
          className="bg-primary active:opacity-90 rounded-full py-4"
          textClassName="text-white font-bold text-base"
        />
      </ScrollView>
    </View>
  );
}