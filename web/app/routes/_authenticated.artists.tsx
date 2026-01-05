import { useState, useEffect } from "react";
import { useArtists, useCreateArtist, useUpdateArtist, useDeleteArtist } from "~/hooks/useArtists";
import type { ArtistResponse, ArtistRequest } from "~/api";
import { AuthGuard } from "~/features/auth/components";
import { ArtistsHeader } from "~/routes/_authenticated.artists/components/ArtistsHeader";
import { ArtistsSearch } from "~/routes/_authenticated.artists/components/ArtistsSearch";
import { ArtistsList } from "~/routes/_authenticated.artists/components/ArtistsList";
import { ArtistFormDialog } from "~/routes/_authenticated.artists/components/form/ArtistFormDialog";
import { DeleteArtistDialog } from "~/routes/_authenticated.artists/components/DeleteArtistDialog";
import { artistSchema, extractApiError } from "~/shared/utils";

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistResponse | null>(null);
  const [formData, setFormData] = useState<ArtistRequest>({
    name: "",
    email: "",
    phone: "",
    genre: "",
    website: "",
    contactPerson: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { data: artists = [], isLoading } = useArtists(searchQuery || undefined);
  const createArtist = useCreateArtist();
  const updateArtist = useUpdateArtist();
  const deleteArtist = useDeleteArtist();

  useEffect(() => {
    if (createArtist.error) {
      const apiError = extractApiError(createArtist.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  }, [createArtist.error]);

  useEffect(() => {
    if (updateArtist.error) {
      const apiError = extractApiError(updateArtist.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  }, [updateArtist.error]);

  const filteredArtists = searchQuery
    ? artists.filter(
        (artist) =>
          artist.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : artists;

  const handleAddArtist = () => {
    setSelectedArtist(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      genre: "",
      website: "",
      contactPerson: "",
    });
    setFieldErrors({});
    setGeneralError(null);
    setIsFormOpen(true);
  };

  const handleEditArtist = (artist: ArtistResponse) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name || "",
      email: artist.email || "",
      phone: artist.phone || "",
      genre: artist.genre || "",
      website: artist.website || "",
      contactPerson: artist.contactPerson || "",
    });
    setFieldErrors({});
    setGeneralError(null);
    setIsFormOpen(true);
  };

  const handleDeleteArtist = (artist: ArtistResponse) => {
    setSelectedArtist(artist);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedArtist?.id) {
      deleteArtist.mutate(selectedArtist.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedArtist(null);
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const result = artistSchema.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          const field = issue.path[0] as string;
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    const normalizeWebsite = (url?: string): string | undefined => {
      if (!url) return undefined;
      const trimmed = url.trim();
      if (!trimmed) return undefined;
      if (!trimmed.match(/^https?:\/\//i)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    };

    const validatedData: ArtistRequest = {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || undefined,
      genre: result.data.genre || undefined,
      website: normalizeWebsite(result.data.website),
      contactPerson: result.data.contactPerson || undefined,
    };

    if (selectedArtist?.id) {
      updateArtist.mutate(
        { id: selectedArtist.id, artistRequest: validatedData },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setSelectedArtist(null);
            setFieldErrors({});
            setGeneralError(null);
          },
        }
      );
    } else {
      createArtist.mutate(validatedData, {
        onSuccess: () => {
          setIsFormOpen(false);
          setFieldErrors({});
          setGeneralError(null);
        },
      });
    }
  };

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <ArtistsHeader onAddArtist={handleAddArtist} />
        <ArtistsSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ArtistsList
          artists={filteredArtists}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onEdit={handleEditArtist}
          onDelete={handleDeleteArtist}
          onAddArtist={handleAddArtist}
        />
      </div>

      <ArtistFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedArtist={selectedArtist}
        formData={formData}
        formErrors={fieldErrors}
        generalError={generalError}
        isSubmitting={createArtist.isPending || updateArtist.isPending}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
      />

      <DeleteArtistDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        artist={selectedArtist}
        isDeleting={deleteArtist.isPending}
        onConfirm={confirmDelete}
      />
    </AuthGuard>
  );
}

