import { PageHeader } from "@/components/page-header";
import {
  assignCenterToProject,
  createProject,
  getCenterSummaries,
  getProjectSummaries,
  removeCenterFromProject
} from "@/lib/data";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

async function createProjectAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const status = String(formData.get("status") || "DRAFT").trim() as ProjectStatus;
  const emailSubject = String(formData.get("emailSubject") || "").trim();
  const senderName = String(formData.get("senderName") || "").trim();

  if (!name || !emailSubject || !senderName) {
    return;
  }

  await createProject({
    name,
    status,
    emailSubject,
    senderName
  });

  revalidatePath("/projects");
  revalidatePath("/");
}

async function assignCenterAction(formData: FormData) {
  "use server";

  const projectId = String(formData.get("projectId") || "").trim();
  const centerId = String(formData.get("centerId") || "").trim();

  if (!projectId || !centerId) {
    return;
  }

  await assignCenterToProject({
    projectId,
    centerId
  });

  revalidatePath("/projects");
  revalidatePath("/centers");
  revalidatePath("/");
}

async function removeCenterAction(formData: FormData) {
  "use server";

  const projectId = String(formData.get("projectId") || "").trim();
  const centerId = String(formData.get("centerId") || "").trim();

  if (!projectId || !centerId) {
    return;
  }

  await removeCenterFromProject({
    projectId,
    centerId
  });

  revalidatePath("/projects");
  revalidatePath("/centers");
  revalidatePath("/");
}

export default async function ProjectsPage() {
  const [projects, centers] = await Promise.all([
    getProjectSummaries(),
    getCenterSummaries()
  ]);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Create reusable project records for any exam, drive, assessment, or operational schedule."
        actions={
          <>
            <button className="btn primary">New Project</button>
            <button className="btn secondary">Import Data</button>
          </>
        }
      />

      <div className="grid split-2">
        <div className="card">
          <h3>Create Project</h3>
          <p>Start a new standalone project without touching Sheets or manual config blocks.</p>

          <form action={createProjectAction} className="form-grid">
            <label className="field">
              <span>Project Name</span>
              <input name="name" placeholder="Forest Recruitment 2026" required />
            </label>

            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue="DRAFT">
                <option value="DRAFT">DRAFT</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </label>

            <label className="field field-full">
              <span>Email Subject</span>
              <input name="emailSubject" placeholder="Center-wise Schedule - Forest Recruitment 2026" required />
            </label>

            <label className="field field-full">
              <span>Sender Name</span>
              <input name="senderName" placeholder="WeShine Operations" required />
            </label>

            <div className="field-full">
              <button className="btn primary" type="submit">Save Project</button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3>Assign Center To Project</h3>
          <p>Link saved recipient centers to the project that should receive its future schedule mails.</p>

          <form action={assignCenterAction} className="form-grid">
            <label className="field field-full">
              <span>Project</span>
              <select name="projectId" defaultValue="" required>
                <option value="" disabled>Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field field-full">
              <span>Center</span>
              <select name="centerId" defaultValue="" required>
                <option value="" disabled>Select center</option>
                {centers.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name} - {center.email}
                  </option>
                ))}
              </select>
            </label>

            <div className="field-full">
              <button className="btn primary" type="submit">Assign Center</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Project Register</h3>
        <p>Your saved projects now come from the local database, including linked recipient centers.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Subject</th>
              <th>Sender</th>
              <th>Assigned Centers</th>
              <th>Sections</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>
                  <span className={`pill ${project.status === "ACTIVE" ? "green" : project.status === "DRAFT" ? "orange" : "blue"}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.subject}</td>
                <td>{project.senderName}</td>
                <td>
                  <div className="table-cell-stack">
                    <strong>{project.centers}</strong>
                    {project.assignedCenters?.length ? (
                      <div className="tag-list">
                        {project.assignedCenters.map((center) => (
                          <form action={removeCenterAction} className="inline-form" key={`${project.id}-${center.id}`}>
                            <input name="projectId" type="hidden" value={project.id} />
                            <input name="centerId" type="hidden" value={center.id} />
                            <span className="tag">
                              <span>{center.name}</span>
                              <button className="tag-action" type="submit" title={`Remove ${center.name}`}>
                                Remove
                              </button>
                            </span>
                          </form>
                        ))}
                      </div>
                    ) : (
                      <div className="meta">No centers assigned yet.</div>
                    )}
                  </div>
                </td>
                <td>{project.sections}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
