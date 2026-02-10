# 🎵 ConcertFlow

ConcertFlow is a comprehensive concert management system designed to streamline the planning, approval, and execution of
concerts. The system supports multiple user roles (Coordinators, Budget Managers, and Technical Managers) and provides a
complete workflow for concert lifecycle management.

## 📖 User Documentation

### Overview

ConcertFlow enables concert coordinators to plan and manage concerts through a structured approval process involving
budget and technical managers. The system tracks the entire lifecycle of concerts from initial planning through
completion or cancellation.

### 👥 User Roles

**🎯 Coordinator**

- Create and manage concerts
- Create and manage artists
- Submit budgets and technical requirements for approval
- View dashboard with concert statistics
- Manage team members (invite budget and technical managers)
- Receive notifications about concert status changes

**💰 Budget Manager**

- Review and approve budget submissions
- Request budget revisions with specific requirements
- View assigned concerts and their budget details
- Receive notifications when budgets are submitted for approval

**🔧 Technical Manager**

- Review and approve technical requirements submissions
- Request technical revisions with specific change requirements
- View assigned concerts and their technical details
- Receive notifications when technical requirements are submitted

### ✨ Key Features

1. **🎤 Concert Management**
    - Create concerts with artist, venue, date, and budget information
    - Edit concerts
    - Cancel concerts with reason tracking
    - View concert details including budget items and technical requirements

2. **✅ Approval Workflow**
    - Budget must be submitted and approved before technical requirements can be submitted
    - Technical requirements must be approved for the concert to be fully approved
    - Both budget and technical managers can request revisions with specific requirements

3. **🔔 Notifications**
    - Real-time notifications for approval requests, approvals, revision requests, and status changes
    - Unread notification count displayed in the navigation bar
    - Notification center to view and manage all notifications

4. **📊 Dashboard**
    - View statistics, upcoming events, recent concerts, and alerts

5. **👨‍👩‍👧‍👦 Team Management**
    - Coordinators can invite budget and technical managers to their team
    - Managers receive invitations and can accept or decline
    - Team members can be assigned to specific concerts

### 🔄 Workflow

1. **Concert Creation**: Coordinator creates a concert with basic information
2. **Budget Submission**: Coordinator adds budget items and submits for approval
3. **Budget Approval**: Budget manager reviews and approves or requests revisions
4. **Technical Submission**: After budget approval, coordinator submits technical requirements
5. **Technical Approval**: Technical manager reviews and approves or requests revisions
6. **Final Approval**: Once both are approved, concert status changes to approved
7. **Completion**: After the concert date, status is automatically updated to completed

## 🛠️ Installation & Configuration

### Prerequisites

- 🐳 Docker and Docker Compose installed
- ⚙️ Make utility (optional, for using Makefile commands)

### 🚀 Quick Start with Docker

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
    - 🌐 Web application: http://localhost:3000
    - 🔌 API: http://localhost:8080
    - 📚 API Documentation (Swagger): http://localhost:8080/swagger-ui.html

### ⚙️ Configuration

#### Environment Variables

The application can be configured using environment variables or a `.env.properties` file in the `ConcertFlow`
directory.

**🗄️ Database Configuration**

- `DB_URL`: PostgreSQL connection URL (default: `jdbc:postgresql://localhost:5432/concertflow`)
- `DB_USERNAME`: Database username (default: `postgres`)
- `DB_PASSWORD`: Database password (default: `postgres`)

**🔐 JWT Configuration**

- `JWT_SECRET`: Secret key for JWT token signing (required, minimum 256 bits)
- `JWT_ACCESS_EXPIRATION_MS`: Access token expiration in milliseconds (default: 900000 = 15 minutes)
- `JWT_REFRESH_EXPIRATION_MS`: Refresh token expiration in milliseconds (default: 86400000 = 24 hours)
- `JWT_REMEMBER_ME_EXPIRATION_MS`: Remember me token expiration in milliseconds (default: 2592000000 = 30 days)

**🔌 API Configuration**

- `API_BASE_URL`: Base URL for the API (used by web application, default: `http://api:8080`)

#### 🐳 Docker Compose Configuration

The `docker-compose.yml` file configures three services:

1. **🗄️ PostgreSQL Database** (port 5434 on host)
2. **☕ Spring Boot API** (port 8080)
3. **💿 Remix Web Application** (port 3000)

To modify ports or other settings, edit `docker-compose.yml`.

### 💻 Development Mode

For development with hot-reload:

```bash
make dev
# or manually:
docker compose -f docker-compose.dev.yml up -d
```

### 📋 Available Commands

- `make up` - Start all services
- `make down` - Stop all services
- `make build` - Build all containers
- `make logs` - View logs from all services
- `make restart` - Restart all services
- `make clean` - Stop and remove all containers, volumes, and images
- `make dev` - Start in development mode
