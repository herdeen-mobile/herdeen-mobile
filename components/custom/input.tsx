//components/custom/input.tsx
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
  ...props
}, ref) => {
  return (

      <TextInput
        ref={ref}
        style={style}
        placeholderTextColor="#9CA3AF"
        className={cn(
          'rounded-xl  bg-inputColor px-4 py-3 text-base text-gray-900',
          'focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline',
          className
        )}
        {...props}
      />
  );
});

Input.displayName = 'Input';