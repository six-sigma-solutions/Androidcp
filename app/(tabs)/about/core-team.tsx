import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function CoreTeamRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to home page
    router.replace("/home");
  }, [router]);
  return null;
}
