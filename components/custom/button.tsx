//src/components/custom/button.tsx
import { cn } from '@/src/utils/cn';
import React, { ReactNode } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps,
  type ViewStyle
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  label: ReactNode |  string;
  variant?: 'primary' | 'secondary' | 'outline' | 'none';
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ()=>void
  icon?: string
}
const variantStyles = {
  primary: 'active:bg-inputColor',
  secondary: 'bg-border-stroke',
  outline: 'border-[1px] border-carouselIndicatorOutline',
  none: ''
};

const variantTextStyles = {
  primary: 'text-white',
  secondary: 'text-subheaderColor',
  outline: 'text-subheaderColor',
  none: ''
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  className,
  textClassName,
  style,
  textStyle,
  disabled,
  icon,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      className={cn(
        'flex-row items-center justify-center h-12.5 transition-all',
        variantStyles[variant],
        disabled && 'opacity-50 bg-gray-300',
        className
      )}
      {...props}

    >
      {icon && <Image source={{ uri: icon }} />}
      <Text
        style={textStyle}
        className={cn(
          'text-base font-semibold text-center font-poppins text-[16px]',
          variantTextStyles[variant],
          textClassName
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};