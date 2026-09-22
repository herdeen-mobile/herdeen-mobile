//components/custom/input.tsx
import { cn } from '@/src/utils/cn';
import { forwardRef } from 'react';
import {
    Text,
    TextInput,
    View,
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
  ...props
}, ref) => {
  return (
    <View style={containerStyle} className={cn('w-full flex-col gap-1.5', containerClassName)}>
    
      <TextInput
        ref={ref}
        style={style}
        placeholderTextColor="#9CA3AF"
        className={cn(
          'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900',
          'focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />

      {error && (
        <Text className="text-xs text-red-500 font-medium mt-0.5">
          {error}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';