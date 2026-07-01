import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown:false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'início',
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: 'ver solicitações',
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'nova solicitação',
        }}
      />
    </Tabs>
  ); 
}