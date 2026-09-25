// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { SURAHS } from './surah'; // Import the master list of Surahs
//
// interface FavoritesScreenProps {
//   favorites?: number[]; // Array of favorited surah IDs
//   onToggleFavorite?: (id: number) => void;
//   onSelect?: (surah: typeof SURAHS[0]) => void;
// }
//
// export default function FavoritesScreen({
//   favorites = [1], // Fallback or passed props from parent state
//   onToggleFavorite,
//   onSelect
// }: FavoritesScreenProps) {
//   const router = useRouter();
//
//   // Filter the master SURAHS list based on real favorite IDs
//   const favoriteSurahs = SURAHS.filter((s) => favorites.includes(s.id));
//
//   return (
//     <View className="flex-1 bg-white pt-2">
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {favoriteSurahs.length === 0 ? (
//           <View className="items-center justify-center py-24">
//             <Ionicons name="heart-dislike-outline" size={64} color="#D8B4FE" />
//             <Text className="text-base font-semibold text-gray-400 mt-4">No favorites yet!</Text>
//             <Text className="text-xs text-gray-400 mt-1 text-center px-6">
//               Tap the star icon on any Surah to add it to your favorites.
//             </Text>
//           </View>
//         ) : (
//           <View className="pb-10">
//             {favoriteSurahs.map((surah) => (
//               <TouchableOpacity
//                 key={surah.id}
//                 onPress={() => {
//                   if (onSelect) {
//                     onSelect(surah);
//                   } else {
//                     router.push('/(components)/quran/reader' as any);
//                   }
//                 }}
//                 className="py-4 border-b border-gray-100 flex-row items-center justify-between"
//               >
//                 <View className="flex-row items-center gap-4">
//                   {/* Toggle favorite button */}
//                   <TouchableOpacity
//                     onPress={() => onToggleFavorite && onToggleFavorite(surah.id)}
//                     className="p-1"
//                   >
//                     <Ionicons name="star" size={22} color="#9333EA" />
//                   </TouchableOpacity>
//                   <View>
//                     <Text className="text-base font-bold text-gray-900">{surah.name}</Text>
//                     <Text className="text-xs text-gray-400">
//                       {surah.verses} verses • {surah.type}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text className="text-sm font-semibold text-purple-700 font-serif">{surah.arabic}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }


import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SURAHS } from './surah';

interface FavoritesScreenProps {
  favorites?: number[]; // Array of favorited surah IDs (defaults to empty)
  onToggleFavorite?: (id: number) => void;
  onSelect?: (surah: typeof SURAHS[0]) => void;
}

export default function FavoritesScreen({
  favorites = [], // البدء بقائمة فارغة تماماً حتى يقوم المستخدم بالإضافة من قارئ السور
  onToggleFavorite,
  onSelect
}: FavoritesScreenProps) {
  const router = useRouter();

  // تصفية قائمة السور بناءً على المعرفات المفضلة فعلياً
  const favoriteSurahs = SURAHS.filter((s) => favorites.includes(s.id));

  return (
    <View className="flex-1 bg-white pt-2">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {favoriteSurahs.length === 0 ? (
          <View className="items-center justify-center py-20 px-6">
            {/* عرض الصورة التجريدية الفارغة من المسار المطلوب */}
            <Image
              source={require('../../../../assets/images/empty.png')}
              className="w-48 h-48 mb-4"
              resizeMode="contain"
            />
            <Text className="text-base font-semibold text-gray-400 mt-2">No favorites yet!</Text>
          </View>
        ) : (
          <View className="pb-10">
            {favoriteSurahs.map((surah) => (
              <TouchableOpacity
                key={surah.id}
                onPress={() => {
                  if (onSelect) {
                    onSelect(surah);
                  } else {
                    router.push('/(components)/quran/reader' as any);
                  }
                }}
                className="py-4 border-b border-gray-100 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4">
                  {/* زر إزالة/تعديل المفضلة */}
                  <TouchableOpacity
                    onPress={() => onToggleFavorite && onToggleFavorite(surah.id)}
                    className="p-1"
                  >
                    <Ionicons name="star" size={22} color="#9333EA" />
                  </TouchableOpacity>
                  <View>
                    <Text className="text-base font-bold text-gray-900">{surah.name}</Text>
                    <Text className="text-xs text-gray-400">
                      {surah.verses} verses • {surah.type}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-semibold text-purple-700 font-serif">{surah.arabic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}