import { Button } from '@/components/custom/button';
import { useThemeColors } from '@/src/constants/colors';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../modal/modal';

const LocationComponent = () => {
  const router = useRouter();
  const theme = useThemeColors();
  const [visible, setVisible] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleRequestLocation = async () => {
    if (isRequesting) return;
    setIsRequesting(true);

    try {
      const response = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission response:', response.status);

      if (response.status === 'granted') {
        // Silently fetch current position in background to seed location cache
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }).catch((err) => {
          console.warn('Background position seed warning:', err);
        });
      }
    } catch (error) {
      console.warn('Error requesting location permissions:', error);
    } finally {
      setIsRequesting(false);
      setVisible(true);
    }
  };

  const handleSkipLocation = () => {
    setVisible(true);
  };

  const handleJoinCommunity = async () => {
    try {
      const communityUrl = 'https://chat.whatsapp.com/invite/herdeen';
      const canOpen = await Linking.canOpenURL(communityUrl);
      if (canOpen) {
        await Linking.openURL(communityUrl);
      } else {
        await Linking.openURL('https://wa.me/2340000000000');
      }
    } catch (err) {
      console.warn('Error opening community link:', err);
    } finally {
      setVisible(false);
      router.replace('/home');
    }
  };

  const handleFinishOnboarding = () => {
    setVisible(false);
    router.replace('/home');
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background.bg }]}>
        <View className="flex-1 justify-center items-center gap-20">
          <Image
            source={require('@/assets/images/location.png')}
            style={{ width: 222.88, height: 196.189 }}
            resizeMode="contain"
          />
          <View className="justify-center items-center gap-4 px-4">
            <Text
              className="text-center font-poppins text-[32px]"
              style={{ fontWeight: '600', color: theme.text.primary }}
            >
              Grant location
            </Text>
            <Text
              className="text-center text-[16px] font-poppins"
              style={{ color: theme.text.secondary }}
            >
              We use your location to show accurate {'\n'} prayer times and Qiblah direction.
            </Text>
          </View>
        </View>

        <View className="mb-6 gap-3">
          <Button
            label={isRequesting ? 'Requesting...' : 'Allow location access'}
            variant="primary"
            disabled={isRequesting}
            className="rounded-full h-[48px]"
            onPress={handleRequestLocation}
          />

          <Button
            label="Skip this"
            disabled={isRequesting}
            className="rounded-full h-[48px] font-bold bg-transparent"
            textStyle={{ color: theme.text.secondary }}
            onPress={handleSkipLocation}
          />
        </View>
      </SafeAreaView>

      <CustomModal visible={visible} animationType="slide">
        <SafeAreaView style={[styles.modalSafeArea, { backgroundColor: theme.background.bg }]}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              onPress={handleFinishOnboarding}
            >
              <Image
                source={require('@/assets/images/close.png')}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center items-center gap-20">
            <Image
              source={require('@/assets/images/community.png')}
              style={{ width: 250, height: 223.33 }}
              resizeMode="contain"
            />
            <View className="justify-center items-center gap-4 px-4">
              <Text
                className="text-center font-poppins text-[32px]"
                style={{ fontWeight: '600', color: theme.text.primary }}
              >
                Join Her {'\n'}Community
              </Text>
              <Text
                className="text-center text-[16px] font-poppins"
                style={{ color: theme.text.secondary }}
              >
                Join a circle of Muslimah sisters learning, {'\n'}planning, and growing — together.
              </Text>
            </View>
          </View>

          <View className="mb-6 gap-3">
            <Button
              label="Join Community"
              variant="primary"
              className="rounded-full h-[48px]"
              onPress={handleJoinCommunity}
            />

            <Button
              label="Skip this"
              className="rounded-full h-[48px] font-bold bg-transparent"
              textStyle={{ color: theme.text.secondary }}
              onPress={handleFinishOnboarding}
            />
          </View>
        </SafeAreaView>
      </CustomModal>
    </>
  );
};

export default LocationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalSafeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
