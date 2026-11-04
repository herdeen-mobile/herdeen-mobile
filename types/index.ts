import { StyleProp, TextStyle } from "react-native";

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
  isIconShow?: boolean;
  style?: StyleProp<TextStyle>;
}
