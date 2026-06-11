import { PageHeader } from "@/components/page-header";

export default function TemplatesPage() {
  return (
    <>
      <PageHeader
        title="Templates and Branding"
        description="Control subject lines, sender names, notes, footer text, and colors at the project level."
        actions={
          <>
            <button className="btn primary">Create Template</button>
            <button className="btn secondary">Preview HTML</button>
          </>
        }
      />

      <div className="grid split-2">
        <div className="card">
          <h3>Template Fields</h3>
          <ul className="list">
            <li>Email subject line</li>
            <li>Sender display name</li>
            <li>Header subtitle</li>
            <li>Footer text</li>
            <li>Note text</li>
            <li>Primary and background colors</li>
          </ul>
        </div>

        <div className="card">
          <h3>Branding Preview Logic</h3>
          <p>
            The renderer should take project settings, a center record, and section
            data to produce branded HTML without manual formatting per project.
          </p>
          <div className="notice">
            Recommended next step: build a reusable `renderCenterEmail(projectId, centerId)` service.
          </div>
        </div>
      </div>
    </>
  );
}
