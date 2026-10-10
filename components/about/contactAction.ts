"use server";

import { Resend } from "resend";
import { createContactSchema, ContactFormValues } from "./validators";

export async function sendContactEmail(data: ContactFormValues) {
  const validation = createContactSchema().safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: "Validation failed. Please check your form input.",
    };
  }

  const { name, email, organization, subject, message } = validation.data;

  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const adminEmail = process.env.ADMIN_EMAIL || "onboarding@resend.dev";
  const appName = process.env.APP_NAME || "Mural";

  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not defined.");
    return {
      success: false,
      error: "Email configuration error. Please try again later.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const emailSubject = subject?.trim()
      ? `[Contact Form] ${subject}`
      : `New Contact Form Message from ${name}`;

    const response = await resend.emails.send({
      from: `${appName} <${emailFrom.trim()}>`,
      to: adminEmail.trim(),
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #171717; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #0b8b99; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #062b56; margin: 0; font-size: 20px;">New Contact Us Submission</h2>
            <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Received via ${appName} website contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Sender Name:</td>
              <td style="padding: 8px 0; color: #062b56; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Sender Email:</td>
              <td style="padding: 8px 0; color: #0b8b99; font-weight: 600;"><a href="mailto:${email}" style="color: #0b8b99; text-decoration: none;">${email}</a></td>
            </tr>
            ${
              organization
                ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Organization:</td>
              <td style="padding: 8px 0; color: #062b56;">${organization}</td>
            </tr>
            `
                : ""
            }
            ${
              subject
                ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td>
              <td style="padding: 8px 0; color: #062b56;">${subject}</td>
            </tr>
            `
                : ""
            }
          </table>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h4 style="color: #062b56; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px;">
            This email was sent automatically from your website's contact form. You can reply directly to this email to contact ${name}.
          </div>
        </div>
      `,
    });

    if (response.error) {
      console.error("Resend send email error:", response.error);
      return {
        success: false,
        error:  "Failed to send email.",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return {
      success: false,
      error: "An error occured",
    };
  }
}
