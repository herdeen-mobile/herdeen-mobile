import OnboardingFormOne from '@/components/onboarding/onboarding-form-one';
import OnboardingFormTwo from '@/components/onboarding/onboarding-form-two';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingformScreen = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      {step === 0 ? (
        <OnboardingFormOne onNext={() => setStep(1)} />
      ) : (
        <OnboardingFormTwo />
      )}
    </SafeAreaView>
  );
};

export default OnboardingformScreen;

const styles = StyleSheet.create({});
