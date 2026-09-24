import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DHIKR_LIST = [
  { id: '1', arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'Subhana lah', translation: 'Glory be to Allah' },
  { id: '2', arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Al-hamdu lillah', translation: 'Praise be to Allah' },
  { id: '3', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu akbar', translation: 'Allah is the Greatest' },
  { id: '4', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah' },
  { id: '5', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illallah', translation: 'There is no god but Allah' },
];

export default function TasbihScreen() {
  const router = useRouter();

  const [counts, setCounts] = useState<{ [key: string]: number }>({
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  });

  const [selectedDhikrId, setSelectedDhikrId] = useState('1');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);

  const currentDhikr = DHIKR_LIST.find((d) => d.id === selectedDhikrId) || DHIKR_LIST[0];
  const currentCount = counts[selectedDhikrId] || 0;

  const handleIncrement = () => {
    setCounts((prev) => ({
      ...prev,
      [selectedDhikrId]: (prev[selectedDhikrId] || 0) + 1,
    }));
  };

  const handleResetConfirm = () => {
    setCounts((prev) => ({
      ...prev,
      [selectedDhikrId]: 0,
    }));
    setShowResetModal(false);
  };

  const formattedCount = String(currentCount).padStart(5, '0');

  return (
    <View className="flex-1 bg-white justify-between pb-12">
      <View className="px-5 pt-12 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Tasbih</Text>
        <View className="w-10" />
      </View>

      <View className="items-center px-5">
        <TouchableOpacity
          onPress={() => setShowPickerModal(true)}
          className="flex-row items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-2 rounded-full mb-6"
        >
          <Text className="text-xs font-semibold text-purple-700">Switch Dhikr</Text>
          <Ionicons name="chevron-down" size={14} color="#7E22CE" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {currentDhikr.arabic}
        </Text>
        <Text className="text-base text-gray-500 font-medium mb-10 text-center">
          {currentDhikr.transliteration}
        </Text>

        <View className="w-72 h-80 bg-pink-300 rounded-[56px] p-6 shadow-md items-center justify-between border-4 border-pink-400/50">
          <View className="w-full bg-pink-900/80 rounded-2xl py-4 px-6 items-center border border-pink-950/40 shadow-inner mt-2">
            <Text className="text-3xl font-mono tracking-widest text-pink-100 font-bold">
              {formattedCount}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleIncrement}
            activeOpacity={0.8}
            className="w-36 h-36 rounded-full bg-pink-400 border-4 border-pink-500/70 items-center justify-center shadow-lg"
          >
            <View className="w-28 h-28 rounded-full bg-pink-300/60 items-center justify-center border border-pink-200/40">
              <Text className="text-pink-950 font-serif text-lg tracking-wider font-bold">
                Tap
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-8 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => setSoundEnabled(!soundEnabled)}
          className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center"
        >
          <Ionicons
            name={soundEnabled ? "volume-high" : "volume-mute"}
            size={20}
            color="#4B5563"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowResetModal(true)}
          className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center"
        >
          <Ionicons name="reload" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <Modal visible={showPickerModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[36px] p-6 h-[55%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900">Select Dhikr</Text>
              <TouchableOpacity onPress={() => setShowPickerModal(false)} className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                <Ionicons name="close" size={18} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView className="gap-3">
              {DHIKR_LIST.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedDhikrId(item.id);
                    setShowPickerModal(false);
                  }}
                  className={`p-4 rounded-2xl border flex-row justify-between items-center ${
                    selectedDhikrId === item.id
                      ? 'bg-purple-50/80 border-purple-300'
                      : 'bg-gray-50/50 border-gray-100'
                  }`}
                >
                  <View>
                    <Text className="text-base font-bold text-gray-900 mb-0.5">{item.transliteration}</Text>
                    <Text className="text-xs text-gray-500">{item.translation}</Text>
                  </View>
                  <Text className="text-xl font-bold text-gray-800">{item.arabic}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showResetModal} animationType="fade" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[36px] p-8 pb-12 items-center shadow-2xl">
            <TouchableOpacity
              onPress={() => setShowResetModal(false)}
              className="self-end w-8 h-8 rounded-full bg-gray-50 items-center justify-center mb-4"
            >
              <Ionicons name="close" size={18} color="#1F2937" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Reset tasbih?
            </Text>

            <Text className="text-sm text-gray-500 text-center leading-relaxed mb-8 px-4">
              You have clicked {currentCount} times for "{currentDhikr.transliteration}". Resetting will clear this count back to 00000.
            </Text>

            <View className="flex-row gap-4 w-full">
              <TouchableOpacity
                onPress={() => setShowResetModal(false)}
                className="flex-1 py-4 rounded-full border border-gray-200 items-center justify-center bg-white"
              >
                <Text className="text-base font-semibold text-gray-700">No, Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResetConfirm}
                className="flex-1 py-4 rounded-full bg-red-500 items-center justify-center shadow-sm"
              >
                <Text className="text-base font-semibold text-white">Yes, Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}