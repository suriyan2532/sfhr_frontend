"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

export async function getBenefits() {
  return [];
}

export async function getBenefitById(_id: string) {
  console.log(_id);
  return null;
}

export async function createBenefit() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function updateBenefit() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function deleteBenefit() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function submitBenefitClaim(_formData: FormData) {
  console.log(_formData);
  return { success: false, error: "Feature temporarily disabled" };
}
