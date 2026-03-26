import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { JobCard } from "../../src/components/job-card";
import { TagChip } from "../../src/components/tag-chip";
import { fetchJobs, type Job } from "../../src/lib/api";
import { colors, radius } from "../../src/theme/tokens";

export default function FindJobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchJobs()
      .then((result) => setJobs(result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.hello}>Hello Tom</Text>
      <Text style={styles.title}>Find Jobs</Text>
      <View style={styles.tabs}>
        <TagChip label="Discover" bg={colors.neon} />
        <TagChip label="Saved" />
        <TagChip label="Applied" />
        <TagChip label="Closed" />
      </View>
      <TextInput style={styles.search} placeholder="Search for company or roles..." placeholderTextColor={colors.textMuted} />
      {loading ? (
        <ActivityIndicator color={colors.neon} />
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} onPress={(id) => router.push(`/job/${id}`)} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, paddingTop: 66 },
  hello: { color: colors.textMuted, marginBottom: 5 },
  title: { color: colors.white, fontSize: 36, fontWeight: "800", marginBottom: 15 },
  tabs: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  search: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.white,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 12
  }
});
