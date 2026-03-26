import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { NeonButton } from "../../src/components/neon-button";
import { applyToJob, fetchJob, saveJob, type Job, unsaveJob } from "../../src/lib/api";
import { colors, radius } from "../../src/theme/tokens";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    void fetchJob(id).then(setJob);
  }, [id]);

  async function onToggleSave() {
    if (!job) {
      return;
    }
    if (job.isSaved) {
      await unsaveJob(job.id);
    } else {
      await saveJob(job.id);
    }
    setJob({ ...job, isSaved: !job.isSaved });
  }

  async function onApply() {
    if (!job) {
      return;
    }
    await applyToJob(job.id);
    Alert.alert("Applied", "Your application was submitted.");
  }

  if (!job) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.headerCard, { backgroundColor: job.colorHex }]}>
        <Text style={styles.headerRole}>{job.role}</Text>
        <Text style={styles.headerCompany}>{job.company}</Text>
        <Text style={styles.headerMeta}>
          {job.location}  |  {job.experience}  |  {job.employment}
        </Text>
        <Text style={styles.salary}>${job.salaryPerMonth}/mo</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Job Description</Text>
        <Text style={styles.blockText}>{job.description}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Skills & Requirements</Text>
        {job.requirements.map((r) => (
          <Text key={r} style={styles.blockText}>
            - {r}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.save} onPress={() => void onToggleSave()}>
          {job.isSaved ? "Saved" : "Save"}
        </Text>
        <View style={styles.cta}>
          <NeonButton label="Apply Now" onPress={() => void onApply()} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, paddingTop: 66, paddingBottom: 40 },
  headerCard: { borderRadius: radius.lg, padding: 16, marginBottom: 12 },
  headerRole: { color: "#14161A", fontSize: 24, fontWeight: "800" },
  headerCompany: { color: "#23242A", marginTop: 2 },
  headerMeta: { color: "#2C2D32", marginTop: 10, marginBottom: 10 },
  salary: { color: "#14161A", fontWeight: "800", fontSize: 20 },
  block: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginBottom: 10 },
  blockTitle: { color: colors.white, fontSize: 20, fontWeight: "700", marginBottom: 8 },
  blockText: { color: colors.textMuted, lineHeight: 21 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  save: { color: colors.white, fontWeight: "700" },
  cta: { flex: 1, marginLeft: 12 }
});
