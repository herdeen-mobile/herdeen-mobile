// //src/app/(components)/quran/index.tsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
//
// // Import your dedicated sub-pages/components
// import SurahList from './surah';
// import JuzList from './juz';
// import FavoritesList from './favorites';
//
// export default function QuranScreen() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<'Surah' | 'Juz' | 'Favorite'>('Surah');
//   const [favorites, setFavorites] = useState<number[]>([1]); // Default favorite Surah id 1
//
//   const toggleFavorite = (id: number) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };
//
//   return (
//     <View className="flex-1 bg-white pt-12">
//       {/* Header */}
//       <View className="px-5 flex-row items-center justify-between mb-6">
//         <View className="flex-row items-center gap-4">
//           <TouchableOpacity
//             onPress={() => router.back()}
//             className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
//           >
//             <Ionicons name="arrow-back" size={20} color="#1F2937" />
//           </TouchableOpacity>
//           <Text className="text-2xl font-bold text-gray-900">Quran</Text>
//         </View>
//
//         <TouchableOpacity
//           onPress={() => router.push('/(components)/quran/search' as any)}
//           className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
//         >
//           <Ionicons name="search" size={20} color="#1F2937" />
//         </TouchableOpacity>
//       </View>
//
//       {/* Tabs Switcher */}
//       <View className="px-5 mb-6">
//         <View className="flex-row bg-gray-100/80 p-1 rounded-full">
//           {(['Surah', 'Juz', 'Favorite'] as const).map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               onPress={() => setActiveTab(tab)}
//               className={`flex-1 py-2.5 rounded-full items-center justify-center ${
//                 activeTab === tab ? 'bg-white shadow-sm' : 'bg-transparent'
//               }`}
//             >
//               <Text
//                 className={`text-sm font-semibold ${
//                   activeTab === tab ? 'text-gray-900' : 'text-gray-500'
//                 }`}
//               >
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//
//       <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
//         {/* Banner with #C572E3 background and subtle open Quran vector in background */}
//         {activeTab !== 'Favorite' && (
//           <View
//             className="rounded-[28px] p-6 mb-6 relative overflow-hidden flex-row justify-between items-center shadow-sm"
//             style={{ backgroundColor: '#C572E3' }}
//           >
//             {/* Background Quran vector illustration watermark */}
//             <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
//               <Ionicons name="book" size={110} color="#FFFFFF" />
//             </View>
//
//             <View className="z-10">
//               <Text className="text-xs font-semibold text-white mb-1">Last Read</Text>
//               <Text className="text-xl font-bold text-white mb-1">Al-Faatiha</Text>
//               <Text className="text-xs text-white/90 font-medium">Ayah No: 12</Text>
//             </View>
//           </View>
//         )}
//
//         {/* Dynamic Tab Content rendering your imported external files */}
//         {activeTab === 'Surah' && (
//           <SurahList onSelect={() => router.push('/(components)/quran/reader' as any)} />
//         )}
//
//         {activeTab === 'Juz' && <JuzList />}
//
//         {activeTab === 'Favorite' && (
//           <FavoritesList
//             favorites={favorites}
//             onToggleFavorite={toggleFavorite}
//             onSelect={() => router.push('/(components)/quran/reader' as any)}
//           />
//         )}
//       </ScrollView>
//     </View>
//   );
// }



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import your dedicated sub-pages/components
import SurahList from './surah';
import JuzList from './juz';
import FavoritesList from './favorites';

export default function QuranScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Surah' | 'Juz' | 'Favorite'>('Surah');
  const [favorites, setFavorites] = useState<number[]>([]); // Default empty matching requirements

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-5 flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Quran</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(components)/quran/search' as any)}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
        >
          <Ionicons name="search" size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Tabs Switcher */}
      <View className="px-5 mb-6">
        <View className="flex-row bg-gray-100/80 p-1 rounded-full">
          {(['Surah', 'Juz', 'Favorite'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                  isActive ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Banner with #C572E3 background and subtle open Quran vector in background */}
        {activeTab !== 'Favorite' && (
          <View
            className="rounded-[28px] p-6 mb-6 relative overflow-hidden flex-row justify-between items-center shadow-sm"
            style={{ backgroundColor: '#C572E3' }}
          >
            {/* Background Quran vector illustration watermark */}
            <View className="absolute right-[-10] bottom-[-15] opacity-20 pointer-events-none">
              <Ionicons name="book" size={110} color="#FFFFFF" />
            </View>

            <View className="z-10">
              <Text className="text-xs font-semibold text-white mb-1">Last Read</Text>
              <Text className="text-xl font-bold text-white mb-1">Al-Faatiha</Text>
              <Text className="text-xs text-white/90 font-medium">Ayah No: 12</Text>
            </View>
          </View>
        )}

        {/* Dynamic Tab Content rendering your imported external files with explicit keys */}
        {activeTab === 'Surah' && (
          <SurahList key="surah-list" onSelect={() => router.push('/(components)/quran/reader' as any)} />
        )}

        {activeTab === 'Juz' && <JuzList key="juz-list" />}

        {activeTab === 'Favorite' && (
          <FavoritesList
            key="favorites-list"
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={() => router.push('/(components)/quran/reader' as any)}
          />
        )}
      </ScrollView>
    </View>
  );
}