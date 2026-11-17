// src/app/(components)/quran/reader.tsx
import {
  useLogQuranPagesMutation,
  useSurahsQuery,
  useSurahVersesQuery,
  useUpdateLastReadMutation,
} from '@/src/hooks/use-quran';
import { SurahMeta } from '@/src/types/quran';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  Share,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const LANGUAGES = [
  { id: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
  { id: 'en-us', name: 'English (US)', flag: '🇺🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

interface QuranReaderScreenProps {
  favoriteSurahs?: number[];
  onToggleFavoriteSurah?: (id: number) => void;
}

export default function QuranReaderScreen({
  favoriteSurahs = [],
  onToggleFavoriteSurah,
}: QuranReaderScreenProps) {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialSurahNumber = Number(params.surahNumber) || 1;
  const initialSurahName = (params.surahName as string) || 'Al-Faatiha';

  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(initialSurahNumber);
  const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);

  // 1. TanStack Queries for Surahs and Verses
  const { data: allSurahs = [] } = useSurahsQuery();
  const {
    data: verses = [],
    isLoading: isVersesLoading,
    isError: isVersesError,
    refetch: refetchVerses,
  } = useSurahVersesQuery(currentSurahNumber);

  const { mutate: updateLastRead } = useUpdateLastReadMutation();
  const { mutate: logPagesRead, isPending: isLoggingPages } = useLogQuranPagesMutation();

  const currentSurahMeta: SurahMeta =
    allSurahs.find((s) => s.number === currentSurahNumber) || {
      id: currentSurahNumber,
      number: currentSurahNumber,
      name: initialSurahName,
      englishName: initialSurahName,
      englishNameTranslation: 'The Opening',
      numberOfAyahs: verses.length || 7,
      revelationType: 'Meccan',
    };

  // Sync Last Read to storage
  useEffect(() => {
    if (currentSurahMeta) {
      updateLastRead({
        surahNumber: currentSurahMeta.number,
        surahName: currentSurahMeta.englishName,
        ayahNumber: 1,
      });
    }
  }, [currentSurahNumber, currentSurahMeta.englishName]);

  // Modals visibility
  const [showSurahModal, setShowSurahModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogPagesModal, setShowLogPagesModal] = useState(false);
  const [pagesCount, setPagesCount] = useState(1);

  // Settings
  const [selectedTheme, setSelectedTheme] = useState<'Modern' | 'Stone age' | 'Dark'>('Modern');
  const [readingMode, setReadingMode] = useState<'Scroll' | 'Page'>('Page');
  const [textSize, setTextSize] = useState(50);
  const [alwaysOn, setAlwaysOn] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [showTransliteration, setShowTransliteration] = useState(true);

  const sliderWidthRef = useRef(200);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => updateSizeFromTouch(evt.nativeEvent.locationX),
      onPanResponderMove: (evt) => updateSizeFromTouch(evt.nativeEvent.locationX),
    })
  ).current;

  const updateSizeFromTouch = (locationX: number) => {
    const clampedX = Math.max(0, Math.min(locationX, sliderWidthRef.current));
    const percentage = (clampedX / sliderWidthRef.current) * 100;
    const calculatedSize = Math.round(Math.max(20, Math.min(100, percentage)));
    setTextSize(calculatedSize);
  };

  const toggleFavoriteVerse = (verseId: number) => {
    setFavoriteVerses((prev) =>
      prev.includes(verseId) ? prev.filter((id) => id !== verseId) : [...prev, verseId]
    );
  };

  const copyVerseText = async (verse: any) => {
    try {
      await Share.share({
        message: `${verse.arabic} (Ayah ${verse.numberInSurah || verse.id})\n\n"${verse.translation}"\n\n— Surah ${currentSurahMeta.englishName}`,
      });
    } catch {}
  };

  const handleLogPages = () => {
    logPagesRead(pagesCount, {
      onSuccess: () => {
        setShowLogPagesModal(false);
        Alert.alert(
          'Progress Saved!',
          `Recorded ${pagesCount} ${pagesCount === 1 ? 'page' : 'pages'} to today’s Ibadah tracker.`
        );
      },
      onError: () => {
        Alert.alert('Recorded', `Saved ${pagesCount} pages locally.`);
        setShowLogPagesModal(false);
      },
    });
  };

  const isStoneAge = selectedTheme === 'Stone age';
  const isDark = selectedTheme === 'Dark';

  const containerBg = isStoneAge ? 'bg-[#F7F2EA]' : isDark ? 'bg-gray-950' : 'bg-white';
  const textColor = isStoneAge ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isStoneAge ? 'text-gray-500' : isDark ? 'text-gray-400' : 'text-gray-400';
  const borderColor = isStoneAge ? 'border-amber-200/60' : isDark ? 'border-gray-800' : 'border-gray-100';
  const iconColor = isStoneAge ? '#4B5563' : isDark ? '#9CA3AF' : '#1F2937';

  const isPlainReading = isStoneAge || !showTranslation;
  const dynamicArabicSize = 20 + (textSize / 100) * 24;
  const dynamicTranslationSize = 12 + (textSize / 100) * 8;

  const isCurrentSurahFavorited = favoriteSurahs.includes(currentSurahNumber);

  return (
    <View className={`flex-1 pt-12 ${containerBg}`}>
      {/* Header */}
      <View className="px-5 flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-10 h-10 rounded-full items-center justify-center border active:opacity-70 ${
              isStoneAge
                ? 'bg-amber-100/50 border-amber-200'
                : isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons name="arrow-back" size={20} color={iconColor} />
          </TouchableOpacity>

          {/* Surah Selector Trigger */}
          <TouchableOpacity
            onPress={() => setShowSurahModal(true)}
            className="flex-row items-center gap-1.5 active:opacity-80"
          >
            <Text className={`text-xl font-bold ${textColor}`}>
              {currentSurahMeta.englishName}
            </Text>
            <Ionicons name="chevron-down" size={16} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2">
          {/* Log Pages Button */}
          <TouchableOpacity
            onPress={() => setShowLogPagesModal(true)}
            className="bg-purple-100 px-3 py-1.5 rounded-full flex-row items-center gap-1 active:opacity-80"
          >
            <Ionicons name="bookmark-outline" size={13} color="#7E22CE" />
            <Text className="text-xs font-bold text-purple-900">Track</Text>
          </TouchableOpacity>

          {/* Favorite Toggle Button */}
          <TouchableOpacity
            onPress={() => onToggleFavoriteSurah && onToggleFavoriteSurah(currentSurahNumber)}
            className={`w-10 h-10 rounded-full items-center justify-center border active:opacity-70 ${
              isStoneAge
                ? 'bg-amber-100/50 border-amber-200'
                : isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons
              name={isCurrentSurahFavorited ? 'star' : 'star-outline'}
              size={18}
              color={isCurrentSurahFavorited ? '#C572E3' : iconColor}
            />
          </TouchableOpacity>

          {/* Settings Trigger */}
          <TouchableOpacity
            onPress={() => setShowSettingsModal(true)}
            className={`w-10 h-10 rounded-full items-center justify-center border active:opacity-70 ${
              isStoneAge
                ? 'bg-amber-100/50 border-amber-200'
                : isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons name="settings-outline" size={18} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <Text className={`px-5 text-xs mb-3 ${subTextColor}`}>
        Surah {currentSurahNumber} • {currentSurahMeta.numberOfAyahs} Verses • {currentSurahMeta.revelationType}
      </Text>

      {/* Loading State */}
      {isVersesLoading && (
        <View className="items-center justify-center py-24">
          <ActivityIndicator size="small" color="#D946EF" />
          <Text className={`text-xs mt-3 font-medium ${subTextColor}`}>
            Loading verses of {currentSurahMeta.englishName}...
          </Text>
        </View>
      )}

      {/* Error State */}
      {isVersesError && (
        <View className="m-5 p-4 rounded-2xl bg-red-50 border border-red-100 flex-row items-center justify-between">
          <Text className="text-xs text-red-600 font-medium flex-1 mr-2">
            Failed to load verses from server.
          </Text>
          <TouchableOpacity onPress={() => refetchVerses()} className="bg-red-600 px-3 py-1.5 rounded-full">
            <Text className="text-xs font-bold text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isVersesLoading && (
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {!isPlainReading && (
            <View
              className="rounded-2xl p-5 mb-5 items-center justify-center shadow-sm relative overflow-hidden bg-primary"
            >
              <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
                <Ionicons name="book" size={110} color="#FFFFFF" />
              </View>

              <Text className="text-3xl font-bold text-white mb-1 font-serif">
                {currentSurahMeta.name}
              </Text>
              <Text className="text-xs font-semibold text-white tracking-wider">
                {currentSurahMeta.englishName} • {currentSurahMeta.englishNameTranslation}
              </Text>
            </View>
          )}

          {isPlainReading ? (
            <View
              className={`my-1 p-5 rounded-2xl border ${
                isStoneAge
                  ? 'bg-[#FAF6EE] border-amber-300/80 shadow-sm'
                  : isDark
                  ? 'bg-gray-900/40 border-gray-800'
                  : 'bg-gray-50/50 border-gray-200'
              }`}
            >
              <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-gray-300/30">
                <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>
                  {currentSurahMeta.revelationType}
                </Text>
                <Text className={`text-base font-serif font-bold ${textColor}`}>
                  {currentSurahMeta.name}
                </Text>
                <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>
                  {verses.length} Verses
                </Text>
              </View>

              <Text
                className={`font-serif text-right ${textColor}`}
                style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 2.2 }}
              >
                {verses.map((verse) => (
                  <React.Fragment key={verse.numberInSurah || verse.id}>
                    {verse.arabic}{' '}
                    <Text
                      className="text-purple-700 font-sans"
                      style={{ fontSize: dynamicArabicSize * 0.65 }}
                    >
                      ﴿{verse.numberInSurah || verse.id}﴾{' '}
                    </Text>
                  </React.Fragment>
                ))}
              </Text>
            </View>
          ) : (
            <View className="pb-16">
              {verses.map((verse) => {
                const verseId = verse.numberInSurah || verse.id;
                const isFavorited = favoriteVerses.includes(verseId);

                return (
                  <View key={verseId} className={`py-4 border-b ${borderColor}`}>
                    <View className="items-end mb-2">
                      <Text
                        className={`font-serif text-right ${textColor}`}
                        style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 1.8 }}
                      >
                        {verse.arabic}{' '}
                        <Text
                          className="text-purple-600 font-sans"
                          style={{ fontSize: dynamicArabicSize * 0.65 }}
                        >
                          ﴿{verseId}﴾
                        </Text>
                      </Text>
                    </View>

                    {showTranslation && (
                      <Text
                        className={`leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                        style={{ fontSize: dynamicTranslationSize }}
                      >
                        {verse.translation}
                      </Text>
                    )}

                    <View className="flex-row items-center gap-5">
                      <TouchableOpacity onPress={() => copyVerseText(verse)}>
                        <Ionicons
                          name="share-outline"
                          size={16}
                          color={isDark ? '#9CA3AF' : '#4B5563'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => toggleFavoriteVerse(verseId)}>
                        <Ionicons
                          name={isFavorited ? 'star' : 'star-outline'}
                          size={16}
                          color={isFavorited ? '#C572E3' : isDark ? '#9CA3AF' : '#4B5563'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      )}

      {/* 1. SURAH SELECTION MODAL */}
      <Modal visible={showSurahModal} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 max-h-[75%]">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Select Surah</Text>
              <TouchableOpacity onPress={() => setShowSurahModal(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {allSurahs.map((item) => {
                const isSelected = item.number === currentSurahNumber;
                return (
                  <TouchableOpacity
                    key={item.number}
                    onPress={() => {
                      setCurrentSurahNumber(item.number);
                      setShowSurahModal(false);
                    }}
                    className={`py-3.5 px-2 border-b border-gray-100 flex-row justify-between items-center rounded-xl ${
                      isSelected ? 'bg-purple-50' : ''
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Text className="text-xs font-bold text-purple-700 w-6">
                        {item.number}.
                      </Text>
                      <Text className="text-sm font-semibold text-gray-800">
                        {item.englishName}
                      </Text>
                    </View>
                    <Text className="text-base text-gray-800 font-serif">{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 2. LOG PAGES TRACKER MODAL */}
      <Modal visible={showLogPagesModal} animationType="fade" transparent={true}>
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-6 w-full shadow-2xl">
            <Text className="text-lg font-bold text-gray-900 mb-1">Track Quran Recitation</Text>
            <Text className="text-xs text-gray-400 mb-6">
              How many pages did you recite today?
            </Text>

            <View className="flex-row items-center justify-center gap-6 mb-6">
              <TouchableOpacity
                onPress={() => setPagesCount((p) => Math.max(1, p - 1))}
                className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center active:opacity-75"
              >
                <Ionicons name="remove" size={20} color="#1F2937" />
              </TouchableOpacity>
              <Text className="text-3xl font-extrabold text-purple-700">{pagesCount}</Text>
              <TouchableOpacity
                onPress={() => setPagesCount((p) => p + 1)}
                className="w-12 h-12 rounded-full bg-purple-100 items-center justify-center active:opacity-75"
              >
                <Ionicons name="add" size={20} color="#7E22CE" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowLogPagesModal(false)}
                className="flex-1 py-3 bg-gray-100 rounded-full items-center"
              >
                <Text className="text-xs font-bold text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogPages}
                disabled={isLoggingPages}
                className="flex-1 py-3 bg-primary rounded-full items-center active:opacity-90"
              >
                {isLoggingPages ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="text-xs font-bold text-white">Save to Tracker</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 3. SETTINGS BOTTOM SHEET MODAL */}
      <Modal visible={showSettingsModal} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 max-h-[85%]">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900">Settings</Text>
              <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="pb-6">
              {/* Reading Theme */}
              <View className="mb-5">
                <Text className="text-sm font-semibold text-gray-700 mb-3">Reading Theme</Text>
                <View className="flex-row gap-3">
                  {(['Modern', 'Stone age', 'Dark'] as const).map((theme) => {
                    const isSelected = selectedTheme === theme;
                    return (
                      <TouchableOpacity
                        key={theme}
                        onPress={() => setSelectedTheme(theme)}
                        className={`flex-1 p-3 rounded-2xl border-2 items-center justify-center ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/20'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <View
                          className={`w-full h-7 rounded-lg mb-2 ${
                            theme === 'Modern'
                              ? 'bg-white border border-gray-200'
                              : theme === 'Stone age'
                              ? 'bg-amber-100 border border-amber-300'
                              : 'bg-gray-900'
                          }`}
                        />
                        <Text
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-purple-700' : 'text-gray-600'
                          }`}
                        >
                          {theme}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Text Size Slider */}
              <View className="mb-5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Text Size</Text>
                <View className="flex-row items-center gap-4 mt-2">
                  <Text className="text-xs font-bold text-gray-500">A</Text>
                  <View
                    className="flex-1 h-6 relative justify-center"
                    onLayout={(event) => {
                      sliderWidthRef.current = event.nativeEvent.layout.width;
                    }}
                    {...panResponder.panHandlers}
                  >
                    <View className="h-2 bg-purple-200 rounded-full w-full relative justify-center">
                      <View
                        className="h-2 bg-purple-600 rounded-full"
                        style={{ width: `${textSize}%` }}
                      />
                    </View>
                    <View
                      className="w-5 h-5 bg-white rounded-full shadow border border-purple-600 absolute"
                      style={{ left: `${textSize}%`, marginLeft: -10 }}
                    />
                  </View>
                  <Text className="text-lg font-bold text-gray-700">A</Text>
                </View>
              </View>

              {/* Switches */}
              <View className="gap-3 pb-6">
                <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                  <Text className="text-sm font-semibold text-gray-800">Show Translation</Text>
                  <Switch
                    value={showTranslation}
                    onValueChange={setShowTranslation}
                    trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
                    thumbColor={showTranslation ? '#9333EA' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-2">
                  <Text className="text-sm font-semibold text-gray-800">Screen Always On</Text>
                  <Switch
                    value={alwaysOn}
                    onValueChange={setAlwaysOn}
                    trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
                    thumbColor={alwaysOn ? '#9333EA' : '#F3F4F6'}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
