import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { submitContactInquiry } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Zod Validation (validates name, email, subject, message, and checks honeypot)
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = result.data;

    // 2. Anti-spam honeypot verification
    if (honeypot && honeypot.length > 0) {
      // Quietly ignore bot submissions
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 3. Extract client IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 4. Save to database
    const dbResult = await submitContactInquiry({
      name,
      email,
      subject,
      message,
      ip_address: ip,
    });

    if (!dbResult.success) {
      return NextResponse.json(
        { error: dbResult.error || "Failed to record message." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error handling contact request." },
      { status: 500 }
    );
  }
}
