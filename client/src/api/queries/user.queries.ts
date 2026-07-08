import { useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../modules/user.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import type { User } from "../../types";

export const useUser = () =>
  useQuery({
    queryKey: queryKeys.user,
    queryFn: () => unwrap<User>(userApi.getInfo()),
    enabled: !!localStorage.getItem("actkn"),
    staleTime: 1000 * 60 * 5,
  });

export const useLogout = () => {
  const qc = useQueryClient();
  return () => {
    localStorage.removeItem("actkn");
    qc.setQueryData(queryKeys.user, null);
    qc.removeQueries({ queryKey: queryKeys.favorites });
  };
};
