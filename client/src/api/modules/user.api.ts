import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import type { ApiError, ApiResult, User } from "../../types";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<ApiResult<User>> => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  signup: async ({
    username,
    password,
    confirmPassword,
    displayName,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  }): Promise<ApiResult<User>> => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  getInfo: async (): Promise<ApiResult<User>> => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  passwordUpdate: async ({
    password,
    newPassword,
    confirmNewPassword,
  }: {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<ApiResult<unknown>> => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default userApi;
