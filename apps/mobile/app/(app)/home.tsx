import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { TagChip } from "../../src/components/tag-chip";
import { colors } from "../../src/theme/tokens";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your search for the next dream job is over</Text>
      <NeonButton label="Start Searching" onPress={() => router.push("/(app)/find-jobs")} />
      <View style={styles.row}>
        <TagChip label="Airbnb" bg="#FF6B73" />
        <TagChip label="Meta" />
        <TagChip label="Tesla" bg="#F44356" />
        <TagChip label="Apple" />
        <TagChip label="Google" />
        <TagChip label="LinkedIn" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 22, paddingTop: 70 },
  title: { color: colors.white, fontSize: 44, fontWeight: "800", lineHeight: 52, marginBottom: 28 },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 24 }
});
