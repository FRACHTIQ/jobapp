import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { useAuth } from "../../src/context/auth-context";
import { colors, radius } from "../../src/theme/tokens";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("emily.johnson@gmail.com");
  const [password, setPassword] = useState("123456");

  async function onLogin() {
    try {
      await signIn(email, password);
      router.replace("/(app)/find-jobs");
    } catch (_error) {
      Alert.alert("Login failed", "Please check your credentials.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Recognition</Text>
      <Text style={styles.sub}>Authentication through facial recognition style login.</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor={colors.textMuted} />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.textMuted}
      />
      <View style={styles.cta}>
        <NeonButton label="Allow" onPress={onLogin} />
      </View>
      <Link href="/(auth)/register" style={styles.link}>
        Create account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, justifyContent: "center" },
  title: { color: colors.white, fontSize: 34, fontWeight: "800", marginBottom: 10 },
  sub: { color: colors.textMuted, marginBottom: 24 },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    color: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12
  },
  cta: { marginTop: 8 },
  link: { color: colors.textMuted, textAlign: "center", marginTop: 16 }
});
