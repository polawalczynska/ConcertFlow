# ConcertFlow

ConcertFlow is a comprehensive concert management system designed to streamline the planning, approval, and execution of
concerts. The system supports multiple user roles (Coordinators, Budget Managers, and Technical Managers) and provides a
complete workflow for concert lifecycle management.

## User Documentation

### Overview

ConcertFlow enables concert coordinators to plan and manage concerts through a structured approval process involving
budget and technical managers. The system tracks the entire lifecycle of concerts from initial planning through
completion or cancellation.

### User Roles

**Coordinator**

- Create and manage concerts
- Create and manage artists
- Submit budgets and technical requirements for approval
- View dashboard with concert statistics
- Manage team members (invite budget and technical managers)
- Receive notifications about concert status changes

**Budget Manager**

- Review and approve budget submissions
- Request budget revisions with specific requirements
- View assigned concerts and their budget details
- Receive notifications when budgets are submitted for approval

**Technical Manager**

- Review and approve technical requirements submissions
- Request technical revisions with specific change requirements
- View assigned concerts and their technical details
- Receive notifications when technical requirements are submitted

### Key Features

1. **Concert Management**
    - Create concerts with artist, venue, date, and budget information
    - Edit concerts
    - Cancel concerts with reason tracking
    - View concert details including budget items and technical requirements

2. **Approval Workflow**
    - Budget must be submitted and approved before technical requirements can be submitted
    - Technical requirements must be approved for the concert to be fully approved
    - Both budget and technical managers can request revisions with specific requirements

3. **Notifications**
    - Real-time notifications for approval requests, approvals, revision requests, and status changes
    - Unread notification count displayed in the navigation bar
    - Notification center to view and manage all notifications

4. **Dashboard**
    - View statistics, upcoming events, recent concerts, and alerts

5. **Team Management**
    - Coordinators can invite budget and technical managers to their team
    - Managers receive invitations and can accept or decline
    - Team members can be assigned to specific concerts

### Workflow

1. **Concert Creation**: Coordinator creates a concert with basic information
2. **Budget Submission**: Coordinator adds budget items and submits for approval
3. **Budget Approval**: Budget manager reviews and approves or requests revisions
4. **Technical Submission**: After budget approval, coordinator submits technical requirements
5. **Technical Approval**: Technical manager reviews and approves or requests revisions
6. **Final Approval**: Once both are approved, concert status changes to approved
7. **Completion**: After the concert date, status is automatically updated to completed

## Installation & Configuration

### Prerequisites

- Docker and Docker Compose installed
- Make utility (optional, for using Makefile commands)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ConcertFlow
   ```

2. **Start all services**
   ```bash
   make up
   # or manually:
   docker compose up -d
   ```

3. **Access the application**
    - Web application: http://localhost:3000
    - API: http://localhost:8080
    - API Documentation (Swagger): http://localhost:8080/swagger-ui.html

### Configuration

#### Environment Variables

The application can be configured using environment variables or a `.env.properties` file in the `ConcertFlow`
directory.

**Database Configuration**

- `DB_URL`: PostgreSQL connection URL (default: `jdbc:postgresql://localhost:5432/concertflow`)
- `DB_USERNAME`: Database username (default: `postgres`)
- `DB_PASSWORD`: Database password (default: `postgres`)

**JWT Configuration**

- `JWT_SECRET`: Secret key for JWT token signing (required, minimum 256 bits)
- `JWT_ACCESS_EXPIRATION_MS`: Access token expiration in milliseconds (default: 900000 = 15 minutes)
- `JWT_REFRESH_EXPIRATION_MS`: Refresh token expiration in milliseconds (default: 86400000 = 24 hours)
- `JWT_REMEMBER_ME_EXPIRATION_MS`: Remember me token expiration in milliseconds (default: 2592000000 = 30 days)

**API Configuration**

- `API_BASE_URL`: Base URL for the API (used by web application, default: `http://api:8080`)

#### Docker Compose Configuration

The `docker-compose.yml` file configures three services:

1. **PostgreSQL Database** (port 5434 on host)
2. **Spring Boot API** (port 8080)
3. **Remix Web Application** (port 3000)

To modify ports or other settings, edit `docker-compose.yml`.

### Development Mode

For development with hot-reload:

```bash
make dev
# or manually:
docker compose -f docker-compose.dev.yml up -d
```

