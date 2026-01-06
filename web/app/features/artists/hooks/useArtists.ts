import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { artistApi } from "~/lib/api-client";
import { isAuthenticated } from "~/shared/utils/helpers/token-storage";
import type { ArtistRequest } from "~/api";

export function useArtists(search?: string, page = 0, pageSize = 100) {
  return useQuery({
    queryKey: ["artists", search, page, pageSize],
    queryFn: async () => {
      const response = await artistApi.getAllArtists(search, page, pageSize);
      return response.data;
    },
    enabled: isAuthenticated(),
  });
}

export function useArtist(id: number) {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const response = await artistApi.getArtistById(id);
      return response.data;
    },
    enabled: isAuthenticated() && !!id,
  });
}

export function useCreateArtist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artistRequest: ArtistRequest): Promise<void> => {
      await artistApi.createArtist(artistRequest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
  });
}

export function useUpdateArtist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      artistRequest,
    }: {
      id: number;
      artistRequest: ArtistRequest;
    }): Promise<void> => {
      await artistApi.updateArtist(id, artistRequest);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      queryClient.invalidateQueries({ queryKey: ["artist", variables.id] });
    },
  });
}

export function useDeleteArtist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await artistApi.deleteArtist(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
  });
}

export function useSearchArtists(query: string) {
  return useQuery({
    queryKey: ["artists", "search", query],
    queryFn: async () => {
      const response = await artistApi.searchArtists(query);
      return response.data;
    },
    enabled: isAuthenticated() && query.length > 0,
  });
}

