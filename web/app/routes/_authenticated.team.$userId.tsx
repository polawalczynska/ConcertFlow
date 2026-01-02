import { useParams } from "@remix-run/react";
import { DeleteTeamMemberDialog } from "~/routes/_authenticated.team/components/DeleteTeamMemberDialog";
import type { TeamMember } from "~/routes/_authenticated.team/types";
import { TeamMemberDetailHeader } from "./_authenticated.team.$userId/components/TeamMemberDetailHeader";
import { TeamMemberDetailCard } from "./_authenticated.team.$userId/components/TeamMemberDetailCard";
import { TeamMemberNotFound } from "./_authenticated.team.$userId/components/TeamMemberNotFound";
import { AssignedConcertsTab } from "./_authenticated.team.$userId/components/tabs/AssignedConcertsTab";
import { useTeamMemberDetail } from "./_authenticated.team.$userId/hooks/useTeamMemberDetail";
import type { AssignedConcert } from "./_authenticated.team.$userId/types";

const mockMember: TeamMember = {
  id: 1,
  name: "Sarah Johnson",
  role: "Stage Manager",
  email: "sarah.j@example.com",
  phone: "+1 234 567 8901",
  status: "active",
  assignedConcerts: 5,
  availability: "available",
  skills: ["Stage Setup", "Coordination", "Safety"],
};

const mockAssignedConcerts: AssignedConcert[] = [
  {
    id: 1,
    name: "Summer Electronic Festival",
    date: "2024-07-15",
    venue: "City Arena",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Jazz Night Live",
    date: "2024-06-20",
    venue: "Blue Note Club",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Rock Legends Tour",
    date: "2024-05-10",
    venue: "Stadium Arena",
    status: "completed",
  },
];

export default function TeamMemberDetailPage() {
  const params = useParams();
  const userId = params.userId ? Number.parseInt(params.userId) : null;
  
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    handleDelete,
    confirmDelete,
  } = useTeamMemberDetail();

  const member = mockMember;
  const assignedConcerts = mockAssignedConcerts;

  if (!member) {
    return <TeamMemberNotFound />;
  }

  return (
    <div className="p-8 min-h-screen bg-bg-secondary">
      <div className="mx-auto max-w-4xl">
        <TeamMemberDetailHeader />

        <TeamMemberDetailCard member={member} onDelete={handleDelete} />

        <div className="mt-6">
          <AssignedConcertsTab concerts={assignedConcerts} />
        </div>
      </div>

      <DeleteTeamMemberDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        member={member}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

