import { NextResponse } from "next/server";
import { Resend } from "resend";

const PRIORITIES = ["STANDARD", "ELEVATED", "URGENT", "CLASSIFIED"] as const;
type Priority = (typeof PRIORITIES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_TO = "aak.antriksh@gmail.com";
const DEFAULT_FROM = "Portfolio OS <onboarding@resend.dev>";

interface ContactBody {
  identifier?: unknown;
  message?: unknown;
  priority?: unknown;
}

function isPriority(value: unknown): value is Priority {
  return (
    typeof value === "string" &&
    PRIORITIES.includes(value as Priority)
  );
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const identifier =
    typeof body.identifier === "string" ? body.identifier.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const priority = body.priority;

  if (!identifier || !EMAIL_RE.test(identifier)) {
    return NextResponse.json(
      { ok: false, error: "A valid email identifier is required." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 10 characters." },
      { status: 400 },
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message must be 5000 characters or fewer." },
      { status: 400 },
    );
  }

  if (!isPriority(priority)) {
    return NextResponse.json(
      { ok: false, error: "Invalid priority level." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Transmission channel unavailable." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM;

  const resend = new Resend(apiKey);

  const text = [
    "New transmission received via Portfolio OS.",
    "",
    `Identifier: ${identifier}`,
    `Priority:   ${priority}`,
    "",
    "— Message —",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: identifier,
    subject: `[TRANSMISSION · ${priority}] from ${identifier}`,
    text,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to transmit message. Try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
