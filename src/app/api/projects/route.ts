import { NextResponse } from "next/server";
import {
  assignCenterToProject,
  createProject,
  getProjectSummaries,
  removeCenterFromProject
} from "@/lib/data";
import { ProjectStatus } from "@prisma/client";

export async function GET() {
  const items = await getProjectSummaries();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "").trim();

  if (action === "assign-center") {
    const projectId = String(body.projectId || "").trim();
    const centerId = String(body.centerId || "").trim();

    if (!projectId || !centerId) {
      return NextResponse.json(
        { ok: false, error: "projectId and centerId are required." },
        { status: 400 }
      );
    }

    const item = await assignCenterToProject({
      projectId,
      centerId
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  }

  const name = String(body.name || "").trim();
  const emailSubject = String(body.emailSubject || "").trim();
  const senderName = String(body.senderName || "").trim();
  const status = String(body.status || "DRAFT").trim() as ProjectStatus;

  if (!name || !emailSubject || !senderName) {
    return NextResponse.json(
      { ok: false, error: "name, emailSubject, and senderName are required." },
      { status: 400 }
    );
  }

  const item = await createProject({
    name,
    emailSubject,
    senderName,
    status
  });

  return NextResponse.json({ ok: true, item }, { status: 201 });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => ({}));
  const projectId = String(body.projectId || "").trim();
  const centerId = String(body.centerId || "").trim();

  if (!projectId || !centerId) {
    return NextResponse.json(
      { ok: false, error: "projectId and centerId are required." },
      { status: 400 }
    );
  }

  const result = await removeCenterFromProject({
    projectId,
    centerId
  });

  return NextResponse.json({ ok: true, item: result });
}
