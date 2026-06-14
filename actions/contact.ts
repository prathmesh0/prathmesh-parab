"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import type { ContactFormData } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// onboarding@resend.dev can only deliver to the email you verified with Resend.
// Once you add a custom domain, change FROM_EMAIL to "Portfolio <you@yourdomain.com>"
// and set TO_EMAIL back to your personal inbox.
const TO_EMAIL = "prathmeshparab12.o@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

export async function submitContact(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, subject, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px">
        <h2 style="margin:0 0 4px;font-size:22px;color:#a78bfa">New Contact Message</h2>
        <p style="margin:0 0 24px;font-size:13px;color:#6b7280">Via your portfolio contact form</p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#9ca3af;width:80px;font-size:13px">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#9ca3af;font-size:13px">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #1f1f1f">
              <a href="mailto:${email}" style="color:#a78bfa;text-decoration:none">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9ca3af;font-size:13px">Subject</td>
            <td style="padding:10px 0;font-weight:600">${subject}</td>
          </tr>
        </table>

        <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;border-left:3px solid #a78bfa">
          <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Message</p>
          <p style="margin:0;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>

        <p style="margin:24px 0 0;font-size:12px;color:#4b5563;text-align:center">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return { success: false, error: "Failed to send email." };
  }

  return { success: true };
}
