import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { useAuth } from "../../src/context/auth-context";
import { colors, radius } from "../../src/theme/tokens";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState("Emily Johnson");
  const [email, setEmail] = useState("emily.johnson@gmail.com");
  const [password, setPassword] = useState("123456");

  async function onRegister() {
    try {
      await signUp(name, email, password);
      router.replace("/(app)/find-jobs");
    } catch (_error) {
      Alert.alert("Register failed", "Could not create account.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.textMuted} />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.textMuted}
      />
      <NeonButton label="Register" onPress={onRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, justifyContent: "center" },
  title: { color: colors.white, fontSize: 34, fontWeight: "800", marginBottom: 20 },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    color: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12
  }
});
