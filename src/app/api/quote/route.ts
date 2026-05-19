import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | Record<string, string>
      | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const printType = (body.printType ?? "").trim();
    const material = (body.material ?? "").trim();
    const quantity = (body.quantity ?? "").trim();
    const sizeEstimate = (body.sizeEstimate ?? "").trim();
    const color = (body.color ?? "").trim();
    const strength = (body.strength ?? "").trim();
    const deadline = (body.deadline ?? "").trim();
    const message = (body.message ?? "").trim();

    if (name.length < 2 || !/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Valid name and email are required" },
        { status: 400 },
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_TO_EMAIL;
    const fromEmail = process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev";
    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Phone / WhatsApp", phone || "—"],
      ["Print type", printType || "—"],
      ["Material", material || "—"],
      ["Quantity", quantity || "—"],
      ["Size estimate", sizeEstimate || "—"],
      ["Color preference", color || "—"],
      ["Strength requirement", strength || "—"],
      ["Deadline", deadline || "—"],
    ];

    const htmlRows = rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;font-weight:600;width:180px;">${escapeHtml(
            k,
          )}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${escapeHtml(
            v,
          )}</td></tr>`,
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;color:#111;">
        <h2 style="margin:0 0 12px;">New quote request — The Print Patel</h2>
        <table style="border-collapse:collapse;width:100%;max-width:640px;">${htmlRows}</table>
        <h3 style="margin:18px 0 6px;">Message</h3>
        <p style="white-space:pre-wrap;line-height:1.5;">${escapeHtml(message)}</p>
      </div>
    `;

    const text = [
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      `Message:`,
      message,
    ].join("\n");

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: `The Print Patel <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Quote request — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[quote intake] resend error", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      message: "Thanks — your quote request has been sent.",
    });
  } catch (e) {
    console.error("[quote intake] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
