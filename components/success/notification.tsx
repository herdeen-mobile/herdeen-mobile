import { Button } from '@/components/custom/button';
import { useThemeColors } from '@/src/constants/colors';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Configure notification presentation when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationComponent = () => {
  const router = useRouter();
  const theme = useThemeColors();
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleRequestPermission = async () => {
    if (isRequesting) return;
    setIsRequesting(true);

    try {
      const response = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      console.log('Push notification permission response:', response.status);
    } catch (error) {
      console.warn('Error requesting notification permissions:', error);
    } finally {
      setIsRequesting(false);
      router.replace('/location-permission');
    }
  };

  const handleSkip = () => {
    router.replace('/location-permission');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background.bg }]}>
      <View className="flex-1 justify-center items-center gap-20">
        <Image
          source={require('@/assets/images/bell.png')}
          style={{ width: 222.88, height: 196.189 }}
          resizeMode="contain"
        />
        <View className="justify-center items-center gap-4 px-4">
          <Text
            className="text-center font-poppins text-[32px]"
            style={{ fontWeight: '600', color: theme.text.primary }}
          >
            Stay Updated!
          </Text>
          <Text
            className="text-center text-[16px] font-poppins"
            style={{ color: theme.text.secondary }}
          >
            Enable reminders for prayers, plans, {'\n'} and reflections — at your pace.
          </Text>
        </View>
      </View>

      <View className="mb-6 gap-3">
        <Button
          label={isRequesting ? 'Enabling...' : 'Enable notifications'}
          variant="primary"
          disabled={isRequesting}
          className="rounded-full h-[48px]"
          onPress={handleRequestPermission}
        />

        <Button
          label="Skip this"
          disabled={isRequesting}
          className="rounded-full h-[48px] font-bold bg-transparent"
          textStyle={{ color: theme.text.secondary }}
          onPress={handleSkip}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
