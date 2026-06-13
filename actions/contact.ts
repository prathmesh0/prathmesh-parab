"use server";

import { contactSchema } from "@/lib/schemas/contact";
import type { ContactFormData } from "@/lib/schemas/contact";

export async function submitContact(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  // In production: integrate Resend or EmailJS here
  await new Promise((r) => setTimeout(r, 800));
  console.log("Contact form submitted:", parsed.data);

  return { success: true };
}
