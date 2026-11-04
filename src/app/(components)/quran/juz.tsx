import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const JUZ_SECTIONS = [
  {
    id: 1,
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (1)',
    surahInfo: 'Al-faathia · Verse 1-7',
    badgeNumber: '1',
  },
  {
    id: 2,
    arabicText: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَنْ يَضْرِبَ مَثَلًا مَا بَعُوضَةً فَمَا فَوْقَهَا...',
    surahInfo: 'Al-baqara · Verse 1-22',
    badgeNumber: null,
  },
  {
    id: 3,
    arabicText: 'أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ وَتَنْسَوْنَ أَنْفُسَكُمْ وَأَنْتُمْ تَتْلُونَ الْك...',
    surahInfo: 'Al-baqara · Verse 1-7',
    badgeNumber: null,
  },
  {
    id: 4,
    arabicText: 'وَإِذِ اسْتَسْقَى مُوسَى لِقَوْمِهِ فَقُلْنَا اضْرِبْ بِعَصَاكَ الْحَجَرَ...',
    surahInfo: 'Al-baqara · Verse 1-7',
    badgeNumber: null,
  },
  {
    id: 5,
    arabicText: 'أَفَتَطْمَعُونَ أَنْ يُؤْمِنُوا لَكُمْ وَقَدْ كَانَ فَرِيقٌ مِنْهُمْ يَسْمَعُو...',
    surahInfo: 'Al-baqara · Verse 1-7',
    badgeNumber: '2',
  },
  {
    id: 6,
    arabicText: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَنْ يَضْرِبَ مَثَلًا مَا بَعُوضَةً فَمَا فَوْقَهَا...',
    surahInfo: 'Al-baqara · Verse 1-22',
    badgeNumber: null,
  },
  {
    id: 7,
    arabicText: 'يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ ۖ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ...',
    surahInfo: 'Al-baqara · Verse 189',
    badgeNumber: null,
  },
  {
    id: 8,
    arabicText: 'لَيْسَ الْبِرَّ أَنْ تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ...',
    surahInfo: 'Al-baqara · Verse 177',
    badgeNumber: '3',
  },
  {
    id: 9,
    arabicText: 'شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ هُدًى لِلنَّاسِ...',
    surahInfo: 'Al-baqara · Verse 185',
    badgeNumber: null,
  },
  {
    id: 10,
    arabicText: 'وَقَاتِلُوا فِي سَبِيلِ اللَّهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا...',
    surahInfo: 'Al-baqara · Verse 190',
    badgeNumber: null,
  },
];

export default function JuzScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-2">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Juz Header Title */}
        <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-100">
          <Text className="text-base font-bold text-gray-900">Juz'u 1</Text>
          <Text className="text-base font-bold text-gray-800 font-serif">الْجُزْءُ الْأَوَّلُ</Text>
        </View>

        <View className="pb-10">
          {JUZ_SECTIONS.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => router.push('/(components)/quran/reader' as any)}
              className="py-4 border-b border-gray-100 flex-row items-center justify-between"
            >
              {/* Left Badge/Icon container */}
              <View className="w-10 items-center justify-center mr-3 relative">
                <MaterialCommunityIcons name="octagram-outline" size={36} color="#D1D5DB" />
                {section.badgeNumber ? (
                  <Text className="absolute text-[10px] font-bold text-gray-600">
                    {section.badgeNumber}
                  </Text>
                ) : null}
              </View>

              {/* Right content: Arabic text excerpt + Surah reference metadata */}
              <View className="flex-1 items-end">
                <Text
                  className="text-base font-serif text-gray-900 text-right mb-1"
                  numberOfLines={1}
                >
                  {section.arabicText}
                </Text>
                <Text className="text-xs text-gray-400 text-right">
                  {section.surahInfo}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}