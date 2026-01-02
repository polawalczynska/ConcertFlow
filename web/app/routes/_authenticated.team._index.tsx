import { useState } from "react";
import { AuthGuard } from "~/components/AuthGuard";
import { TeamHeader } from "~/routes/_authenticated.team/components/TeamHeader";
import { TeamSearch } from "~/routes/_authenticated.team/components/TeamSearch";
import { TeamList } from "~/routes/_authenticated.team/components/TeamList";
import { InviteTeamMemberDialog } from "~/routes/_authenticated.team/components/InviteTeamMemberDialog";
import { DeleteTeamMemberDialog } from "~/routes/_authenticated.team/components/DeleteTeamMemberDialog";
import type { TeamMember, TeamInvitation } from "~/routes/_authenticated.team/types";

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Stage Manager",
      email: "sarah.j@example.com",
      phone: "+1 234 567 8901",
      status: "active",
      assignedConcerts: 5,
      availability: "available",
      skills: ["Stage Setup", "Coordination", "Safety"],
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Sound Engineer",
      email: "mike.c@example.com",
      phone: "+1 234 567 8902",
      status: "active",
      assignedConcerts: 3,
      availability: "available",
      skills: ["Audio Mixing", "Equipment Setup", "Troubleshooting"],
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Lighting Technician",
      email: "emma.d@example.com",
      phone: "+1 234 567 8903",
      status: "active",
      assignedConcerts: 4,
      availability: "busy",
      skills: ["Lighting Design", "DMX Programming", "LED Systems"],
    },
    {
      id: 4,
      name: "Alex Brown",
      role: "Security Lead",
      email: "alex.b@example.com",
      phone: "+1 234 567 8904",
      status: "active",
      assignedConcerts: 6,
      availability: "available",
      skills: ["Crowd Control", "Emergency Response", "Team Leadership"],
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Production Assistant",
      email: "lisa.w@example.com",
      phone: "+1 234 567 8905",
      status: "active",
      assignedConcerts: 2,
      availability: "available",
      skills: ["Logistics", "Documentation", "Communication"],
    },
    {
      id: 6,
      name: "Tom Martinez",
      role: "Video Engineer",
      email: "tom.m@example.com",
      phone: "+1 234 567 8906",
      status: "inactive",
      assignedConcerts: 0,
      availability: "unavailable",
      skills: ["Video Production", "Live Streaming", "Camera Operation"],
    },
  ]);

  const [pendingInvitations] = useState<TeamInvitation[]>([
    {
      id: 1,
      email: "john.doe@example.com",
      role: "Stage Manager",
      status: "pending",
      invitedAt: new Date().toISOString(),
    },
  ]);

  const filteredMembers = searchQuery
    ? teamMembers.filter(
        (member) =>
          member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : teamMembers;

  const handleInviteMember = (email: string) => {
    console.log("Inviting member:", email);
    setIsInviteDialogOpen(false);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMember) {
      setIsDeleting(true);
      setTimeout(() => {
        setTeamMembers(teamMembers.filter((m) => m.id !== selectedMember.id));
        setIsDeleteDialogOpen(false);
        setSelectedMember(null);
        setIsDeleting(false);
      }, 500);
    }
  };

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen bg-bg-secondary">
        <TeamHeader onInviteMember={() => setIsInviteDialogOpen(true)} />
        <TeamSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TeamList
          members={filteredMembers}
          pendingInvitations={pendingInvitations}
          searchQuery={searchQuery}
          onDeleteMember={handleDeleteMember}
        />
      </div>

      <InviteTeamMemberDialog
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInvite={handleInviteMember}
      />

      <DeleteTeamMemberDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        member={selectedMember}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
      />
    </AuthGuard>
  );
}

