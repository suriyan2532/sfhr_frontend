// TODO: Migrate to API
// This page has been temporarily disabled to remove Prisma dependency

import { redirect } from "next/navigation";

export default async function LeavesPage() {
  // Redirect to dashboard until this page is migrated
  redirect("/dashboard");
}
