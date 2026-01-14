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

**Classes**:

- `ApprovalHandler` (abstract class)
- `ApprovalChainService`
- `BudgetSubmissionHandler`
- `BudgetApprovalHandler`
- `TechnicalSubmissionHandler`
- `TechnicalApprovalHandler`
- `FinalApprovalHandler`

**Justification**: The approval workflow requires processing different types of requests (budget submission, budget
approval, technical submission, technical approval, final approval) in a specific order. The Chain of Responsibility
pattern allows each handler to process requests it can handle and pass others to the next handler in the chain. This
provides flexibility to add or modify approval steps without changing existing code, and ensures each approval action is
handled by the appropriate component.

**Benefits**:

- Decouples request senders from receivers
- Allows dynamic chain configuration
- Easy to add new approval handlers
- Each handler has a single responsibility
- Simplifies testing of individual handlers

### 2. Builder

**Classes**:

- `ConcertBuilder` - Builds and updates Concert entities from DTOs
- `JwtTokenBuilder` - Builds JWT tokens with claims and expiration
- `UserBuilder` - Builds User entities from registration requests with password encoding
- `BudgetRevisionNoteBuilder` - Builds revision notes and comments for budget items
- `TechnicalRevisionCommentBuilder` - Builds revision comments for technical requirements
- Lombok `@Builder` annotations on entities (`Concert`, `User`, `Artist`, `Notification`, `BudgetItem`,
  `TechnicalRequirements`, `TeamInvitation`, `BudgetApproval`, `TechnicalApproval`)

**Justification**: Complex objects like concerts require many parameters during construction, and some entities need to
be built with optional fields and default values. The Builder pattern provides a fluent interface for object
construction, making the code more readable and maintainable. It also allows for different construction strategies (
e.g., building a new concert vs. updating an existing one).

**Benefits**:

- Improves code readability with fluent API
- Handles optional parameters elegantly
- Allows immutable object construction
- Separates construction logic from business logic
- Reduces constructor parameter lists

### 3. Registry

**Classes**:

- `TokenGeneratorRegistry`
- `ConcertStateRegistry`

**Justification**: The application needs to locate and retrieve existing objects (token generators, concert states) based
on runtime conditions or type parameters. The Registry pattern provides a centralized lookup mechanism for objects that
are already created and managed by the dependency injection container. This is especially useful for JWT tokens where
different token types (access, refresh, remember-me) require different generators, and for concert states where the
appropriate state object must be retrieved based on the concert's current status.

**Benefits**:

- Centralizes object lookup logic
- Reduces coupling between classes
- Makes it easy to add new types (e.g., new token types or states)
- Simplifies testing by allowing mock registries
- Provides a consistent interface for object retrieval
- Leverages Spring's dependency injection for object management

### 4. Factory

**Classes**:

- `ProblemDetailFactory`

**Justification**: The application needs to create different types of error response objects based on runtime conditions.
The Factory pattern encapsulates object creation logic and provides a single point of control. This is especially useful
for creating standardized error responses (`ProblemDetail`) with consistent structure across the application.

**Benefits**:

- Centralizes object creation logic
- Reduces coupling between classes
- Makes it easy to add new error response types
- Simplifies testing by allowing mock factories
- Provides a consistent interface for object creation

### 5. Observer (Event-Driven)

**Classes**:

- `NotificationService` (observer/listener)
- `ApplicationEventPublisher` (subject)
- Event classes: `BudgetSubmittedEvent`, `TechnicalSubmittedEvent`, `TechnicalApprovedEvent`,
  `TechnicalRevisionRequestedEvent`, `BudgetApprovedEvent`, `ConcertStatusChangedEvent`

**Justification**: The system needs to notify users about various events (approval requests, status changes) without
tightly coupling the business logic to notification logic. The Observer pattern, implemented using Spring's event
mechanism, allows decoupled communication between components. When an approval action occurs, an event is published, and
the notification service listens and creates appropriate notifications.

**Benefits**:

- Decouples event producers from consumers
- Allows multiple listeners for the same event
- Easy to add new event types and listeners
- Asynchronous event processing with `@Async`
- Transaction-aware event handling with `@TransactionalEventListener`

### 6. State

**Classes**:

- `ConcertState` (interface)
- `ConcertStateRegistry`
- `ConcertStateManager`
- `PlanningState`
- `ApprovedState`
- `CompletedState`
- `CancelledState`

**Justification**: Concerts have different states (PLANNING, APPROVED, COMPLETED, CANCELLED) with different allowed
transitions and behaviors. The State pattern encapsulates state-specific behavior in separate classes, making state
transitions explicit and preventing invalid operations. For example, only concerts in PLANNING status can be edited, and
only APPROVED concerts can be completed.

**Benefits**:

- Encapsulates state-specific behavior
- Makes state transitions explicit and type-safe
- Prevents invalid operations based on current state
- Easy to add new states or modify state behavior
- Simplifies conditional logic in business code
- Clear separation of concerns for each state

### 7. Repository

**Classes**:

- All `*Repository` interfaces extending `JpaRepository` (e.g., `ConcertRepository`, `UserRepository`,
  `ArtistRepository`, `NotificationRepository`, `TeamInvitationRepository`)

**Justification**: Data access logic should be abstracted from business logic. The Repository pattern provides a clean
interface for data operations, hiding the complexity of JPA/Hibernate. This makes the codebase more testable (can mock
repositories) and allows for easy switching of data access implementations.

**Benefits**:

- Separates data access from business logic
- Provides a consistent data access interface
- Simplifies testing with mock repositories
- Centralizes data access queries
- Makes code more maintainable and readable

### 8. Adapter

**Classes**:

- `NotificationAdapter`
- `NotificationCategoryAdapter`, `NotificationIconAdapter`, `NotificationColorAdapter`
- `RoleAdapter`
- `StatusAdapter`
- Mapper classes: `ConcertMapper`, `ArtistMapper`, `BudgetMapper`, `TechnicalMapper`, `TeamMapper`, `NotificationMapper`

**Justification**: The application needs to transform data between different representations - from domain entities to
DTOs. Mappers and Adapters adapt one interface to another, making incompatible interfaces work
together. This separation ensures that internal domain models remain independent of external API contracts, allowing
changes to either without affecting the other.

**Benefits**:

- Decouples domain entities from API contracts
- Allows independent evolution of entities and DTOs
- Provides a single point of transformation logic
- Makes it easy to change data representation without affecting business logic
- Simplifies testing by allowing mock adapters/mappers
- Enables reuse of transformation logic across different contexts
