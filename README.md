# ConcertFlow

Concert management system for planning, approval, and execution of concerts. Supports Coordinators, Budget Managers, and Technical Managers with a complete workflow for concert lifecycle management.

## Quick Start

**Prerequisites:** Docker and Docker Compose

```bash
git clone <repository-url>
cd ConcertFlow
make up
```

**Access:**
- Web: http://localhost:3000
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop all services |
| `make dev` | Development mode with hot-reload |
| `make build` | Build containers |
| `make logs` | View logs |
| `make clean` | Remove all containers and volumes |

## User Roles

- **Coordinator**: Create concerts and artists, submit budgets and technical requirements, manage team
- **Budget Manager**: Review and approve budgets
- **Technical Manager**: Review and approve technical requirements

## Workflow

1. Coordinator creates concert
2. Coordinator submits budget for approval
3. Budget Manager approves (or requests revisions)
4. Coordinator submits technical requirements
5. Technical Manager approves (or requests revisions)
6. Concert is fully approved
