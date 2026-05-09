import { Text, View } from 'react-native';

interface ScreenPlaceholderProps {
  title: string;
}

export function ScreenPlaceholder({ title }: ScreenPlaceholderProps) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-3xl font-semibold capitalize text-white">{title}</Text>
      <Text className="mt-3 text-center text-base text-muted">
        Phase 2 scaffold ready. This screen will be implemented in next phases.
      </Text>
    </View>
  );
}
