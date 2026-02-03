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
