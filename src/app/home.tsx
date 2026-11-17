// src/app/home.tsx
import { useAuth } from '@/src/context/auth-context';
import { useDailyContentQuery } from '@/src/hooks/use-daily-content';
import { useDailyPlanQuery, useToggleTaskCompletedMutation } from '@/src/hooks/use-planner';
import { usePrayerTimesQuery } from '@/src/hooks/use-prayer';
import { useTodayTrackerQuery, useTogglePrayerMutation } from '@/src/hooks/use-tracker';
import {
  formatPrayerTime12Hour,
  formatRemainingTime,
  getHijriDateString,
  timeToMinutes,
} from '@/src/utils/time-utils';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface HomeTask {
  id: string | number;
  taskId?: string;
  title: string;
  time?: string;
  completed: boolean;
  isTracker?: boolean;
  prayerKey?: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
}

interface DuaItem {
  title?: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

// Fallback spiritual duas that rotate automatically
const DEFAULT_DUAS: DuaItem[] = [
  {
    title: 'Dua of the Day',
    arabic: 'اللهم إنك عفو تحب العفو فاعف عني',
    transliteration: 'Allahuma innaka afuwun tuhibul afuwa, fahfu ani.',
    translation: 'O Allah, You are Forgiving and love forgiveness, so forgive me.',
  },
  {
    title: 'Dua of the Day',
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',
    transliteration: 'Rabbi awzi’ni an ashkura ni’mataka allati an’amta ‘alayya.',
    translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me.',
  },
  {
    title: 'Dua of the Day',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ‘adhaban-nar.',
    translation: 'Our Lord, give us in this world that which is good and in the hereafter that which is good, and protect us from the punishment of the Fire.',
  },
  {
    title: 'Dua of the Day',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    transliteration: 'Ya Muqallibal-quluwbi thabbit qalbi ‘ala dinik.',
    translation: 'O Turner of the hearts, make my heart firm upon Your religion.',
  },
  {
    title: 'Dua of the Day',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: 'Rabbishrah li sadri wa yassir li amri.',
    translation: 'My Lord, expand for me my chest [with assurance] and ease for me my task.',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // 1. Live real-time clock updating every second
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const todayStr = currentTime.toISOString().split('T')[0];

  // 2. Fetch API Data: Prayer Times, Daily Content, Today's Plan, and Today's Tracker
  const { data: prayerData } = usePrayerTimesQuery();
  const { data: dailyContentData } = useDailyContentQuery();
  const { data: planData, isLoading: isPlanLoading } = useDailyPlanQuery(todayStr);
  const { data: trackerData } = useTodayTrackerQuery();

  const { mutate: toggleCompletedApi } = useToggleTaskCompletedMutation();
  const { mutate: togglePrayerApi } = useTogglePrayerMutation();

  // 3. Dynamic Prayer Times & Countdown Calculation
  const prayerTimes = prayerData?.payload?.prayers;
  const prayerCalc = useMemo(() => {
    const fajrTime = prayerTimes?.fajr || '05:25 AM';
    const sunriseTime = prayerTimes?.sunrise || '06:37 AM';
    const dhuhrTime = prayerTimes?.dhuhr || '12:40 PM';
    const asrTime = prayerTimes?.asr || '04:02 PM';
    const maghribTime = prayerTimes?.maghrib || '06:40 PM';
    const ishaTime = prayerTimes?.isha || '07:49 PM';

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const fajrMins = timeToMinutes(fajrTime);
    const sunriseMins = timeToMinutes(sunriseTime);
    const dhuhrMins = timeToMinutes(dhuhrTime);
    const asrMins = timeToMinutes(asrTime);
    const maghribMins = timeToMinutes(maghribTime);
    const ishaMins = timeToMinutes(ishaTime);

    let currentPrayerName = 'Isha';
    let currentPrayerIcon = '🌙';
    let nextPrayerName = 'Fajr';
    let minutesToNext = 0;

    if (currentMinutes < fajrMins) {
      currentPrayerName = 'Isha';
      currentPrayerIcon = '🌙';
      nextPrayerName = 'Fajr';
      minutesToNext = fajrMins - currentMinutes;
    } else if (currentMinutes < sunriseMins) {
      currentPrayerName = 'Fajr';
      currentPrayerIcon = '☀️';
      nextPrayerName = 'Sunrise';
      minutesToNext = sunriseMins - currentMinutes;
    } else if (currentMinutes < dhuhrMins) {
      currentPrayerName = 'Sunrise';
      currentPrayerIcon = '🌅';
      nextPrayerName = 'Dhuhr';
      minutesToNext = dhuhrMins - currentMinutes;
    } else if (currentMinutes < asrMins) {
      currentPrayerName = 'Dhuhr';
      currentPrayerIcon = '☀️';
      nextPrayerName = 'Asr';
      minutesToNext = asrMins - currentMinutes;
    } else if (currentMinutes < maghribMins) {
      currentPrayerName = 'Asr';
      currentPrayerIcon = '🌤️';
      nextPrayerName = 'Maghrib';
      minutesToNext = maghribMins - currentMinutes;
    } else if (currentMinutes < ishaMins) {
      currentPrayerName = 'Maghrib';
      currentPrayerIcon = '🌇';
      nextPrayerName = 'Isha';
      minutesToNext = ishaMins - currentMinutes;
    } else {
      currentPrayerName = 'Isha';
      currentPrayerIcon = '🌙';
      nextPrayerName = 'Fajr';
      minutesToNext = 1440 - currentMinutes + fajrMins;
    }

    // Hijri date calculation
    let hijri = '17 Ramadan 1446 AH';
    try {
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      hijri = `${formatter.format(currentTime)} AH`;
    } catch {
      hijri = '17 Ramadan 1446 AH';
    }

    return {
      currentPrayerName,
      currentPrayerIcon,
      nextPrayerName,
      minutesToNext: Math.max(0, minutesToNext),
      hijri,
    };
  }, [currentTime, prayerTimes]);

  // 4. Daily Content & Dua Carousel
  const combinedDuasList = useMemo<DuaItem[]>(() => {
    const serverItem = dailyContentData?.payload?.contents;
    if (serverItem?.content) {
      const formattedServerItem: DuaItem = {
        title: serverItem.title || 'Reflection of the Day',
        arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
        transliteration: serverItem.source || 'HerDeen Daily Reflection',
        translation: serverItem.content,
      };
      return [formattedServerItem, ...DEFAULT_DUAS];
    }
    return DEFAULT_DUAS;
  }, [dailyContentData]);

  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);

  useEffect(() => {
    if (combinedDuasList.length === 0) return;
    const duaTimer = setInterval(() => {
      setCurrentDuaIndex((prev) => (prev + 1) % combinedDuasList.length);
    }, 4000);
    return () => clearInterval(duaTimer);
  }, [combinedDuasList.length]);

  const activeDua = combinedDuasList[currentDuaIndex] || DEFAULT_DUAS[0];

  // 5. Today's Tasks
  const [tasks, setTasks] = useState<HomeTask[]>([
    { id: 'fajr', title: 'pray Fajr', completed: false, isTracker: true, prayerKey: 'fajr' },
    { id: 'quran', title: 'Read Surah / Quran', completed: false },
    { id: 'dhikr', title: 'Take a 5-min dhikr break', completed: false },
    { id: 'reflection', title: 'Write a reflection', completed: false },
    { id: 'plan', title: 'Complete your daily plan', completed: false },
  ]);

  useEffect(() => {
    const raw = planData?.payload || planData?.data;
    const generatedTasks = raw?.generatedPlan || raw?.tasks;

    if (Array.isArray(generatedTasks) && generatedTasks.length > 0) {
      setTasks(
        generatedTasks.map((t: any, idx: number) => ({
          id: t._id || t.taskId || t.id || `task-${idx}`,
          taskId: t._id || t.taskId || t.id,
          title: t.title || t.name || 'Spiritual task',
          time: t.time,
          completed: Boolean(t.completed || t.isCompleted),
        }))
      );
    } else if (trackerData?.payload?.tracker) {
      const tracker = trackerData.payload.tracker;
      setTasks([
        {
          id: 'fajr',
          title: 'Fajr Prayer',
          completed: Boolean(tracker.salah?.fajr),
          isTracker: true,
          prayerKey: 'fajr',
        },
        {
          id: 'dhuhr',
          title: 'Dhuhr Prayer',
          completed: Boolean(tracker.salah?.dhuhr),
          isTracker: true,
          prayerKey: 'dhuhr',
        },
        {
          id: 'asr',
          title: 'Asr Prayer',
          completed: Boolean(tracker.salah?.asr),
          isTracker: true,
          prayerKey: 'asr',
        },
        {
          id: 'maghrib',
          title: 'Maghrib Prayer',
          completed: Boolean(tracker.salah?.maghrib),
          isTracker: true,
          prayerKey: 'maghrib',
        },
        {
          id: 'isha',
          title: 'Isha Prayer',
          completed: Boolean(tracker.salah?.isha),
          isTracker: true,
          prayerKey: 'isha',
        },
        {
          id: 'quran',
          title: `Quran Recitation (${tracker.quran?.pagesRead || 0} pages)`,
          completed: (tracker.quran?.pagesRead || 0) > 0,
        },
        {
          id: 'adhkaar',
          title: 'Morning & Evening Adhkar',
          completed: Boolean(tracker.adhkaar),
        },
      ]);
    }
  }, [planData, trackerData]);

  const toggleTask = (id: string | number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;

          // If task originates from generatedPlan, call planner API
          if (t.taskId && nextCompleted) {
            toggleCompletedApi({ date: todayStr, task: t.taskId });
          }

          // If task originates from prayer tracker, sync with tracker API
          if (t.isTracker && t.prayerKey) {
            togglePrayerApi({ prayer: t.prayerKey, completed: nextCompleted });
          }

          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView className="flex-1 px-5 pt-12 pb-8" showsVerticalScrollIndicator={false}>
        {/* 1. Header: Greeting & Avatar */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.push('/profile' as any)}
              activeOpacity={0.8}
              className="w-12 h-12 rounded-full bg-purple-200 items-center justify-center overflow-hidden border border-purple-300"
            >
              <Image
                source={require('../../assets/images/avatar.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/menu-overlay' as any)}
              activeOpacity={0.8}
            >
              <Text className="text-xs text-gray-400 font-medium">Assalamu Alaikum,</Text>
              <Text className="text-xl font-bold text-gray-900">
                {user?.firstName ? `${user.firstName}!` : 'Sister!'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(components)/notifications' as any)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100 shadow-sm relative active:opacity-75"
          >
            <Feather name="bell" size={20} color="#374151" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </TouchableOpacity>
        </View>

        {/* 2. Prayer Countdown Gradient Card (Using Real Backend API & Real-time Clock) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(components)/solah' as any)}
          className="rounded-3xl p-5 mb-6 shadow-sm bg-purple-500"
        >
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xs text-white/80 mb-0.5">{prayerCalc.hijri}</Text>
              <Text className="text-lg font-bold text-white">{formattedDate}</Text>
            </View>
            <Text className="text-3xl font-bold text-white tracking-tight">{formattedTime}</Text>
          </View>

          <View className="flex-row justify-between items-center bg-white/20 rounded-full px-4 py-2">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs text-white">
                {prayerCalc.currentPrayerIcon} Now {prayerCalc.currentPrayerName} time
              </Text>
              <Ionicons name="information-circle-outline" size={14} color="white" />
            </View>
            <View className="bg-white rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-gray-800">
                {formatRemainingTime(prayerCalc.minutesToNext)} to {prayerCalc.nextPrayerName} Prayer
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 3. Quick Navigation Category Icons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row gap-4">
            {[
              {
                label: 'Solah',
                icon: <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#1F2937" />,
                route: '/(components)/solah',
              },
              {
                label: 'Adhkar',
                icon: <MaterialCommunityIcons name="hands-pray" size={24} color="#1F2937" />,
                route: '/(components)/adhkar',
              },
              {
                label: 'Quran',
                icon: (
                  <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="#1F2937" />
                ),
                route: '/(components)/quran',
              },
              {
                label: 'Tasbih',
                icon: <MaterialCommunityIcons name="vector-radius" size={24} color="#1F2937" />,
                route: '/(components)/tasbih',
              },
              {
                label: 'Qibla',
                icon: <Ionicons name="compass-outline" size={24} color="#1F2937" />,
                route: '/(components)/qibla',
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.route as any)}
                className="items-center active:opacity-75"
              >
                <View className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center mb-1.5 shadow-xs">
                  {item.icon}
                </View>
                <Text className="text-xs font-medium text-gray-700">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 4. Daily Content & Reflection / Dua of the Day Card */}
        <View className="bg-[#FFF4ED] border border-[#FDE3D3] rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-gray-900">
              {activeDua.title || 'Dua of the Day'}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(components)/adhkar' as any)}
              className="flex-row items-center gap-1"
            >
              <Ionicons name="star-outline" size={14} color="#4B5563" />
              <Text className="text-xs font-semibold text-gray-600">All Duas</Text>
              <Ionicons name="chevron-forward" size={14} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <Text className="text-right text-xl font-serif text-gray-900 mb-2 leading-8">
            {activeDua.arabic}
          </Text>
          <Text className="text-xs text-gray-500 mb-1.5">{activeDua.transliteration}</Text>
          <Text className="text-xs text-gray-800 font-medium mb-4 leading-5">{activeDua.translation}</Text>

          {/* Pagination Indicators */}
          <View className="flex-row justify-center items-center gap-1.5">
            {combinedDuasList.map((_, idx) => (
              <View
                key={idx}
                className={`rounded-full transition-all ${
                  currentDuaIndex === idx ? 'w-3 h-2 bg-gray-700' : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>

        {/* 5. Today's Tasks Section */}
        <View className="mb-24">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-bold text-gray-900">Today’s Tasks</Text>
            {isPlanLoading && <ActivityIndicator size="small" color="#D946EF" />}
          </View>

          <View className="gap-2.5">
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                onPress={() => toggleTask(task.id)}
                className={`flex-row justify-between items-center p-4 rounded-2xl border ${
                  task.completed
                    ? 'bg-gray-50/70 border-gray-100 opacity-60'
                    : 'bg-white border-gray-100 shadow-xs'
                }`}
              >
                <View className="flex-row items-center gap-3 flex-1 pr-2">
                  <View
                    className={`w-2 h-2 rounded-full ${task.completed ? 'bg-gray-300' : 'bg-fuchsia-500'}`}
                  />
                  <View className="flex-1">
                    <Text
                      className={`text-sm font-medium ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </Text>
                    {task.time ? (
                      <Text className="text-[11px] text-gray-400 mt-0.5">{task.time}</Text>
                    ) : null}
                  </View>
                </View>

                {task.completed ? (
                  <View className="w-6 h-6 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200">
                    <Ionicons name="checkmark" size={16} color="#059669" />
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-300" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 6. Fixed Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white border-t border-gray-100 pt-3 pb-6 px-4 shadow-lg">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={22} color="#D946EF" />
          <Text className="text-[10px] font-semibold text-fuchsia-600 mt-1">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(components)/prayer-reminders' as any)}
          className="items-center active:opacity-75"
        >
          <Ionicons name="document-text-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(components)/daily-preferences' as any)}
          className="items-center active:opacity-75"
        >
          <Ionicons name="calendar-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">Planner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/cycle' as any)}
          className="items-center active:opacity-75"
        >
          <Ionicons name="water-outline" size={22} color="#9CA3AF" />
          <Text className="text-[10px] font-medium text-gray-400 mt-1">My Cycle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
