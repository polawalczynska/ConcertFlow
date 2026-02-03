# ConcertFlow

ConcertFlow is a concert management system for planning, approval, and execution of concerts. It supports multiple user roles (Coordinators, Budget Managers, and Technical Managers) with a complete workflow for concert lifecycle management.

## Quick Start

### Prerequisites

- Docker and Docker Compose

### Start the Application

```bash
make up
# or: docker compose up -d
```

Access the application:
- Web: http://localhost:3000
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

### Development Mode

```bash
make dev
```

## User Roles

- **Coordinator**: Create and manage concerts, artists, and team members
- **Budget Manager**: Review and approve budget submissions
- **Technical Manager**: Review and approve technical requirements

## Workflow

1. Coordinator creates a concert
2. Coordinator submits budget for approval
3. Budget manager approves (or requests revisions)
4. Coordinator submits technical requirements
5. Technical manager approves (or requests revisions)
6. Concert is fully approved

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop all services |
| `make dev` | Development mode |
| `make logs` | View logs |
| `make build` | Build containers |
| `make clean` | Remove everything |
