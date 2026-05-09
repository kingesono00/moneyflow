import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home-outline',
  transactions: 'swap-horizontal-outline',
  goals: 'trophy-outline',
  'ai-coach': 'sparkles-outline',
  settings: 'settings-outline',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#8EA0B6',
        tabBarStyle: {
          backgroundColor: '#121A21',
          borderTopColor: '#1B2632',
          height: 68,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions' }} />
      <Tabs.Screen name="goals" options={{ title: 'Goals' }} />
      <Tabs.Screen name="ai-coach" options={{ title: 'AI Coach' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
