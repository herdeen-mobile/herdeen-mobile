// src/app/(tabs)/cycle.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CycleSettingsComponent from '../(components)/cycle-settings';

export default function CycleScreen() {
  return (
    <View className="flex-1">
      {/* It will render right here inside your tab view */}
      <CycleSettingsComponent />
    </View>
  );
}