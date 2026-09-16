import { cn } from '@/src/utils/cn';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps,
  type ViewStyle
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ()=>void
}
const variantStyles = {
  primary: 'bg-primary active:bg-blue-700',
  secondary: 'bg-gray-800 active:bg-gray-900',
  outline: 'bg-transparent border border-blue-600 active:bg-blue-50',
};

const variantTextStyles = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-blue-600',
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  className,
  textClassName,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      className={cn(
        'flex-row items-center justify-center h-12.5 rounded-[100px] shadow-sm transition-all',
        variantStyles[variant],
        disabled && 'opacity-50 bg-gray-300',
        className
      )}
      {...props}

    >
      <Text
        style={textStyle}
        className={cn(
          'text-base font-semibold text-center',
          variantTextStyles[variant],
          textClassName
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};