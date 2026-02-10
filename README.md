# ConcertFlow

A concert management system for planning, approvals, and execution. Supports Coordinators, Budget Managers, and Technical Managers.

## Quick Start

```bash
git clone <repository-url>
cd ConcertFlow
make up  # or: docker compose up -d
```

- Web app: http://localhost:3000
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

## User Roles

- **Coordinator**: Create concerts/artists, submit budgets and tech requirements, manage team
- **Budget Manager**: Review and approve budgets
- **Technical Manager**: Review and approve technical requirements

## Workflow

1. Coordinator creates concert
2. Budget submitted and approved
3. Technical requirements submitted and approved
4. Concert approved and completed

## Development

```bash
make dev  # Hot-reload mode
```

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start services |
| `make down` | Stop services |
| `make build` | Build containers |
| `make logs` | View logs |
| `make clean` | Remove everything |

## Configuration

Set via environment variables or `.env.properties`:

- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` - Database
- `JWT_SECRET` - Token signing (required)
- `API_BASE_URL` - API endpoint
