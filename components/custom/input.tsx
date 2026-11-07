//components/custom/input.tsx
import { useThemeColors } from '@/src/constants/colors';
import { cn } from '@/src/utils/cn';
import { forwardRef } from 'react';
import {
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  containerClassName,
  className,
  style,
  containerStyle,
  placeholderTextColor,
  ...props
}, ref) => {
  const colors = useThemeColors();

  return (
    <TextInput
      ref={ref}
      style={[{ color: colors.text.primary }, style]}
      placeholderTextColor={placeholderTextColor ?? colors.text.inputText}
      className={cn(
        'rounded-xl bg-inputColor px-4 py-3 text-base',
        'focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