### Available Commands

- `make up` - Start all services
- `make down` - Stop all services
- `make build` - Build all containers
- `make logs` - View logs from all services
- `make restart` - Restart all services
- `make clean` - Stop and remove all containers, volumes, and images
- `make dev` - Start in development mode

## Design Patterns

This project was developed for the "Advanced design and architectural patterns" class and implements several design
patterns to ensure maintainability, scalability, and separation of concerns.

### 1. Chain of Responsibility

**Where**: `ApprovalHandler` (abstract class), `ApprovalChainService`, `BudgetSubmissionHandler`, `BudgetApprovalHandler`, `TechnicalSubmissionHandler`, `TechnicalApprovalHandler`, `FinalApprovalHandler`

**How it's used**: The approval workflow processes different types of requests (budget submission, budget approval, technical submission, technical approval, final approval) in a specific order. Each handler processes requests it can handle and passes others to the next handler in the chain. `ApprovalChainService` configures the chain and delegates requests to the first handler.

### 2. Builder

**Where**: `ConcertBuilder`, `JwtTokenBuilder`, `UserBuilder`, `BudgetRevisionNoteBuilder`, `TechnicalRevisionCommentBuilder`, Lombok `@Builder` annotations on entities (`Concert`, `User`, `Artist`, `Notification`, `BudgetItem`, `TechnicalRequirements`, `TeamInvitation`, `BudgetApproval`, `TechnicalApproval`)

**How it's used**: Builders provide a fluent interface for constructing complex objects. Custom builders like `ConcertBuilder` and `UserBuilder` handle entity construction from DTOs with optional fields and default values. Lombok's `@Builder` generates builder methods for entities, allowing step-by-step object construction.

### 3. Registry

**Where**: `TokenGeneratorRegistry`, `ConcertStateRegistry`

**How it's used**: Registries provide a centralized lookup mechanism for objects managed by the dependency injection container. `TokenGeneratorRegistry` retrieves the appropriate token generator (access, refresh, remember-me) based on token type. `ConcertStateRegistry` retrieves the appropriate state object (`PlanningState`, `ApprovedState`, etc.) based on the concert's current status.

### 4. Factory

**Where**: `ProblemDetailFactory`

**How it's used**: The factory creates different types of error response objects (`ProblemDetail`) based on runtime conditions. It encapsulates object creation logic and provides a single point of control for creating standardized error responses with consistent structure across the application.

### 5. Observer (Event-Driven)

**Where**: 
- `NotificationService` (observer/listener)
- `ApplicationEventPublisher` (subject)
- Event classes: `BudgetSubmittedEvent`, `TechnicalSubmittedEvent`, `TechnicalApprovedEvent`, `TechnicalRevisionRequestedEvent`, `BudgetApprovedEvent`, `ConcertStatusChangedEvent`, `TeamInvitationCreatedEvent`, `TeamInvitationAcceptedEvent`

**How it's used**: When an approval action or status change occurs, an event is published using `ApplicationEventPublisher`. `NotificationService` listens to these events using `@EventListener` and `@TransactionalEventListener` annotations, creating appropriate notifications asynchronously. This decouples business logic from notification logic.

### 6. State

**Where**: `ConcertState` (interface), `ConcertStateRegistry`, `ConcertStateManager`, `PlanningState`, `ApprovedState`, `CompletedState`, `CancelledState`

**How it's used**: Concerts have different states (PLANNING, APPROVED, COMPLETED, CANCELLED) with different allowed transitions and behaviors. `ConcertStateManager` retrieves the current state from `ConcertStateRegistry` and delegates operations (approve, cancel, complete, canEdit, canDelete) to the state object. Each state class encapsulates state-specific behavior, making transitions explicit and preventing invalid operations.

### 7. Mapper

**Where**: `ConcertMapper`, `ArtistMapper`, `BudgetMapper`, `TechnicalMapper`, `TeamMapper`, `NotificationMapper`

**How it's used**: Mapper classes transform data between different representations - from domain entities to DTOs. Services use mappers to convert entities to response DTOs (e.g., `ConcertService` uses `ConcertMapper.toResponse()` to convert `Concert` entity to `ConcertResponse` DTO). This keeps internal domain models independent of external API contracts.

### 8. Lazy Loading

