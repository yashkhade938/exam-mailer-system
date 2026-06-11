# Project Scheduler

Standalone web system for center-wise schedule management and email dispatch.

## What this replaces

This project is designed to replace the spreadsheet + Apps Script workflow with a proper application that stores:

- projects
- centers
- schedule sections
- batch rows
- email templates
- dispatch logs

It does not depend on Google Sheets.

## Core modules

- Dashboard
- Projects
- Centers
- Schedules
- Email Templates
- Dispatch Logs
- Settings

## Suggested stack

- Next.js App Router
- SQLite for local starter setup
- Prisma ORM
- SMTP or Gmail API for email delivery

## Local setup

1. Install dependencies:

```bash
npm install
```

2. `.env` is already prepared for local SQLite. If you want a fresh copy, use `.env.example`.

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Current state

This starter now includes:

- app layout and admin shell
- Prisma schema with local SQLite database
- live dashboard counts from database
- working Projects create/list flow
- working Centers create/list flow
- API GET/POST routes for projects and centers
- placeholder pages for schedules, templates, and dispatch logs

## Recommended next build steps

1. Add project-to-center assignment workflow.
2. Build schedule section and row editor.
3. Connect branded SMTP email dispatch.
4. Add authentication and role-based access.
5. Add retry, audit, and import workflows.
