# ConcertFlow

A concert management system for planning, approving, and tracking concerts. Supports three user roles: Coordinators (create/manage concerts), Budget Managers (approve budgets), and Technical Managers (approve technical requirements).

## Features

- Concert lifecycle management (planning, approval, completion)
- Two-stage approval workflow (budget then technical)
- Real-time notifications
- Team management and invitations
- Dashboard with statistics

## Quick Start

```bash
# Clone and start
git clone <repository-url>
cd ConcertFlow
make up  # or: docker compose up -d
```

**Access:**
- Web: http://localhost:3000
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

## Configuration

Set via environment variables or `.env.properties`:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_URL` | PostgreSQL URL | `jdbc:postgresql://localhost:5432/concertflow` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `JWT_SECRET` | JWT signing key (min 256 bits) | required |

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop all services |
| `make dev` | Development mode with hot-reload |
| `make logs` | View logs |
| `make clean` | Remove containers and volumes |
