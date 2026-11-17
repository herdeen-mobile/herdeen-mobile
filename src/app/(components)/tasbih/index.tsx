// src/app/(components)/tasbih/index.tsx
import {
  useCompleteTasbihSessionMutation,
  useIncrementTasbihMutation,
  useResetTasbihMutation,
  useSaveTasbihStateMutation,
  useTasbihStateQuery,
} from '@/src/hooks/use-tasbih';
import { PRESET_DHIKRS } from '@/src/types/tasbih';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

export default function TasbihScreen() {
  const router = useRouter();

  // 1. TanStack Queries & Mutations
  const { data: tasbihState, isLoading } = useTasbihStateQuery();
  const { mutate: incrementCount } = useIncrementTasbihMutation();
  const { mutate: resetCount } = useResetTasbihMutation();
  const { mutate: saveState } = useSaveTasbihStateMutation();
  const { mutate: completeSession, isPending: isCompletingSession } =
    useCompleteTasbihSessionMutation();

  const counts = tasbihState?.counts || {};
  const selectedDhikrId = tasbihState?.selectedDhikrId || '1';
  const target = tasbihState?.target ?? 33;
  const soundEnabled = tasbihState?.soundEnabled ?? true;
  const vibrationEnabled = tasbihState?.vibrationEnabled ?? true;

  const [showResetModal, setShowResetModal] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);

  const currentDhikr = useMemo(() => {
    return PRESET_DHIKRS.find((d) => d.id === selectedDhikrId) || PRESET_DHIKRS[0];
  }, [selectedDhikrId]);

  const currentCount = counts[selectedDhikrId] || 0;
  const isTargetReached = target > 0 && currentCount >= target;

  const handleIncrement = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(25);
    }
    incrementCount(selectedDhikrId);
  };

  const handleResetConfirm = () => {
    resetCount(selectedDhikrId);
    setShowResetModal(false);
  };

  const handleSelectDhikr = (id: string) => {
    if (tasbihState) {
      saveState({
        ...tasbihState,
        selectedDhikrId: id,
      });
    }
    setShowPickerModal(false);
  };

  const handleSelectTarget = (newTarget: number) => {
    if (tasbihState) {
      saveState({
        ...tasbihState,
        target: newTarget,
      });
    }
    setShowTargetModal(false);
  };

  const toggleSound = () => {
    if (tasbihState) {
      saveState({
        ...tasbihState,
        soundEnabled: !soundEnabled,
      });
    }
  };

  const handleCompleteSession = () => {
    completeSession(undefined, {
      onSuccess: () => {
        Alert.alert(
          'MashaAllah!',
          `You completed ${currentCount} tasbih of "${currentDhikr.transliteration}". Recorded in your Daily Ibadah Tracker!`
        );
      },
      onError: () => {
        Alert.alert('Recorded', 'Tasbih session recorded locally.');
      },
    });
  };

  const formattedCount = String(currentCount).padStart(5, '0');

  return (
    <View className="flex-1 bg-white justify-between pb-12">
      {/* Top Header */}
      <View className="px-5 pt-12 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Tasbih</Text>

        <TouchableOpacity
          onPress={() => setShowTargetModal(true)}
          className="bg-purple-100 px-3 py-1.5 rounded-full flex-row items-center gap-1 active:opacity-80"
        >
          <Text className="text-xs font-bold text-purple-900">
            Target: {target === 0 ? 'Free' : target}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Counter Display */}
      <View className="items-center px-5">
        <TouchableOpacity
          onPress={() => setShowPickerModal(true)}
          className="flex-row items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-2 rounded-full mb-6 active:opacity-80"
        >
          <Text className="text-xs font-semibold text-purple-700">Switch Dhikr</Text>
          <Ionicons name="chevron-down" size={14} color="#7E22CE" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-900 mb-2 text-center font-serif">
          {currentDhikr.arabic}
        </Text>
        <Text className="text-base text-gray-500 font-medium mb-8 text-center">
          {currentDhikr.transliteration}
        </Text>

        {/* Target Reached Banner */}
        {isTargetReached && (
          <TouchableOpacity
            onPress={handleCompleteSession}
            disabled={isCompletingSession}
            className="mb-6 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl flex-row items-center gap-2 shadow-xs active:opacity-80"
          >
            <Ionicons name="checkmark-circle" size={18} color="#059669" />
            <Text className="text-xs font-bold text-emerald-800">
              Target {target} reached! Tap to record in Today's Tracker
            </Text>
            {isCompletingSession && <ActivityIndicator size="small" color="#059669" />}
          </TouchableOpacity>
        )}

        {/* Counter Egg / Box */}
        <View className="w-72 h-80 bg-pink-300 rounded-[56px] p-6 shadow-md items-center justify-between border-4 border-pink-400/50">
          <View className="w-full bg-pink-900/80 rounded-2xl py-4 px-6 items-center border border-pink-950/40 shadow-inner mt-2">
            <Text className="text-3xl font-mono tracking-widest text-pink-100 font-bold">
              {formattedCount}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleIncrement}
            activeOpacity={0.7}
            className="w-36 h-36 rounded-full bg-pink-400 border-4 border-pink-500/70 items-center justify-center shadow-lg active:opacity-80"
          >
            <View className="w-28 h-28 rounded-full bg-pink-300/60 items-center justify-center border border-pink-200/40">
              <Text className="text-pink-950 font-serif text-lg tracking-wider font-bold">
                Tap
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Tool Bar */}
      <View className="px-8 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={toggleSound}
          className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
        >
          <Ionicons
            name={soundEnabled ? 'volume-high' : 'volume-mute'}
            size={20}
            color="#4B5563"
          />
        </TouchableOpacity>

        {/* Complete Session Shortcut */}
        <TouchableOpacity
          onPress={handleCompleteSession}
          disabled={isCompletingSession}
          className="bg-primary px-5 py-3 rounded-full flex-row items-center gap-1.5 active:opacity-90"
        >
          {isCompletingSession ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={16} color="white" />
              <Text className="text-xs font-bold text-white">Save Progress</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowResetModal(true)}
          className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center active:opacity-70"
        >
          <Ionicons name="reload" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* 1. SELECT DHIKR MODAL */}
      <Modal visible={showPickerModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[36px] p-6 max-h-[60%]">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900">Select Dhikr</Text>
              <TouchableOpacity
                onPress={() => setShowPickerModal(false)}
                className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center"
              >
                <Ionicons name="close" size={18} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView className="gap-3" showsVerticalScrollIndicator={false}>
              {PRESET_DHIKRS.map((item) => {
                const isSelected = selectedDhikrId === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectDhikr(item.id)}
                    className={`p-4 rounded-2xl border flex-row justify-between items-center active:opacity-80 ${
                      isSelected
                        ? 'bg-purple-50/80 border-purple-300'
                        : 'bg-gray-50/50 border-gray-100'
                    }`}
                  >
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-bold text-gray-900 mb-0.5">
                        {item.transliteration}
                      </Text>
                      <Text className="text-xs text-gray-500">{item.translation}</Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-800 font-serif">
                      {item.arabic}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 2. SELECT TARGET MODAL */}
      <Modal visible={showTargetModal} animationType="fade" transparent={true}>
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-6 w-full shadow-2xl">
            <Text className="text-lg font-bold text-gray-900 mb-1">Set Tasbih Target</Text>
            <Text className="text-xs text-gray-400 mb-6">
              Select your goal cycle for this remembrance session:
            </Text>

            <View className="gap-2.5 mb-6">
              {[33, 100, 0].map((t) => {
                const isSelected = target === t;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => handleSelectTarget(t)}
                    className={`p-3.5 rounded-2xl border flex-row justify-between items-center active:opacity-80 ${
                      isSelected ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <Text className="text-sm font-bold text-gray-800">
                      {t === 0 ? 'Free flow (No Target)' : `${t} Counts`}
                    </Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={18} color="#9333EA" />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => setShowTargetModal(false)}
              className="py-3 bg-gray-100 rounded-full items-center active:opacity-80"
            >
              <Text className="text-xs font-bold text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3. RESET CONFIRMATION MODAL */}
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
              You have clicked {currentCount} times for "{currentDhikr.transliteration}".
              Resetting will clear this count back to 00000.
            </Text>

            <View className="flex-row gap-4 w-full">
              <TouchableOpacity
                onPress={() => setShowResetModal(false)}
                className="flex-1 py-4 rounded-full border border-gray-200 items-center justify-center bg-white active:opacity-80"
              >
                <Text className="text-base font-semibold text-gray-700">No, Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResetConfirm}
                className="flex-1 py-4 rounded-full bg-red-500 items-center justify-center shadow-sm active:opacity-80"
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
