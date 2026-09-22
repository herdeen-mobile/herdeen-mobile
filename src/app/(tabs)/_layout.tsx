// // src/app/(tabs)/_layout.tsx
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import CycleSettingsComponent from '../(components)/cycle-settings'
//
// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#ffffff',
//           borderTopColor: '#F3F4F6',
//           borderTopWidth: 1,
//           paddingTop: 8,
//           paddingBottom: 20,
//           height: 64,
//         },
//         tabBarActiveTintColor: '#D946EF', // Fuchsia/Pink color for active tab
//         tabBarInactiveTintColor: '#9CA3AF', // Gray for inactive tabs
//         tabBarLabelStyle: {
//           fontSize: 10,
//           fontWeight: '500',
//           marginTop: 2,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={22} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="tracker"
//         options={{
//           title: 'Tracker',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="document-text-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="planner"
//         options={{
//           title: 'Planner',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="cycle"
//         options={{
//           title: 'My Cycle',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="water-outline" size={22} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 20,
          height: 64,
        },
        tabBarActiveTintColor: '#D946EF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cycle"
        options={{
          title: 'My Cycle',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="water-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}