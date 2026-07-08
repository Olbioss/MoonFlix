import { useQuery } from "@tanstack/react-query";
import personApi from "../modules/person.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import type { Media, Person } from "../../types";

export const usePerson = (personId: string) =>
  useQuery({
    queryKey: queryKeys.person(personId),
    queryFn: () => unwrap<Person>(personApi.detail({ personId })),
    enabled: !!personId,
  });

export const usePersonMedias = (personId: string) =>
  useQuery({
    queryKey: queryKeys.personMedias(personId),
    queryFn: () => unwrap<{ cast: Media[] }>(personApi.medias({ personId })),
    enabled: !!personId,
    select: (d) => d.cast,
  });
