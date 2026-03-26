import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { TagChip } from "../../src/components/tag-chip";
import { colors } from "../../src/theme/tokens";

export default function Step2() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>2/3</Text>
      <Text style={styles.title}>What type of job are you searching for?</Text>
      <View style={styles.row}>
        {["Product Manager", "HR Manager", "General Manager", "Project Manager", "Sales Manager", "Operations Manager"].map((t) => (
          <TagChip key={t} label={t} />
        ))}
      </View>
      <NeonButton label="Start Searching" onPress={() => router.push("/(onboarding)/step-3")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, justifyContent: "center" },
  step: { color: colors.textMuted, marginBottom: 12 },
  title: { color: colors.white, fontSize: 31, fontWeight: "800", marginBottom: 22 },
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 28 }
});
