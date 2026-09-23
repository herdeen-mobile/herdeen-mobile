// // src/app/settings.tsx
// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
//
// export default function SettingsScreen() {
//   const router = useRouter();
//
//   return (
//     <View className="flex-1 bg-background">
//       {/* Scrollable Container */}
//       <ScrollView className="flex-1 px-6 pt-12 pb-12">
//
//         {/* 1. Top Header Navigation */}
//         <View className="flex-row items-center mb-6">
//           <TouchableOpacity
//             onPress={() => router.back()}
//             className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
//           >
//             <Ionicons name="arrow-back" size={20} color="#374151" />
//           </TouchableOpacity>
//           <Text className="text-lg font-bold text-foreground">Settings</Text>
//         </View>
//
//         {/* 2. Avatar & Name Header */}
//         <View className="items-center mb-8">
//           <View className="w-20 h-20 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-primary mb-2.5 shadow-sm">
//             <Image
//               source={require('../../assets/images/avatar.png')}
//               className="w-full h-full"
//               resizeMode="cover"
//             />
//           </View>
//           <Text className="text-xs text-muted-foreground font-medium mb-0.5">Asalam alaikum</Text>
//           <Text className="text-xl font-bold text-foreground">Aishah Abdullahi</Text>
//         </View>
//
//         {/* 3. Settings Links Group 1 */}
//         <View className="gap-1 mb-4">
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/edit-profile' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="user" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Edit Profile</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/personalization' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <MaterialCommunityIcons name="vector-radius" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Personalization</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/account-security' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="lock" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Account & Security</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>
//
//         {/* Divider */}
//         <View className="h-[1px] bg-border mb-4" />
//
//         {/* 4. Settings Links Group 2 */}
//         <View className="gap-1 mb-4">
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/notifications' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="bell" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Notifications</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/appearance' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="moon" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Appearance</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/language' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="globe" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Language</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>
//
//         {/* Divider */}
//         <View className="h-[1px] bg-border mb-4" />
//
//         {/* 5. Settings Links Group 3 */}
//         <View className="gap-1 mb-4">
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/support' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="headphones" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Support</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             onPress={() => router.push('/(components)/rate-us' as any)}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="star" size={20} color="#374151" />
//               <Text className="text-sm font-semibold text-foreground">Rate US</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>
//
//         {/* Divider */}
//         <View className="h-[1px] bg-border mb-4" />
//
//         {/* 6. Log Out Button */}
//         <View className="mb-8">
//           <TouchableOpacity
//             onPress={() => {
//               // Handle log out logic here
//               router.replace('/login' as any);
//             }}
//             className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
//           >
//             <View className="flex-row items-center gap-3.5">
//               <Feather name="log-out" size={20} color="#EF4444" />
//               <Text className="text-sm font-semibold text-red-500">Log Out</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={18} color="#FCA5A5" />
//           </TouchableOpacity>
//         </View>
//
//       </ScrollView>
//     </View>
//   );
// }


// src/app/settings.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import the Logout Modal component from your components/modal folder
import LogoutModal from './(components)/modals/logout';

export default function SettingsScreen() {
  const router = useRouter();

  // State to control the visibility of the "Rate Us" bottom sheet modal
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);

  // State to control the visibility of the "Logout" bottom sheet modal
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // Handler to open the app store link or handle store redirection
  const handleRateOnStore = () => {
    console.log('Redirecting to Google Play / App Store...');
    // Add Linking.openURL('your-store-url') here if needed
    setIsRateModalVisible(false);
  };

  // Handler for confirmed logout action
  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    // Redirect user to the login screen
    router.replace('/login' as any);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Scrollable Container */}
      <ScrollView className="flex-1 px-6 pt-12 pb-12" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 1. Top Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center mr-4"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">Settings</Text>
        </View>

        {/* 2. Avatar & Name Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-primary mb-2.5 shadow-sm">
            <Image
              source={require('../../assets/images/avatar.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xs text-muted-foreground font-medium mb-0.5">Asalam alaikum</Text>
          <Text className="text-xl font-bold text-foreground">Aishah Abdullahi</Text>
        </View>

        {/* 3. Settings Links Group 1 */}
        <View className="gap-1 mb-4">
          <TouchableOpacity
            onPress={() => router.push('/(components)/edit-profile' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="user" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/personalization' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <MaterialCommunityIcons name="vector-radius" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Personalization</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/account-security' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="lock" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Account & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-border mb-4" />

        {/* 4. Settings Links Group 2 */}
        <View className="gap-1 mb-4">
          <TouchableOpacity
            onPress={() => router.push('/(components)/notifications' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="bell" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/appearance' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="moon" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Appearance</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(components)/language' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="globe" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-border mb-4" />

        {/* 5. Settings Links Group 3 */}
        <View className="gap-1 mb-4">
          <TouchableOpacity
            onPress={() => router.push('/(components)/support' as any)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="headphones" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Rate US triggers the modal instead of routing to a page */}
          <TouchableOpacity
            onPress={() => setIsRateModalVisible(true)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="star" size={20} color="#374151" />
              <Text className="text-sm font-semibold text-foreground">Rate US</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-border mb-4" />

        {/* 6. Log Out Button (Now triggers the Logout Modal) */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={() => setIsLogoutModalVisible(true)}
            className="flex-row justify-between items-center py-3.5 px-2 rounded-xl active:bg-accent"
          >
            <View className="flex-row items-center gap-3.5">
              <Feather name="log-out" size={20} color="#EF4444" />
              <Text className="text-sm font-semibold text-red-500">Log Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#FCA5A5" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* --- Rate Us Bottom Sheet Modal --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isRateModalVisible}
        onRequestClose={() => setIsRateModalVisible(false)}
      >
        {/* Backdrop */}
        <View className="flex-1 bg-black/50 justify-end">
          {/* Modal Card Box */}
          <View className="bg-card rounded-t-[32px] p-6 pb-12 border-t border-border shadow-2xl">

            {/* Close Button Header */}
            <View className="flex-row justify-end mb-2">
              <TouchableOpacity onPress={() => setIsRateModalVisible(false)} className="p-1">
                <Ionicons name="close" size={22} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Decorative Icon Container */}
            <View className="items-center mb-6">
              <View className="w-24 h-24 rounded-full bg-secondary items-center justify-center border border-border">
                <Ionicons name="repeat-outline" size={36} color="#EF4444" />
              </View>
            </View>

            {/* Title & Description */}
            <Text className="text-xl font-bold text-foreground text-center mb-2">
              Rate HerDeen
            </Text>
            <Text className="text-xs text-muted-foreground text-center px-6 mb-8 leading-relaxed">
              If you love using HerDeen, please take a moment to rate us on the store!
            </Text>

            {/* Action Buttons */}
            <View className="gap-3">
              <TouchableOpacity
                onPress={handleRateOnStore}
                className="bg-primary active:opacity-90 rounded-full py-4 items-center justify-center shadow-sm"
              >
                <Text className="text-white font-bold text-base">Rate on Google Play</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsRateModalVisible(false)}
                className="py-3 items-center justify-center active:opacity-70"
              >
                <Text className="text-sm font-semibold text-foreground">Do this later</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* --- Logout Modal Component --- */}
      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}
        onConfirmLogout={handleConfirmLogout}
      />
    </View>
  );
}