**Where**: Entity relations with `fetch = FetchType.LAZY` (e.g., `Notification.user`, `BudgetItem.concert`, `TeamInvitation.invitedUser`, `TechnicalRequirements.concert`), `@OneToMany` collections (default lazy in JPA, e.g., `Concert.budgetItems`, `Concert.budgetApprovals`), `@ManyToOne` relations (default lazy in JPA, e.g., `Concert.coordinator`, `Concert.artist`)

**How it's used**: Related entities are loaded on-demand by Hibernate when accessed, instead of being eagerly fetched on every query. Hibernate creates proxy objects that load data from the database only when accessed within an active transaction (managed by `@Transactional` in service layer). This reduces initial query time and memory usage.

### 9. Domain Model

**Where**: JPA entities in `api/src/main/java/com/concertflow/api/**/entity/*` (e.g., `Concert`, `User`, `Artist`, `TechnicalRequirements`, `BudgetItem`, `Approval`, `TeamInvitation`, `Notification`, `BudgetApproval`, `TechnicalApproval`)

**How it's used**: Entities represent business concepts and their relationships. They encapsulate domain data and relationships (using JPA annotations like `@ManyToOne`, `@OneToMany`, `@OneToOne`). Entities have lifecycle hooks (`@PrePersist`, `@PreUpdate`) and are managed by JPA/Hibernate. Services operate on these domain objects to implement business logic.

### 10. Identity Field

**Where**: All JPA entities with `@Id` and `@GeneratedValue(strategy = GenerationType.IDENTITY)` annotations (e.g., `Concert.id`, `User.id`, `Artist.id`, `BudgetItem.id`, `Notification.id`, `TeamInvitation.id`, `Approval.id`)

**How it's used**: Each entity has a primary key field (`id`) of type `Long` that uniquely identifies the object in the database. The `@Id` annotation marks the field as the primary key, and `@GeneratedValue(strategy = GenerationType.IDENTITY)` configures the database to auto-generate the ID value when a new entity is persisted. This allows objects to be identified and retrieved by their ID.

### 11. Foreign Key Mapping

**Where**: Entity relations with `@ManyToOne`, `@OneToMany`, `@OneToOne` and `@JoinColumn` annotations (e.g., `Concert.coordinator` with `@JoinColumn(name = "coordinator_id")`, `Concert.artist` with `@JoinColumn(name = "artist_id")`, `BudgetItem.concert` with `@JoinColumn(name = "concert_id")`, `TeamInvitation.invitedUser` with `@JoinColumn(name = "invited_user_id")`, `Notification.user` with `@JoinColumn(name = "user_id")`)

**How it's used**: Relationships between entities are mapped using foreign keys in the database. The `@JoinColumn` annotation specifies the name of the foreign key column in the database table. `@ManyToOne` creates a foreign key in the owning entity's table, `@OneToMany` with `mappedBy` creates a bidirectional relationship, and `@OneToOne` creates a one-to-one relationship. Hibernate/JPA manages the foreign key constraints and loads related entities based on these mappings.

## Architectural Patterns

In addition to the design patterns above, the project also uses common architectural patterns.

### Repository

**Where**: All `*Repository` interfaces extending `JpaRepository` (e.g., `ConcertRepository`, `UserRepository`, `ArtistRepository`, `NotificationRepository`, `TeamInvitationRepository`)

**How it's used**: Repositories provide a clean interface for data operations, hiding the complexity of JPA/Hibernate. Services use repositories to access data instead of directly using entity managers. This separates data access logic from business logic and makes the codebase more testable (can mock repositories).

### Data Transfer Object (DTO)

**Where**: `api/src/main/java/com/concertflow/api/**/dto/*`

**How it's used**: Controllers accept request DTOs (e.g. `ConcertRequest`) and return response DTOs (e.g. `ConcertResponse`)
instead of exposing JPA entities directly.

### Service Layer

**Where**: `api/src/main/java/com/concertflow/api/**/service/*` (Spring `@Service`)

**How it's used**: Business logic is implemented in services (e.g. `ConcertService`, `AuthenticationService`,
`TeamInvitationService`). Controllers delegate to services; repositories are used from the service layer.

### Application Controller

**Where**: `api/src/main/java/com/concertflow/api/**/*Controller.java` (Spring `@RestController`)

**How it's used**: Controllers coordinate requests/responses and call the service layer. Example: `ConcertController`
handles HTTP endpoints and delegates to `ConcertService`.
