import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../theme/tokens";

type NeonButtonProps = {
  label: string;
  onPress: () => void;
};

export function NeonButton({ label, onPress }: NeonButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}  {"->"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neon,
    borderRadius: radius.pill,
    paddingHorizontal: 22,
    paddingVertical: 14,
    shadowColor: colors.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 10,
    alignItems: "center"
  },
  label: {
    color: "#111217",
    fontWeight: "700",
    fontSize: 16
  }
});
