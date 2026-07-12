import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../modules/user.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import type { User } from "../../types";

type SigninValues = { username: string; password: string };
type SignupValues = SigninValues & {
  confirmPassword: string;
  displayName: string;
};
type PasswordValues = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const useUser = () =>
  useQuery({
    queryKey: queryKeys.user,
    queryFn: () => unwrap<User>(userApi.getInfo()),
    enabled: !!localStorage.getItem("actkn"),
    staleTime: 1000 * 60 * 5,
    // A failed session probe (e.g. an expired token → 401) just means "logged
    // out"; it must not surface as an error toast. See queryClient.ts.
    meta: { silenceToast: true },
  });

export const useLogout = () => {
  const qc = useQueryClient();
  return () => {
    localStorage.removeItem("actkn");
    qc.setQueryData(queryKeys.user, null);
    qc.removeQueries({ queryKey: queryKeys.favorites });
  };
};

export const useSignin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: SigninValues) => unwrap<User>(userApi.signin(values)),
    onSuccess: (user) => {
      if (user.token) localStorage.setItem("actkn", user.token);
      qc.setQueryData(queryKeys.user, user);
    },
  });
};

export const useSignup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: SignupValues) => unwrap<User>(userApi.signup(values)),
    onSuccess: (user) => {
      if (user.token) localStorage.setItem("actkn", user.token);
      qc.setQueryData(queryKeys.user, user);
    },
  });
};

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (values: PasswordValues) =>
      unwrap(userApi.passwordUpdate(values)),
  });
