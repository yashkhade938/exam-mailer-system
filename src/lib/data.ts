import type {
  Center as CenterSummary,
  DashboardSummary,
  DispatchLog,
  Project as ProjectSummary,
  ScheduleSection
} from "@/lib/types";
import { prisma } from "@/lib/prisma";

let seedPromise: Promise<void> | null = null;

async function seedDefaultData() {
  const [projectCount, centerCount, assignmentCount] = await Promise.all([
    prisma.project.count(),
    prisma.center.count(),
    prisma.projectCenter.count()
  ]);

  if (centerCount === 0) {
    await prisma.center.createMany({
      data: [
        {
          name: "Pune Main Center",
          email: "pune.center@example.com",
          contactName: "Ritesh Patil",
          phone: "+91-90000-11111"
        },
        {
          name: "Nashik City Center",
          email: "nashik.center@example.com",
          contactName: "Asha More",
          phone: "+91-90000-22222"
        },
        {
          name: "Kolhapur Regional Center",
          email: "kolhapur.center@example.com",
          contactName: "Nilesh Mane",
          phone: "+91-90000-33333"
        }
      ]
    });
  }

  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          name: "Forest Recruitment 2026",
          status: "ACTIVE",
          emailSubject: "Center-wise Schedule - Forest Recruitment 2026",
          senderName: "WeShine Operations",
          headerSubtitle: "Recruitment schedule dispatch and center communication"
        },
        {
          name: "State Technical Exam",
          status: "DRAFT",
          emailSubject: "Schedule Dispatch - State Technical Exam",
          senderName: "Exam Control Team",
          headerSubtitle: "Technical exam planning workspace"
        }
      ]
    });
  }

  if (assignmentCount === 0) {
    const [projects, centers] = await Promise.all([
      prisma.project.findMany({
        orderBy: [{ createdAt: "asc" }]
      }),
      prisma.center.findMany({
        orderBy: [{ createdAt: "asc" }]
      })
    ]);

    if (projects[0] && centers[0]) {
      await prisma.projectCenter.createMany({
        data: [
          {
            projectId: projects[0].id,
            centerId: centers[0].id
          },
          ...(projects[0] && centers[1]
            ? [
                {
                  projectId: projects[0].id,
                  centerId: centers[1].id
                }
              ]
            : []),
          ...(projects[1] && centers[2]
            ? [
                {
                  projectId: projects[1].id,
                  centerId: centers[2].id
                }
              ]
            : [])
        ]
      });
    }
  }
}

export async function ensureAppData() {
  if (!seedPromise) {
    seedPromise = seedDefaultData().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }

  await seedPromise;
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  await ensureAppData();

  const projects = await prisma.project.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: {
      centers: {
        include: {
          center: true
        }
      },
      sections: true
    }
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    status: project.status,
    subject: project.emailSubject,
    senderName: project.senderName,
    centers: project.centers.length,
    sections: project.sections.length,
    assignedCenters: project.centers.map((assignment) => ({
      id: assignment.center.id,
      name: assignment.center.name,
      email: assignment.center.email
    }))
  }));
}

export async function getCenterSummaries(): Promise<CenterSummary[]> {
  await ensureAppData();

  const centers = await prisma.center.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: {
      projects: true
    }
  });

  return centers.map((center) => ({
    id: center.id,
    name: center.name,
    email: center.email,
    contactName: center.contactName ?? undefined,
    phone: center.phone ?? undefined,
    projectCount: center.projects.length
  }));
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await ensureAppData();

  const [totalProjects, activeCenters, scheduledSections, failedDispatches] =
    await Promise.all([
      prisma.project.count(),
      prisma.center.count(),
      prisma.scheduleSection.count(),
      prisma.dispatchLog.count({
        where: {
          status: "FAILED"
        }
      })
    ]);

  return {
    totalProjects,
    activeCenters,
    scheduledSections,
    failedDispatches
  };
}

export async function getSchedulePreview(): Promise<ScheduleSection[]> {
  await ensureAppData();

  const sections = await prisma.scheduleSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      rows: true
    },
    take: 4
  });

  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    dateLabel: section.dateLabel ?? undefined,
    rows: section.rows.length,
    centersCovered: 0
  }));
}

export async function getDispatchLogPreview(): Promise<DispatchLog[]> {
  await ensureAppData();

  const logs = await prisma.dispatchLog.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: {
      center: true,
      job: {
        include: {
          project: true
        }
      }
    },
    take: 3
  });

  return logs.map((log) => ({
    id: log.id,
    projectName: log.job.project.name,
    centerName: log.center.name,
    recipient: log.recipient,
    status: log.status,
    sentAt: log.sentAt
      ? log.sentAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : "Queued",
    errorMessage: log.errorMessage ?? undefined
  }));
}

export async function createProject(input: {
  name: string;
  status: string;
  emailSubject: string;
  senderName: string;
}) {
  await ensureAppData();

  return prisma.project.create({
    data: {
      name: input.name,
      status: input.status,
      emailSubject: input.emailSubject,
      senderName: input.senderName
    }
  });
}

export async function createCenter(input: {
  name: string;
  email: string;
  contactName?: string;
  phone?: string;
}) {
  await ensureAppData();

  return prisma.center.create({
    data: {
      name: input.name,
      email: input.email,
      contactName: input.contactName || null,
      phone: input.phone || null
    }
  });
}

export async function assignCenterToProject(input: {
  projectId: string;
  centerId: string;
}) {
  await ensureAppData();

  if (!input.projectId || !input.centerId) {
    return null;
  }

  return prisma.projectCenter.upsert({
    where: {
      projectId_centerId: {
        projectId: input.projectId,
        centerId: input.centerId
      }
    },
    update: {},
    create: {
      projectId: input.projectId,
      centerId: input.centerId
    }
  });
}

export async function removeCenterFromProject(input: {
  projectId: string;
  centerId: string;
}) {
  await ensureAppData();

  if (!input.projectId || !input.centerId) {
    return null;
  }

  return prisma.projectCenter.deleteMany({
    where: {
      projectId: input.projectId,
      centerId: input.centerId
    }
  });
}