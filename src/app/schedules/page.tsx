import { PageHeader } from "@/components/page-header";
import { scheduleSections } from "@/lib/sample-data";

export default function SchedulesPage() {
  return (
    <>
      <PageHeader
        title="Schedules"
        description="Model the workflow as sections and rows so any project can render a center-wise preview without custom sheet logic."
        actions={
          <>
            <button className="btn primary">Add Section</button>
            <button className="btn secondary">Preview Center Email</button>
          </>
        }
      />

      <div className="grid cards-3">
        {scheduleSections.map((section) => (
          <div className="card" key={section.id}>
            <h3>{section.title}</h3>
            <p>{section.dateLabel ? `Date label: ${section.dateLabel}` : "Project-neutral section without a date label."}</p>
            <div className="meta">Rows: {section.rows}</div>
            <div className="meta">Centers covered: {section.centersCovered}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Target Data Model</h3>
        <p>The standalone system stores schedule content in normalized tables rather than a visual spreadsheet block.</p>
        <ul className="list">
          <li>Sections define the top-level blocks such as pre-schedule, exam days, or summaries.</li>
          <li>Rows hold label columns and whether a row is a total row.</li>
          <li>Cells map values to centers so the renderer can output only the chosen center column.</li>
        </ul>
      </div>
    </>
  );
}
