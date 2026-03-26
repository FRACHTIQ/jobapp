import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { colors, radius } from "../../src/theme/tokens";

export default function Step3() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>3/3</Text>
      <Text style={styles.title}>Resume & Portfolio</Text>
      <View style={styles.uploadCard}>
        <Text style={styles.uploadText}>37% Uploading</Text>
      </View>
      <NeonButton label="Save" onPress={() => router.replace("/(auth)/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, justifyContent: "center" },
  step: { color: colors.textMuted, marginBottom: 12 },
  title: { color: colors.white, fontSize: 34, fontWeight: "800", marginBottom: 22 },
  uploadCard: {
    borderWidth: 1,
    borderColor: colors.neon,
    borderStyle: "dashed",
    borderRadius: radius.lg,
    padding: 36,
    alignItems: "center",
    marginBottom: 30
  },
  uploadText: { color: colors.neon, fontWeight: "700", fontSize: 20 }
});
