import { useState } from "react";
import { contactApi } from "@/api/contact";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ContactInput } from "@/types/api";
import { ApiError } from "@/api/client";

interface ContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleChange =
    (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined });
      }
      if (errors.general) {
        setErrors({ ...errors, general: undefined });
      }
    };

  const validate = (): ContactErrors => {
    const errs: ContactErrors = {};
    if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters long";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email address";
    }
    if (formData.subject.trim().length < 2) {
      errs.subject = "Subject must be at least 2 characters long";
    }
    if (formData.subject.length > 200) {
      errs.subject = "Subject is too long";
    }
    if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    if (formData.message.length > 5000) {
      errs.message = "Message is too long";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await contactApi.submit(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      if (err instanceof ApiError) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: "Failed to send message. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
          <p className="text-[#999]">
            Have a question or want to work together? Send me a message.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-matrix-500/10 border border-matrix-500/30 rounded-lg">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-matrix-400 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-matrix-300">
                Your message has been sent successfully! I'll get back to you
                soon.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-0">
          <Input
            label="Name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
          />

          <Input
            label="Subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange("subject")}
            error={errors.subject}
          />

          <TextArea
            label="Message"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange("message")}
            error={errors.message}
            rows={6}
          />

          {errors.general && (
            <div className="mb-4">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            variant={submitStatus === "success" ? "secondary" : "primary"}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Badge variant="secondary">
            Form validation: Name (2+), Email, Subject (2+, 200 max), Message (10+, 5000 max)
          </Badge>
        </div>
      </div>
    </div>
  );
}
