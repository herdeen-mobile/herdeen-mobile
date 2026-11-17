// src/app/(components)/edit-profile.tsx
import { Button } from '../../../components/custom/button';
import { Input } from '../../../components/custom/input';
import { useAuth } from '@/src/context/auth-context';
import { useUpdateProfileMutation } from '@/src/hooks/use-profile';
import { getErrorMessage } from '@/src/utils/error-handler';
import { editProfileSchema } from '@/src/validation/profile-schemas';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditProfileComponent() {
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfileMutation();

  // Form states initialized with live authenticated user data or empty string
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    setFormErrors({});

    const validationResult = editProfileSchema.safeParse({
      firstName,
      lastName,
      email,
    });

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    try {
      await updateProfile(validationResult.data);
      Alert.alert('Profile Updated', 'Your profile details have been saved successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Update Failed', getErrorMessage(error));
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Scrollable Container */}
      <ScrollView
        className="flex-1 px-6 pt-12 pb-12"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Top Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center mr-4 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Edit Profile</Text>
        </View>

        {/* 2. Avatar with Camera Badge */}
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-purple-200 items-center justify-center overflow-hidden border-2 border-purple-300 shadow-sm">
              <Image
                source={require('../../../assets/images/avatar.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Change Photo', 'Photo upload feature coming soon.')}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center shadow-xs active:opacity-80"
            >
              <Feather name="camera" size={14} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Form Input Fields */}
        <View className="gap-5 mb-10">
          <View>
            <Text className="text-xs font-semibold text-gray-700 mb-1.5">First name</Text>
            <Input
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (formErrors.firstName) {
                  setFormErrors((prev) => ({ ...prev, firstName: '' }));
                }
              }}
              placeholder="Enter first name"
            />
            {formErrors.firstName ? (
              <Text className="text-xs text-red-500 mt-1 font-medium">{formErrors.firstName}</Text>
            ) : null}
          </View>

          <View>
            <Text className="text-xs font-semibold text-gray-700 mb-1.5">Last name</Text>
            <Input
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (formErrors.lastName) {
                  setFormErrors((prev) => ({ ...prev, lastName: '' }));
                }
              }}
              placeholder="Enter last name"
            />
            {formErrors.lastName ? (
              <Text className="text-xs text-red-500 mt-1 font-medium">{formErrors.lastName}</Text>
            ) : null}
          </View>

          <View>
            <Text className="text-xs font-semibold text-gray-700 mb-1.5">Email</Text>
            <Input
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (formErrors.email) {
                  setFormErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter email"
            />
            {formErrors.email ? (
              <Text className="text-xs text-red-500 mt-1 font-medium">{formErrors.email}</Text>
            ) : null}
          </View>
        </View>

        {/* 4. Save Changes Button */}
        <Button
          label={
            isSaving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              'Save changes'
            )
          }
          variant="primary"
          onPress={handleSaveChanges}
          disabled={isSaving}
          className="bg-primary active:opacity-90 rounded-full h-12"
          textClassName="text-white font-bold"
        />
      </ScrollView>
    </View>
  );
}
