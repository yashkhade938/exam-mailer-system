import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", title: "Dashboard", subtitle: "Overview, health, and pending dispatches" },
  { href: "/projects", title: "Projects", subtitle: "Manage exam or schedule projects" },
  { href: "/centers", title: "Centers", subtitle: "Recipients, contacts, and assignments" },
  { href: "/schedules", title: "Schedules", subtitle: "Sections, rows, and preview logic" },
  { href: "/templates", title: "Templates", subtitle: "Branding, subject lines, and notes" },
  { href: "/logs", title: "Dispatch Logs", subtitle: "Send history, failures, and retries" }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Project Scheduler</h1>
        <p>
          Standalone admin system for center-wise schedule management, previews,
          and email delivery.
        </p>

        <nav className="nav-list">
          {navItems.map((item) => (
            <Link className="nav-link" key={item.href} href={item.href}>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
