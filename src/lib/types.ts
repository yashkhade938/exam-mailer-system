export type ProjectStatus = "DRAFT" | "ACTIVE" | "CLOSED";

export type DispatchStatus = "PENDING" | "SENT" | "FAILED" | "CANCELLED";

export type Center = {
  id: string;
  name: string;
  email: string;
  contactName?: string;
  phone?: string;
  projectCount?: number;
};

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  subject: string;
  senderName: string;
  centers: number;
  sections: number;
  assignedCenters?: Array<{
    id: string;
    name: string;
    email: string;
  }>;
};

export type ScheduleSection = {
  id: string;
  title: string;
  dateLabel?: string;
  rows: number;
  centersCovered: number;
};

export type DispatchLog = {
  id: string;
  projectName: string;
  centerName: string;
  recipient: string;
  status: DispatchStatus;
  sentAt: string;
  errorMessage?: string;
};

export type DashboardSummary = {
  totalProjects: number;
  activeCenters: number;
  scheduledSections: number;
  failedDispatches: number;
};