# Environment Configuration — HD-OPERATIONS

## Overview

HD-OPERATIONS uses environment variables for all configuration. No secrets are hardcoded.

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `APP_NAME` | Application identifier | `HD-OPERATIONS` |
| `APP_PORT` | HTTP server port | `3003` |
| `API_BASE_URL` | Base URL for this API | `http://localhost:3003` |
| `HD_CORE_MODE` | HD-CORE resolution mode | `local` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/hdoperations` |
| `AUDIT_DB_URL` | Audit database URL | `postgresql://user:password@localhost:5432/hdaudit` |
| `EVENT_BUS_URL` | Event bus connection | `amqp://localhost:5672` |
| `JWT_SECRET` | JWT signing secret | (never hardcode) |
| `JWT_EXPIRY` | Token expiry | `1h` |
| `N8N_WEBHOOK_BASE_URL` | n8n webhook base URL | `http://localhost:5678` |
| `LOG_LEVEL` | Logging level | `info` |

## Security Rules

1. Never commit a `.env` file with real values.
2. SUPERVISOR_AGENT must never have database credentials for CRM, Finance, or HR databases.
