// src/app/home.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // State for live time clock updates
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time string to HH:MM:SS or HH:MM
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Format calendar date dynamically (e.g., "Tuesday, 22nd September")
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);

  // Array of Adhkar / Duas that rotate automatically every 2 seconds
  const duasList = [
    {
      arabic: 'اللهم إنك عفو تحب العفو فاعف عني',
      transliteration: 'Allahuma innaka afuwun tuhibul afuwa, fahfu ani.',
      translation: 'O Allah, You are Forgiving and love forgiveness, so forgive me.',
    },
    {
      arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',
      transliteration: 'Rabbi awzi’ni an ashkura ni’mataka allati an’amta ‘alayya.',
      translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me.',
    },
    {
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ‘adhaban-nar.',
      translation: 'Our Lord, give us in this world that which is good and in the hereafter that which is good, and protect us from the punishment of the Fire.',
    },
    {
      arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
      transliteration: 'Ya Muqallibal-quluwbi thabbit qalbi ‘ala dinik.',
      translation: 'O Turner of the hearts, make my heart firm upon Your religion.',
    },
    {
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      transliteration: 'Rabbishrah li sadri wa yassir li amri.',
      translation: 'My Lord, expand for me my chest [with assurance] and ease for me my task.',
    },
  ];

  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);

  // Auto-advance Dua index every 2 seconds
  useEffect(() => {
    const duaTimer = setInterval(() => {
      setCurrentDuaIndex((prevIndex) => (prevIndex + 1) % duasList.length);
    }, 2000);
    return () => clearInterval(duaTimer);
  }, [duasList.length]);

  // State for task completion toggles
  const [tasks, setTasks] = useState([
    { id: 1, title: 'pray 5 times', completed: true },
    { id: 2, title: 'Read Surah Yaseen', completed: true },
    { id: 3, title: 'Take a 5-min dhikr break', completed: false },
    { id: 4, title: 'Write a reflection', completed: false },
    { id: 5, title: 'Complete your daily plan', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const activeDua = duasList[currentDuaIndex];

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView className="flex-1 px-5 pt-12 pb-8">

        {/* 1. Header: Greeting & Avatar */}
        <View className="flex-row justify-between items-center mb-6">
          {/* Clicking the avatar container opens the menu overlay file */}
          <TouchableOpacity
            onPress={() => router.push('/menu-overlay')}
            className="flex-row items-center gap-3 active:opacity-80"
          >
            {/* Replaced initial letter 'A' with png image from assets/images */}
            <View className="w-12 h-12 rounded-full bg-purple-200 items-center justify-center overflow-hidden border border-purple-300">
              <Image
                source={require('../../assets/images/avatar.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="text-xs text-gray-400 font-medium">Assalamu Alaikum,</Text>
              <Text className="text-xl font-bold text-gray-900">Aishah!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 shadow-sm relative">
            <Feather name="bell" size={20} color="#374151" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </TouchableOpacity>
        </View>

        {/* 2. Prayer Countdown Gradient Card (Using Real Date & Time) */}
        <View className="rounded-3xl p-5 mb-6 shadow-sm bg-purple-500">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xs text-white/80 mb-0.5">17 Ramadan 1446 AH</Text>
              <Text className="text-lg font-bold text-white">{formattedDate}</Text>
            </View>
            {/* Real-time updating clock */}
            <Text className="text-3xl font-bold text-white tracking-tight">{formattedTime}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-white/20 rounded-full px-4 py-2">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs text-white">☀️ Now Dhuhr time</Text>
              <Ionicons name="information-circle-outline" size={14} color="white" />
            </View>
            <View className="bg-white rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-gray-800">3 Min to Asr Prayer</Text>
            </View>
          </View>
        </View>

        {/* 3. Quick Navigation Category Icons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row gap-4">
            {[
              { label: 'Solah', icon: <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#1F2937" /> },
              { label: 'Adhkar', icon: <MaterialCommunityIcons name="hands-pray" size={24} color="#1F2937" /> },
              { label: 'Quran', icon: <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="#1F2937" /> },
              { label: 'Tasbih', icon: <MaterialCommunityIcons name="vector-radius" size={24} color="#1F2937" /> },
              { label: 'Qibla', icon: <Ionicons name="compass-outline" size={24} color="#1F2937" /> },
            ].map((item, index) => (
              <TouchableOpacity key={index} className="items-center">
                <View className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center mb-1.5 shadow-xs">
                  {item.icon}
                </View>
                <Text className="text-xs font-medium text-gray-700">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 4. Auto-Scrolling Adhkar / Dua of the Day Card (Switches every 2 seconds) */}
        <View className="bg-[#FFF4ED] border border-[#FDE3D3] rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-gray-900">Dua of the Day</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Ionicons name="star-outline" size={14} color="#4B5563" />
              <Text className="text-xs font-semibold text-gray-600">All Duas</Text>
              <Ionicons name="chevron-forward" size={14} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <Text className="text-right text-xl font-serif text-gray-900 mb-2">
            {activeDua.arabic}
          </Text>
          <Text className="text-xs text-gray-500 mb-1.5">
            {activeDua.transliteration}
          </Text>
          <Text className="text-xs text-gray-800 font-medium mb-4">
            {activeDua.translation}
          </Text>

          {/* Dynamic Pagination Indicators */}
          <View className="flex-row justify-center items-center gap-1.5">
            {duasList.map((_, idx) => (
              <View
                key={idx}
                className={`rounded-full transition-all ${
                  currentDuaIndex === idx ? 'w-3 h-2.5 bg-gray-700' : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>

        {/* 5. Today's Tasks Section */}
        <View className="mb-20">
          <Text className="text-base font-bold text-gray-900 mb-3">Today’s Tasks</Text>
          <View className="gap-2.5">
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                onPress={() => toggleTask(task.id)}
                className={`flex-row justify-between items-center p-4 rounded-2xl border ${
                  task.completed ? 'bg-gray-50/70 border-gray-100 opacity-60' : 'bg-white border-gray-100 shadow-xs'
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <Text className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </Text>
                </View>
                {task.completed ? (
                  <Ionicons name="checkmark" size={16} color="#6B7280" />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Action Bar Fixed Inside home.tsx */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-100 pt-3 pb-6 px-4 shadow-lg">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={22} color="#D946EF" />
          <Text className="text-[10px] font-semibold text-fuchsia-600 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="document-text-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="calendar-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">Planner</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="water-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">My Cycle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}