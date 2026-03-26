import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="job/[id]" />
      </Stack>
    </AuthProvider>
  );
}
