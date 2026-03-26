import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Job } from "../lib/api";
import { colors, radius } from "../theme/tokens";

type JobCardProps = {
  job: Job;
  onPress: (id: string) => void;
};

export function JobCard({ job, onPress }: JobCardProps) {
  return (
    <Pressable style={[styles.card, { borderColor: job.colorHex }]} onPress={() => onPress(job.id)}>
      <View style={[styles.head, { backgroundColor: job.colorHex }]}>
        <Text style={styles.role}>{job.role}</Text>
        <Text style={styles.company}>{job.company}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.meta}>
          {job.location}  |  {job.experience}  |  {job.employment}
        </Text>
        <Text style={styles.salary}>${job.salaryPerMonth}/mo</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    backgroundColor: colors.card,
    overflow: "hidden",
    marginBottom: 12
  },
  head: {
    padding: 12
  },
  role: {
    fontSize: 17,
    fontWeight: "700",
    color: "#121318"
  },
  company: {
    marginTop: 2,
    color: "#2A2B30",
    fontWeight: "600"
  },
  body: {
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12
  },
  salary: {
    color: colors.white,
    fontWeight: "700",
    marginTop: 6
  }
});
