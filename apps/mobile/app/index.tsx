import { Redirect } from "expo-router";
import { useAuth } from "../src/context/auth-context";

export default function Index() {
  const { token, hydrated } = useAuth();
  if (!hydrated) {
    return null;
  }
  return <Redirect href={token ? "/(app)/find-jobs" : "/(onboarding)/step-1"} />;
}
