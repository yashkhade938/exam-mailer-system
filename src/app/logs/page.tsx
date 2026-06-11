import { PageHeader } from "@/components/page-header";
import { dispatchLogs } from "@/lib/sample-data";

export default function LogsPage() {
  return (
    <>
      <PageHeader
        title="Dispatch Logs"
        description="Track sent, failed, or queued emails so your team can retry issues and maintain a real audit trail."
        actions={
          <>
            <button className="btn primary">Retry Failed</button>
            <button className="btn secondary">Export Logs</button>
          </>
        }
      />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Center</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Sent At</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {dispatchLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.projectName}</td>
                <td>{log.centerName}</td>
                <td>{log.recipient}</td>
                <td>
                  <span className={`pill ${log.status === "SENT" ? "green" : log.status === "FAILED" ? "red" : "orange"}`}>
                    {log.status}
                  </span>
                </td>
                <td>{log.sentAt}</td>
                <td>{log.errorMessage || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
