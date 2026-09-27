import { Resend } from "resend";
import type { ContactInput } from "./contact.validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMessage = async (data: ContactInput) => {
  const { name, email, subject, message } = data;

  const { data: result, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kamranbb29@gmail.com",
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <h2>New Portfolio Contact</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <h3>Message</h3>
      <p>${message}</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return result;
};
