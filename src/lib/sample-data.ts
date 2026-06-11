import type {
  Center,
  DashboardSummary,
  DispatchLog,
  Project,
  ScheduleSection
} from "@/lib/types";

export const dashboardSummary: DashboardSummary = {
  totalProjects: 6,
  activeCenters: 42,
  scheduledSections: 28,
  failedDispatches: 3
};

export const projects: Project[] = [
  {
    id: "proj_1",
    name: "Forest Recruitment 2026",
    status: "ACTIVE",
    subject: "Center-wise Schedule - Forest Recruitment 2026",
    senderName: "WeShine Operations",
    centers: 12,
    sections: 5
  },
  {
    id: "proj_2",
    name: "State Technical Exam",
    status: "DRAFT",
    subject: "Schedule Dispatch - State Technical Exam",
    senderName: "Exam Control Team",
    centers: 8,
    sections: 4
  },
  {
    id: "proj_3",
    name: "Education Board Assessment",
    status: "CLOSED",
    subject: "Assessment Schedule Summary",
    senderName: "Education Admin",
    centers: 22,
    sections: 7
  }
];

export const centers: Center[] = [
  {
    id: "ctr_1",
    name: "Pune Main Center",
    email: "pune.center@example.com",
    contactName: "Ritesh Patil",
    phone: "+91-90000-11111"
  },
  {
    id: "ctr_2",
    name: "Nashik City Center",
    email: "nashik.center@example.com",
    contactName: "Asha More",
    phone: "+91-90000-22222"
  },
  {
    id: "ctr_3",
    name: "Kolhapur Regional Center",
    email: "kolhapur.center@example.com",
    contactName: "Nilesh Mane",
    phone: "+91-90000-33333"
  }
];

export const scheduleSections: ScheduleSection[] = [
  {
    id: "sec_1",
    title: "Pre-Schedule",
    rows: 5,
    centersCovered: 12
  },
  {
    id: "sec_2",
    title: "Day 1 Reporting",
    dateLabel: "16 May 2026",
    rows: 9,
    centersCovered: 12
  },
  {
    id: "sec_3",
    title: "Day 2 Reporting",
    dateLabel: "17 May 2026",
    rows: 8,
    centersCovered: 12
  },
  {
    id: "sec_4",
    title: "Overall Summary",
    rows: 2,
    centersCovered: 12
  }
];

export const dispatchLogs: DispatchLog[] = [
  {
    id: "log_1",
    projectName: "Forest Recruitment 2026",
    centerName: "Pune Main Center",
    recipient: "pune.center@example.com",
    status: "SENT",
    sentAt: "2026-06-08 09:30 IST"
  },
  {
    id: "log_2",
    projectName: "Forest Recruitment 2026",
    centerName: "Nashik City Center",
    recipient: "nashik.center@example.com",
    status: "FAILED",
    sentAt: "2026-06-08 09:31 IST",
    errorMessage: "SMTP connection timeout"
  },
  {
    id: "log_3",
    projectName: "State Technical Exam",
    centerName: "Kolhapur Regional Center",
    recipient: "kolhapur.center@example.com",
    status: "PENDING",
    sentAt: "Queued for 2026-06-08 17:00 IST"
  }
];
