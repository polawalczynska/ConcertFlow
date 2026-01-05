import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { concertApi } from "~/lib/api-client";
import type { CancelConcertRequest, ConcertRequest, GetAllConcertsStatusEnum } from "~/api";

export function useConcerts(
  status?: GetAllConcertsStatusEnum,
  artistId?: number,
  coordinatorId?: number,
  search?: string,
  page = 0,
  pageSize = 100
) {
  return useQuery({
    queryKey: ["concerts", status, artistId, coordinatorId, search, page, pageSize],
    queryFn: async () => {
      const response = await concertApi.getAllConcerts(status, artistId, coordinatorId, search, page, pageSize);
      return response.data;
    },
  });
}

export function useConcert(id: number) {
  return useQuery({
    queryKey: ["concert", id],
    queryFn: async () => {
      const response = await concertApi.getConcertById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateConcert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (concertRequest: ConcertRequest): Promise<void> => {
      await concertApi.createConcert(concertRequest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateConcert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      concertRequest,
    }: {
      id: number;
      concertRequest: ConcertRequest;
    }): Promise<void> => {
      await concertApi.updateConcert(id, concertRequest);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["concert", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useDeleteConcert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await concertApi.deleteConcert(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useCancelConcert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      cancellationReason,
    }: {
      id: number;
      cancellationReason: string;
    }): Promise<void> => {
      const request: CancelConcertRequest = { cancellationReason };
      await concertApi.cancelConcert(id, request);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["concert", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

