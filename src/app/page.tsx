import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import {
  getDashboardSummary,
  getDispatchLogPreview,
  getProjectSummaries,
  getSchedulePreview
} from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [dashboardSummary, dispatchLogs, projects, scheduleSections] = await Promise.all([
    getDashboardSummary(),
    getDispatchLogPreview(),
    getProjectSummaries(),
    getSchedulePreview()
  ]);

  return (
    <>
      <PageHeader
        title="Operations Dashboard"
        description="Monitor project readiness, center coverage, section counts, and dispatch health from one place."
        actions={
          <>
            <button className="btn primary">Create Project</button>
            <button className="btn secondary">Run Dispatch</button>
          </>
        }
      />

      <div className="grid cards-4">
        <MetricCard label="Total Projects" value={dashboardSummary.totalProjects} tone="blue" />
        <MetricCard label="Active Centers" value={dashboardSummary.activeCenters} tone="green" />
        <MetricCard label="Schedule Sections" value={dashboardSummary.scheduledSections} tone="orange" />
        <MetricCard label="Failed Dispatches" value={dashboardSummary.failedDispatches} tone="red" />
      </div>

      <div className="grid split-2" style={{ marginTop: 20 }}>
        <div className="card">
          <h3>Current Project Snapshot</h3>
          <p>Track how the current active projects are configured before connecting a real database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Centers</th>
                <th>Sections</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <strong>{project.name}</strong>
                    <div className="meta">{project.subject}</div>
                  </td>
                  <td>
                    <span className={`pill ${project.status === "ACTIVE" ? "green" : project.status === "DRAFT" ? "orange" : "blue"}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.centers}</td>
                  <td>{project.sections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stack">
          <div className="card">
            <h3>Schedule Outline</h3>
            <p>Each project is made of reusable sections instead of a spreadsheet block.</p>
            <div className="stack">
              {scheduleSections.length ? scheduleSections.map((section) => (
                <div className="section-block" key={section.id}>
                  <div className="head">
                    {section.title}
                    {section.dateLabel ? ` - ${section.dateLabel}` : ""}
                  </div>
                  <div className="body">
                    <div className="meta">Rows: {section.rows}</div>
                    <div className="meta">Centers covered: {section.centersCovered}</div>
                  </div>
                </div>
              )) : (
                <div className="notice">
                  No schedule sections have been created yet. Start by adding projects and centers, then the schedule builder can be connected next.
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3>Recent Dispatch Status</h3>
            <p>Quick visibility into sent, failed, or queued deliveries.</p>
            <div className="stack">
              {dispatchLogs.length ? dispatchLogs.map((log) => (
                <div key={log.id}>
                  <strong>{log.centerName}</strong>
                  <div className="meta">{log.projectName}</div>
                  <div className={`pill ${log.status === "SENT" ? "green" : log.status === "FAILED" ? "red" : "orange"}`}>
                    {log.status}
                  </div>
                </div>
              )) : (
                <div className="notice">
                  No dispatch logs yet. Once email sending is connected, your recent runs will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
