// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Modal, Clipboard, Switch, Dimensions, PanResponder } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
//
// const { width } = Dimensions.get('window');
//
// // Data lists
// const SURAHS_LIST = [
//   { id: 1, name: 'Al-Fatiha', arabic: 'الفاتحة', verses: 7, type: 'Makkah', translation: 'The Opening' },
//   { id: 2, name: 'Al-Baqara', arabic: 'البقرة', verses: 286, type: 'Madinah', translation: 'The Cow' },
//   { id: 3, name: 'Al-i-Imraan', arabic: 'آل عمران', verses: 200, type: 'Madinah', translation: 'The Family of Imran' },
//   { id: 4, name: 'An-Nisaa', arabic: 'النساء', verses: 176, type: 'Madinah', translation: 'The Women' },
//   { id: 5, name: 'Al-Maaiida', arabic: 'المائدة', verses: 120, type: 'Madinah', translation: 'The Food' },
// ];
//
// const LANGUAGES = [
//   { id: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
//   { id: 'en-us', name: 'English (US)', flag: '🇺🇸' },
//   { id: 'fr', name: 'French', flag: '🇫🇷' },
//   { id: 'es', name: 'Spanish', flag: '🇪🇸' },
//   { id: 'de', name: 'Deutsche', flag: '🇩🇪' },
//   { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
// ];
//
// // Complete 7 Verses of Suratul Fatiha
// const VERSES = [
//   { id: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
//   { id: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: '[All] praise is [due] to Allah, Lord of the worlds -' },
//   { id: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Entirely Merciful, the Especially Merciful,' },
//   { id: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Sovereign of the Day of Recompense.' },
//   { id: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'It is You we worship and You we ask for help.' },
//   { id: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us to the straight path -' },
//   { id: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' },
// ];
//
// export default function QuranReaderScreen() {
//   const router = useRouter();
//
//   // Selections & States
//   const [currentSurah, setCurrentSurah] = useState(SURAHS_LIST[0]);
//   const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);
//
//   // Modals visibility toggles
//   const [showSurahModal, setShowSurahModal] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [showLanguageModal, setShowLanguageModal] = useState(false);
//
//   // Settings configuration states
//   const [selectedTheme, setSelectedTheme] = useState<'Modern' | 'Stone age' | 'Dark'>('Modern');
//   const [readingMode, setReadingMode] = useState<'Scroll' | 'Page'>('Page');
//   const [textSize, setTextSize] = useState(50); // range 20 to 100
//   const [alwaysOn, setAlwaysOn] = useState(true);
//   const [showTranslation, setShowTranslation] = useState(true);
//   const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
//   const [showTransliteration, setShowTransliteration] = useState(true);
//
//   // Track layout width for precise pan calculations
//   const sliderWidthRef = useRef(200);
//
//   // PanResponder to handle smooth bi-directional dragging for the text size slider
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: (evt) => {
//         updateSizeFromTouch(evt.nativeEvent.locationX);
//       },
//       onPanResponderMove: (evt) => {
//         updateSizeFromTouch(evt.nativeEvent.locationX);
//       },
//     })
//   ).current;
//
//   const updateSizeFromTouch = (locationX: number) => {
//     // Constrain touch location inside slider bounds (0 to sliderWidthRef)
//     const clampedX = Math.max(0, Math.min(locationX, sliderWidthRef.current));
//     const percentage = (clampedX / sliderWidthRef.current) * 100;
//     // Map between bounds 20% and 100%
//     const calculatedSize = Math.round(Math.max(20, Math.min(100, percentage)));
//     setTextSize(calculatedSize);
//   };
//
//   const toggleFavoriteVerse = (verseId: number) => {
//     setFavoriteVerses((prev) =>
//       prev.includes(verseId) ? prev.filter((id) => id !== verseId) : [...prev, verseId]
//     );
//   };
//
//   const copyVerseText = (verse: typeof VERSES[0]) => {
//     const content = `${verse.arabic} (Verse ${verse.id})\n${verse.translation}`;
//     Clipboard.setString(content);
//     alert(`Copied Verse ${verse.id}`);
//   };
//
//   // Theme styling mapping
//   const isStoneAge = selectedTheme === 'Stone age';
//   const isDark = selectedTheme === 'Dark';
//
//   const containerBg = isStoneAge ? 'bg-[#F7F2EA]' : isDark ? 'bg-gray-950' : 'bg-white';
//   const textColor = isStoneAge ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900';
//   const subTextColor = isStoneAge ? 'text-gray-500' : isDark ? 'text-gray-400' : 'text-gray-400';
//   const borderColor = isStoneAge ? 'border-amber-200/60' : isDark ? 'border-gray-800' : 'border-gray-100';
//   const iconColor = isStoneAge ? '#4B5563' : isDark ? '#9CA3AF' : '#1F2937';
//
//   // Determine if we should show traditional continuous view (Stone age or translation turned off)
//   const isPlainReading = isStoneAge || !showTranslation;
//
//   // Dynamic font sizing based on settings slider (textSize)
//   const dynamicArabicSize = 20 + (textSize / 100) * 24;
//   const dynamicTranslationSize = 12 + (textSize / 100) * 8;
//
//   return (
//     <View className={`flex-1 pt-12 ${containerBg}`}>
//       {/* Header */}
//       <View className="px-5 flex-row items-center justify-between mb-2">
//         <View className="flex-row items-center gap-3">
//           <TouchableOpacity
//             onPress={() => router.back()}
//             className={`w-10 h-10 rounded-full items-center justify-center border ${
//               isStoneAge ? 'bg-amber-100/50 border-amber-200' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
//             }`}
//           >
//             <Ionicons name="arrow-back" size={20} color={iconColor} />
//           </TouchableOpacity>
//
//           {/* Open Surah Modal */}
//           <TouchableOpacity
//             onPress={() => setShowSurahModal(true)}
//             className="flex-row items-center gap-1"
//           >
//             <Text className={`text-xl font-bold ${textColor}`}>{currentSurah.name}</Text>
//             <Ionicons name="chevron-down" size={16} color={iconColor} />
//           </TouchableOpacity>
//         </View>
//
//         {/* Open Settings Modal */}
//         <TouchableOpacity
//           onPress={() => setShowSettingsModal(true)}
//           className={`w-10 h-10 rounded-full items-center justify-center border ${
//             isStoneAge ? 'bg-amber-100/50 border-amber-200' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
//           }`}
//         >
//           <Ionicons name="settings-outline" size={18} color={iconColor} />
//         </TouchableOpacity>
//       </View>
//
//       <Text className={`px-5 text-xs mb-3 ${subTextColor}`}>Page 1 • Juz 1 / Hizb 1</Text>
//
//       <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
//         {/* Banner with #C572E3 background and subtle open Quran vector in background */}
//         {!isPlainReading && (
//           <View
//             className="rounded-2xl p-4 mb-4 items-center justify-center shadow-sm relative overflow-hidden"
//             style={{ backgroundColor: '#C572E3' }}
//           >
//             {/* Background Quran vector illustration watermark */}
//             <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
//               <Ionicons name="book" size={110} color="#FFFFFF" />
//             </View>
//
//             <Text className="text-2xl font-bold text-white mb-1 font-serif">{currentSurah.arabic}</Text>
//             <Text className="text-xs font-semibold text-white tracking-wider">{currentSurah.name} • {currentSurah.translation}</Text>
//           </View>
//         )}
//
//         {/* Conditional Layout: Mushaf Page Reading vs Detailed Cards View */}
//         {isPlainReading ? (
//           <View className={`my-1 p-5 rounded-2xl border ${isStoneAge ? 'bg-[#FAF6EE] border-amber-300/80 shadow-sm' : isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50/50 border-gray-200'}`}>
//
//             {/* Mushaf Header Frame Info */}
//             <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-gray-300/30">
//               <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>{currentSurah.type}</Text>
//               <Text className={`text-base font-serif font-bold ${textColor}`}>{currentSurah.arabic}</Text>
//               <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>{currentSurah.verses} Verses</Text>
//             </View>
//
//             {/* Continuous Arabic Text Layout with dynamic font sizing */}
//             <Text
//               className={`font-serif text-right ${textColor}`}
//               style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 2.2 }}
//             >
//               {VERSES.map((verse) => (
//                 <React.Fragment key={verse.id}>
//                   {verse.arabic}{' '}
//                   <Text className="text-purple-700 font-sans" style={{ fontSize: dynamicArabicSize * 0.65 }}>
//                     ﴿{verse.id}﴾{' '}
//                   </Text>
//                 </React.Fragment>
//               ))}
//             </Text>
//
//             <View className="mt-6 items-center">
//               <View className="w-16 h-[1px] bg-purple-400/40" />
//             </View>
//           </View>
//         ) : (
//           /* Detailed Cards View */
//           VERSES.map((verse) => {
//             const isFavorited = favoriteVerses.includes(verse.id);
//
//             return (
//               <View key={verse.id} className={`py-4 border-b ${borderColor}`}>
//                 <View className="items-end mb-2">
//                   <Text
//                     className={`font-serif text-right ${textColor}`}
//                     style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 1.8 }}
//                   >
//                     {verse.arabic}{' '}
//                     <Text className="text-purple-600 font-sans" style={{ fontSize: dynamicArabicSize * 0.65 }}>
//                       ﴿{verse.id}﴾
//                     </Text>
//                   </Text>
//                 </View>
//
//                 {showTranslation && (
//                   <Text
//                     className={`leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
//                     style={{ fontSize: dynamicTranslationSize }}
//                   >
//                     {verse.translation}
//                   </Text>
//                 )}
//
//                 <View className="flex-row items-center gap-5">
//                   <TouchableOpacity>
//                     <Ionicons name="play-outline" size={16} color={isDark ? '#9CA3AF' : '#4B5563'} />
//                   </TouchableOpacity>
//
//                   <TouchableOpacity onPress={() => copyVerseText(verse)}>
//                     <Ionicons name="copy-outline" size={16} color={isDark ? '#9CA3AF' : '#4B5563'} />
//                   </TouchableOpacity>
//
//                   <TouchableOpacity onPress={() => toggleFavoriteVerse(verse.id)}>
//                     <Ionicons
//                       name={isFavorited ? "star" : "star-outline"}
//                       size={16}
//                       color={isFavorited ? "#C572E3" : (isDark ? '#9CA3AF' : '#4B5563')}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             );
//           })
//         )}
//       </ScrollView>
//
//       {/* 1. SURAH SELECTION MODAL */}
//       <Modal visible={showSurahModal} animationType="slide" transparent={true}>
//         <View className="flex-1 bg-black/50 justify-end">
//           <View className="bg-white rounded-t-[32px] p-6 max-h-[70%]">
//             <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
//             <View className="flex-row justify-between items-center mb-4">
//               <Text className="text-lg font-bold text-gray-900">Select Surah</Text>
//               <TouchableOpacity onPress={() => setShowSurahModal(false)}>
//                 <Ionicons name="close" size={22} color="#1F2937" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView showsVerticalScrollIndicator={false}>
//               {SURAHS_LIST.map((item) => (
//                 <TouchableOpacity
//                   key={item.id}
//                   onPress={() => {
//                     setCurrentSurah(item);
//                     setShowSurahModal(false);
//                   }}
//                   className="py-3.5 border-b border-gray-100 flex-row justify-between items-center"
//                 >
//                   <Text className="text-base font-medium text-gray-800">{item.id}. {item.name}</Text>
//                   <Text className="text-sm text-purple-700 font-serif">{item.arabic}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//
//       {/* 2. SETTINGS BOTTOM SHEET MODAL */}
//       <Modal visible={showSettingsModal} animationType="slide" transparent={true}>
//         <View className="flex-1 bg-black/50 justify-end">
//           <View className="bg-white rounded-t-[32px] p-6 max-h-[85%]">
//             <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
//             <View className="flex-row justify-between items-center mb-6">
//               <Text className="text-xl font-bold text-gray-900">Settings</Text>
//               <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
//                 <Ionicons name="close" size={22} color="#1F2937" />
//               </TouchableOpacity>
//             </View>
//
//             <ScrollView showsVerticalScrollIndicator={false} className="pb-6">
//               {/* Reading Theme */}
//               <View className="mb-5">
//                 <View className="flex-row items-center gap-2 mb-3">
//                   <Ionicons name="moon-outline" size={18} color="#4B5563" />
//                   <Text className="text-sm font-semibold text-gray-700">Reading Theme</Text>
//                 </View>
//                 <View className="flex-row gap-3">
//                   {(['Modern', 'Stone age', 'Dark'] as const).map((theme) => {
//                     const isSelected = selectedTheme === theme;
//                     return (
//                       <TouchableOpacity
//                         key={theme}
//                         onPress={() => setSelectedTheme(theme)}
//                         className={`flex-1 p-3 rounded-2xl border-2 items-center justify-center ${
//                           isSelected ? 'border-purple-600 bg-purple-50/20' : 'border-gray-200 bg-gray-50'
//                         }`}
//                       >
//                         <View className={`w-full h-7 rounded-lg mb-2 ${
//                           theme === 'Modern' ? 'bg-white border border-gray-200' :
//                           theme === 'Stone age' ? 'bg-amber-100 border border-amber-300' : 'bg-gray-900'
//                         }`} />
//                         <Text className={`text-xs font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
//                           {theme}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>
//               </View>
//
//               {/* Reading Mode */}
//               <View className="mb-5">
//                 <View className="flex-row items-center gap-2 mb-3">
//                   <Ionicons name="options-outline" size={18} color="#4B5563" />
//                   <Text className="text-sm font-semibold text-gray-700">Reading Mode</Text>
//                 </View>
//                 <View className="flex-row gap-3">
//                   {(['Scroll', 'Page'] as const).map((mode) => {
//                     const isSelected = readingMode === mode;
//                     return (
//                       <TouchableOpacity
//                         key={mode}
//                         onPress={() => setReadingMode(mode)}
//                         className={`flex-1 py-3 px-4 rounded-2xl border flex-row items-center justify-center gap-2 ${
//                           isSelected ? 'border-purple-600 bg-purple-50/10' : 'border-gray-200 bg-white'
//                         }`}
//                       >
//                         <Ionicons
//                           name={mode === 'Scroll' ? 'list-outline' : 'book-outline'}
//                           size={18}
//                           color={isSelected ? '#9333EA' : '#4B5563'}
//                         />
//                         <Text className={`text-sm font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
//                           {mode}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>
//               </View>
//
//               {/* Text Size Slider with Smooth PanResponder Draggability */}
//               <View className="mb-5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <View className="flex-row items-center gap-2 mb-2">
//                   <Ionicons name="text-outline" size={18} color="#4B5563" />
//                   <Text className="text-sm font-semibold text-gray-700">Text Size</Text>
//                 </View>
//                 <View className="flex-row items-center gap-4 mt-2">
//                   <Text className="text-xs font-bold text-gray-500">A</Text>
//
//                   <View
//                     className="flex-1 h-6 relative justify-center"
//                     onLayout={(event) => {
//                       sliderWidthRef.current = event.nativeEvent.layout.width;
//                     }}
//                     {...panResponder.panHandlers}
//                   >
//                     {/* Background Track */}
//                     <View className="h-2 bg-purple-200 rounded-full w-full relative justify-center">
//                       <View className="absolute left-0 h-2 bg-purple-600 rounded-full" style={{ width: `${textSize}%` }} />
//                     </View>
//                     {/* Draggable Handle */}
//                     <View
//                       className="w-5 h-5 bg-white rounded-full shadow border border-purple-600 absolute"
//                       style={{ left: `${textSize}%`, marginLeft: -10 }}
//                     />
//                   </View>
//
//                   <Text className="text-lg font-bold text-gray-700">A</Text>
//                 </View>
//               </View>
//
//               {/* Switches with Settings Icons */}
//               <View className="space-y-4 pb-6">
//                 <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
//                   <View className="flex-row items-center gap-3">
//                     <Ionicons name="phone-portrait-outline" size={18} color="#4B5563" />
//                     <View>
//                       <Text className="text-sm font-bold text-gray-900">Always on</Text>
//                       <Text className="text-xs text-gray-400">Keep screen on while reading</Text>
//                     </View>
//                   </View>
//                   <Switch
//                     value={alwaysOn}
//                     onValueChange={setAlwaysOn}
//                     trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
//                     thumbColor={alwaysOn ? '#9333EA' : '#F3F4F6'}
//                   />
//                 </View>
//
//                 <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
//                   <View className="flex-row items-center gap-3">
//                     <Ionicons name="text" size={18} color="#4B5563" />
//                     <View>
//                       <Text className="text-sm font-bold text-gray-900">Show Translation</Text>
//                       <Text className="text-xs text-gray-400">Show verse translation</Text>
//                     </View>
//                   </View>
//                   <Switch
//                     value={showTranslation}
//                     onValueChange={setShowTranslation}
//                     trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
//                     thumbColor={showTranslation ? '#9333EA' : '#F3F4F6'}
//                   />
//                 </View>
//
//                 {/* Translation Language Selector Row */}
//                 <TouchableOpacity
//                   onPress={() => setShowLanguageModal(true)}
//                   className="flex-row items-center justify-between py-3 border-b border-gray-100"
//                 >
//                   <View className="flex-row items-center gap-3">
//                     <Ionicons name="language-outline" size={18} color="#4B5563" />
//                     <View>
//                       <Text className="text-sm font-bold text-gray-900">Translation language</Text>
//                       <Text className="text-xs text-gray-400">{selectedLanguage.name}</Text>
//                     </View>
//                   </View>
//                   <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//                 </TouchableOpacity>
//
//                 <View className="flex-row items-center justify-between py-2">
//                   <View className="flex-row items-center gap-3">
//                     <Ionicons name="book-outline" size={18} color="#4B5563" />
//                     <View>
//                       <Text className="text-sm font-bold text-gray-900">Show Transliteration</Text>
//                       <Text className="text-xs text-gray-400">Show phonetic spelling</Text>
//                     </View>
//                   </View>
//                   <Switch
//                     value={showTransliteration}
//                     onValueChange={setShowTransliteration}
//                     trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
//                     thumbColor={showTransliteration ? '#9333EA' : '#F3F4F6'}
//                   />
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//
//       {/* 3. TRANSLATION LANGUAGE SUB-MODAL */}
//       <Modal visible={showLanguageModal} animationType="slide" transparent={true}>
//         <View className="flex-1 bg-black/50 justify-end">
//           <View className="bg-white rounded-t-[32px] p-6 max-h-[60%]">
//             <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
//             <View className="flex-row items-center gap-4 mb-4">
//               <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
//                 <Ionicons name="arrow-back" size={20} color="#1F2937" />
//               </TouchableOpacity>
//               <Text className="text-xl font-bold text-gray-900">Translation language</Text>
//             </View>
//
//             <ScrollView showsVerticalScrollIndicator={false}>
//               {LANGUAGES.map((lang) => {
//                 const isSelected = selectedLanguage.id === lang.id;
//                 return (
//                   <TouchableOpacity
//                     key={lang.id}
//                     onPress={() => {
//                       setSelectedLanguage(lang);
//                       setShowLanguageModal(false);
//                     }}
//                     className="py-4 border-b border-gray-100 flex-row items-center justify-between"
//                   >
//                     <View className="flex-row items-center gap-4">
//                       <Text className="text-2xl">{lang.flag}</Text>
//                       <Text className={`text-base font-medium ${isSelected ? 'text-purple-700 font-bold' : 'text-gray-900'}`}>
//                         {lang.name}
//                       </Text>
//                     </View>
//                     {isSelected && <Ionicons name="checkmark" size={20} color="#9333EA" />}
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Clipboard, Switch, Dimensions, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Data lists
const SURAHS_LIST = [
  { id: 1, name: 'Al-Fatiha', arabic: 'الفاتحة', verses: 7, type: 'Makkah', translation: 'The Opening' },
  { id: 2, name: 'Al-Baqara', arabic: 'البقرة', verses: 286, type: 'Madinah', translation: 'The Cow' },
  { id: 3, name: 'Al-i-Imraan', arabic: 'آل عمران', verses: 200, type: 'Madinah', translation: 'The Family of Imran' },
  { id: 4, name: 'An-Nisaa', arabic: 'النساء', verses: 176, type: 'Madinah', translation: 'The Women' },
  { id: 5, name: 'Al-Maaiida', arabic: 'المائدة', verses: 120, type: 'Madinah', translation: 'The Food' },
];

const LANGUAGES = [
  { id: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
  { id: 'en-us', name: 'English (US)', flag: '🇺🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'de', name: 'Deutsche', flag: '🇩🇪' },
  { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
];

// Complete 7 Verses of Suratul Fatiha
const VERSES = [
  { id: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
  { id: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: '[All] praise is [due] to Allah, Lord of the worlds -' },
  { id: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Entirely Merciful, the Especially Merciful,' },
  { id: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Sovereign of the Day of Recompense.' },
  { id: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'It is You we worship and You we ask for help.' },
  { id: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us to the straight path -' },
  { id: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' },
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

  // Selections & States
  const [currentSurah, setCurrentSurah] = useState(SURAHS_LIST[0]);
  const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);

  // Check if current active surah is favorited
  const isCurrentSurahFavorited = favoriteSurahs.includes(currentSurah.id);

  // Modals visibility toggles
  const [showSurahModal, setShowSurahModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Settings configuration states
  const [selectedTheme, setSelectedTheme] = useState<'Modern' | 'Stone age' | 'Dark'>('Modern');
  const [readingMode, setReadingMode] = useState<'Scroll' | 'Page'>('Page');
  const [textSize, setTextSize] = useState(50); // range 20 to 100
  const [alwaysOn, setAlwaysOn] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [showTransliteration, setShowTransliteration] = useState(true);

  // Track layout width for precise pan calculations
  const sliderWidthRef = useRef(200);

  // PanResponder to handle smooth bi-directional dragging for the text size slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateSizeFromTouch(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateSizeFromTouch(evt.nativeEvent.locationX);
      },
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

  const copyVerseText = (verse: typeof VERSES[0]) => {
    const content = `${verse.arabic} (Verse ${verse.id})\n${verse.translation}`;
    Clipboard.setString(content);
    alert(`Copied Verse ${verse.id}`);
  };

  // Theme styling mapping
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

  return (
    <View className={`flex-1 pt-12 ${containerBg}`}>
      {/* Header */}
      <View className="px-5 flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isStoneAge ? 'bg-amber-100/50 border-amber-200' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons name="arrow-back" size={20} color={iconColor} />
          </TouchableOpacity>

          {/* Open Surah Modal */}
          <TouchableOpacity
            onPress={() => setShowSurahModal(true)}
            className="flex-row items-center gap-1"
          >
            <Text className={`text-xl font-bold ${textColor}`}>{currentSurah.name}</Text>
            <Ionicons name="chevron-down" size={16} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2">
          {/* Direct Favorite Toggle Button in Header */}
          <TouchableOpacity
            onPress={() => onToggleFavoriteSurah && onToggleFavoriteSurah(currentSurah.id)}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isStoneAge ? 'bg-amber-100/50 border-amber-200' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons
              name={isCurrentSurahFavorited ? "star" : "star-outline"}
              size={18}
              color={isCurrentSurahFavorited ? "#C572E3" : iconColor}
            />
          </TouchableOpacity>

          {/* Open Settings Modal */}
          <TouchableOpacity
            onPress={() => setShowSettingsModal(true)}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              isStoneAge ? 'bg-amber-100/50 border-amber-200' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <Ionicons name="settings-outline" size={18} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <Text className={`px-5 text-xs mb-3 ${subTextColor}`}>Page 1 • Juz 1 / Hizb 1</Text>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {!isPlainReading && (
          <View
            className="rounded-2xl p-4 mb-4 items-center justify-center shadow-sm relative overflow-hidden"
            style={{ backgroundColor: '#C572E3' }}
          >
            <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
              <Ionicons name="book" size={110} color="#FFFFFF" />
            </View>

            <Text className="text-2xl font-bold text-white mb-1 font-serif">{currentSurah.arabic}</Text>
            <Text className="text-xs font-semibold text-white tracking-wider">{currentSurah.name} • {currentSurah.translation}</Text>
          </View>
        )}

        {isPlainReading ? (
          <View className={`my-1 p-5 rounded-2xl border ${isStoneAge ? 'bg-[#FAF6EE] border-amber-300/80 shadow-sm' : isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50/50 border-gray-200'}`}>
            <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-gray-300/30">
              <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>{currentSurah.type}</Text>
              <Text className={`text-base font-serif font-bold ${textColor}`}>{currentSurah.arabic}</Text>
              <Text className={`text-[11px] uppercase tracking-widest ${subTextColor}`}>{currentSurah.verses} Verses</Text>
            </View>

            <Text
              className={`font-serif text-right ${textColor}`}
              style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 2.2 }}
            >
              {VERSES.map((verse) => (
                <React.Fragment key={verse.id}>
                  {verse.arabic}{' '}
                  <Text className="text-purple-700 font-sans" style={{ fontSize: dynamicArabicSize * 0.65 }}>
                    ﴿{verse.id}﴾{' '}
                  </Text>
                </React.Fragment>
              ))}
            </Text>

            <View className="mt-6 items-center">
              <View className="w-16 h-[1px] bg-purple-400/40" />
            </View>
          </View>
        ) : (
          VERSES.map((verse) => {
            const isFavorited = favoriteVerses.includes(verse.id);

            return (
              <View key={verse.id} className={`py-4 border-b ${borderColor}`}>
                <View className="items-end mb-2">
                  <Text
                    className={`font-serif text-right ${textColor}`}
                    style={{ fontSize: dynamicArabicSize, lineHeight: dynamicArabicSize * 1.8 }}
                  >
                    {verse.arabic}{' '}
                    <Text className="text-purple-600 font-sans" style={{ fontSize: dynamicArabicSize * 0.65 }}>
                      ﴿{verse.id}﴾
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
                  <TouchableOpacity>
                    <Ionicons name="play-outline" size={16} color={isDark ? '#9CA3AF' : '#4B5563'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => copyVerseText(verse)}>
                    <Ionicons name="copy-outline" size={16} color={isDark ? '#9CA3AF' : '#4B5563'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => toggleFavoriteVerse(verse.id)}>
                    <Ionicons
                      name={isFavorited ? "star" : "star-outline"}
                      size={16}
                      color={isFavorited ? "#C572E3" : (isDark ? '#9CA3AF' : '#4B5563')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* 1. SURAH SELECTION MODAL */}
      <Modal visible={showSurahModal} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 max-h-[70%]">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Select Surah</Text>
              <TouchableOpacity onPress={() => setShowSurahModal(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {SURAHS_LIST.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setCurrentSurah(item);
                    setShowSurahModal(false);
                  }}
                  className="py-3.5 border-b border-gray-100 flex-row justify-between items-center"
                >
                  <Text className="text-base font-medium text-gray-800">{item.id}. {item.name}</Text>
                  <Text className="text-sm text-purple-700 font-serif">{item.arabic}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 2. SETTINGS BOTTOM SHEET MODAL */}
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
              <View className="mb-5">
                <View className="flex-row items-center gap-2 mb-3">
                  <Ionicons name="moon-outline" size={18} color="#4B5563" />
                  <Text className="text-sm font-semibold text-gray-700">Reading Theme</Text>
                </View>
                <View className="flex-row gap-3">
                  {(['Modern', 'Stone age', 'Dark'] as const).map((theme) => {
                    const isSelected = selectedTheme === theme;
                    return (
                      <TouchableOpacity
                        key={theme}
                        onPress={() => setSelectedTheme(theme)}
                        className={`flex-1 p-3 rounded-2xl border-2 items-center justify-center ${
                          isSelected ? 'border-purple-600 bg-purple-50/20' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <View className={`w-full h-7 rounded-lg mb-2 ${
                          theme === 'Modern' ? 'bg-white border border-gray-200' :
                          theme === 'Stone age' ? 'bg-amber-100 border border-amber-300' : 'bg-gray-900'
                        }`} />
                        <Text className={`text-xs font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                          {theme}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="mb-5">
                <View className="flex-row items-center gap-2 mb-3">
                  <Ionicons name="options-outline" size={18} color="#4B5563" />
                  <Text className="text-sm font-semibold text-gray-700">Reading Mode</Text>
                </View>
                <View className="flex-row gap-3">
                  {(['Scroll', 'Page'] as const).map((mode) => {
                    const isSelected = readingMode === mode;
                    return (
                      <TouchableOpacity
                        key={mode}
                        onPress={() => setReadingMode(mode)}
                        className={`flex-1 py-3 px-4 rounded-2xl border flex-row items-center justify-center gap-2 ${
                          isSelected ? 'border-purple-600 bg-purple-50/10' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <Ionicons
                          name={mode === 'Scroll' ? 'list-outline' : 'book-outline'}
                          size={18}
                          color={isSelected ? '#9333EA' : '#4B5563'}
                        />
                        <Text className={`text-sm font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                          {mode}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="mb-5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="text-outline" size={18} color="#4B5563" />
                  <Text className="text-sm font-semibold text-gray-700">Text Size</Text>
                </View>
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
                      <View className="absolute left-0 h-2 bg-purple-600 rounded-full" style={{ width: `${textSize}%` }} />
                    </View>
                    <View
                      className="w-5 h-5 bg-white rounded-full shadow border border-purple-600 absolute"
                      style={{ left: `${textSize}%`, marginLeft: -10 }}
                    />
                  </View>

                  <Text className="text-lg font-bold text-gray-700">A</Text>
                </View>
              </View>

              <View className="space-y-4 pb-6">
                <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                  <View className="flex-row items-center gap-3">
                    <Ionicons name="phone-portrait-outline" size={18} color="#4B5563" />
                    <View>
                      <Text className="text-sm font-bold text-gray-900">Always on</Text>
                      <Text className="text-xs text-gray-400">Keep screen on while reading</Text>
                    </View>
                  </View>
                  <Switch
                    value={alwaysOn}
                    onValueChange={setAlwaysOn}
                    trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
                    thumbColor={alwaysOn ? '#9333EA' : '#F3F4F6'}
                  />
                </View>

                <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
                  <View className="flex-row items-center gap-3">
                    <Ionicons name="text" size={18} color="#4B5563" />
                    <View>
                      <Text className="text-sm font-bold text-gray-900">Show Translation</Text>
                      <Text className="text-xs text-gray-400">Show verse translation</Text>
                    </View>
                  </View>
                  <Switch
                    value={showTranslation}
                    onValueChange={setShowTranslation}
                    trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
                    thumbColor={showTranslation ? '#9333EA' : '#F3F4F6'}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => setShowLanguageModal(true)}
                  className="flex-row items-center justify-between py-3 border-b border-gray-100"
                >
                  <View className="flex-row items-center gap-3">
                    <Ionicons name="language-outline" size={18} color="#4B5563" />
                    <View>
                      <Text className="text-sm font-bold text-gray-900">Translation language</Text>
                      <Text className="text-xs text-gray-400">{selectedLanguage.name}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>

                <View className="flex-row items-center justify-between py-2">
                  <View className="flex-row items-center gap-3">
                    <Ionicons name="book-outline" size={18} color="#4B5563" />
                    <View>
                      <Text className="text-sm font-bold text-gray-900">Show Transliteration</Text>
                      <Text className="text-xs text-gray-400">Show phonetic spelling</Text>
                    </View>
                  </View>
                  <Switch
                    value={showTransliteration}
                    onValueChange={setShowTransliteration}
                    trackColor={{ false: '#E5E7EB', true: '#C084FC' }}
                    thumbColor={showTransliteration ? '#9333EA' : '#F3F4F6'}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 3. TRANSLATION LANGUAGE SUB-MODAL */}
      <Modal visible={showLanguageModal} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 max-h-[60%]">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <View className="flex-row items-center gap-4 mb-4">
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="arrow-back" size={20} color="#1F2937" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-gray-900">Translation language</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage.id === lang.id;
                return (
                  <TouchableOpacity
                    key={lang.id}
                    onPress={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageModal(false);
                    }}
                    className="py-4 border-b border-gray-100 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-4">
                      <Text className="text-2xl">{lang.flag}</Text>
                      <Text className={`text-base font-medium ${isSelected ? 'text-purple-700 font-bold' : 'text-gray-900'}`}>
                        {lang.name}
                      </Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark" size={20} color="#9333EA" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}