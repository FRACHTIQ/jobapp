import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme/tokens";

type TagChipProps = {
  label: string;
  bg?: string;
};

export function TagChip({ label, bg }: TagChipProps) {
  return (
    <View style={[styles.chip, bg ? { backgroundColor: bg } : null]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.cardSoft,
    marginRight: 8,
    marginBottom: 8
  },
  text: {
    color: colors.text,
    fontWeight: "600"
  }
});
