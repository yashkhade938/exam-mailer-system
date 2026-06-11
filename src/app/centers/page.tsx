import { PageHeader } from "@/components/page-header";
import { createCenter, getCenterSummaries } from "@/lib/data";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

async function createCenterAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const contactName = String(formData.get("contactName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!name || !email) {
    return;
  }

  await createCenter({
    name,
    email,
    contactName,
    phone
  });

  revalidatePath("/centers");
  revalidatePath("/");
}

export default async function CentersPage() {
  const centers = await getCenterSummaries();

  return (
    <>
      <PageHeader
        title="Centers"
        description="Maintain center recipients and their operational contact details independently from any spreadsheet."
        actions={
          <>
            <button className="btn primary">Add Center</button>
            <button className="btn secondary">Bulk Upload</button>
          </>
        }
      />

      <div className="grid split-2">
        <div className="card">
          <h3>Add Center</h3>
          <p>Create recipients once, then reuse them across multiple projects later.</p>

          <form action={createCenterAction} className="form-grid">
            <label className="field">
              <span>Center Name</span>
              <input name="name" placeholder="Pune Main Center" required />
            </label>

            <label className="field">
              <span>Email</span>
              <input name="email" type="email" placeholder="pune.center@example.com" required />
            </label>

            <label className="field">
              <span>Contact Person</span>
              <input name="contactName" placeholder="Ritesh Patil" />
            </label>

            <label className="field">
              <span>Phone</span>
              <input name="phone" placeholder="+91-90000-11111" />
            </label>

            <div className="field-full">
              <button className="btn primary" type="submit">Save Center</button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3>Center Directory</h3>
          <p>Your saved center contacts now come from the local database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Center</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>Projects Using</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((center) => (
                <tr key={center.id}>
                  <td>{center.name}</td>
                  <td>{center.email}</td>
                  <td>{center.contactName}</td>
                  <td>{center.phone}</td>
                  <td>{center.projectCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
