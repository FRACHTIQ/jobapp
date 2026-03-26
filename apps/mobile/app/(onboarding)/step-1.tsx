import { Link, router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { colors, radius } from "../../src/theme/tokens";

export default function Step1() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>1/3</Text>
      <Text style={styles.title}>Get Started</Text>
      <TextInput style={styles.input} defaultValue="Emily Johnson" placeholder="Your name" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} defaultValue="emily.johnson@gmail.com" placeholder="E-mail" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} secureTextEntry defaultValue="123456789" placeholder="Password" placeholderTextColor={colors.textMuted} />
      <View style={styles.cta}>
        <NeonButton label="Start Searching" onPress={() => router.push("/(onboarding)/step-2")} />
      </View>
      <Link href="/(auth)/login" style={styles.link}>
        I already have an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, justifyContent: "center" },
  step: { color: colors.textMuted, marginBottom: 12 },
  title: { color: colors.white, fontSize: 34, fontWeight: "800", marginBottom: 24 },
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
  cta: { marginTop: 22 },
  link: { color: colors.textMuted, textAlign: "center", marginTop: 18 }
});
