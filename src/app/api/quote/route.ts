import { NextResponse } from "next/server";

const ALLOWED_EXT = new Set([".stl", ".step", ".stp", ".obj", ".3mf"]);
const MAX_FILE_BYTES = 50 * 1024 * 1024;

function fileExt(name: string) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Expected multipart form data" },
        { status: 400 },
      );
    }

    const form = await req.formData();
    const objective = String(form.get("objective") ?? "");
    const material = String(form.get("material") ?? "");
    const toleranceNotes = String(form.get("toleranceNotes") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();

    if (name.length < 2 || !/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Valid name and email are required" },
        { status: 400 },
      );
    }

    const files = form
      .getAll("files")
      .filter((v): v is File => v instanceof File);
    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one CAD file is required" },
        { status: 400 },
      );
    }

    for (const f of files) {
      if (!ALLOWED_EXT.has(fileExt(f.name))) {
        return NextResponse.json(
          { error: `Unsupported file type: ${f.name}` },
          { status: 400 },
        );
      }
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `File too large: ${f.name}` },
          { status: 400 },
        );
      }
    }

    // Production: replace with email provider, S3, or CRM webhook.
    console.info("[LayerForge quote intake]", {
      objective,
      material,
      toleranceNotes,
      name,
      email,
      phone,
      notes,
      files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    });

    return NextResponse.json({
      ok: true,
      message: "Quote request recorded. We will follow up manually.",
    });
  } catch (e) {
    console.error("[quote intake] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
