# ConcertFlow

A concert management system for planning, approving, and tracking concerts from creation to completion.

## User Roles

- **Coordinator** - Creates concerts and artists, submits budgets and technical requirements, manages team
- **Budget Manager** - Reviews and approves budget submissions
- **Technical Manager** - Reviews and approves technical requirements

## Workflow

1. Coordinator creates a concert
2. Budget manager approves the budget
3. Technical manager approves technical requirements
4. Concert is fully approved and tracked to completion

## Quick Start

```bash
# Start all services
docker compose up -d

# Or use make
make up
```

**Access:**
- Web: http://localhost:3000
- API: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html

## Development

```bash
make dev
```

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start services |
| `make down` | Stop services |
| `make build` | Build containers |
| `make logs` | View logs |
| `make dev` | Development mode |
| `make clean` | Remove everything |
