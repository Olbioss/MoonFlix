import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useUser } from "./user.queries";
import userApi from "../modules/user.api";

vi.mock("../modules/user.api", () => ({
  default: { getInfo: vi.fn() },
}));

const wrapper = (client: QueryClient) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };

describe("useUser", () => {
  beforeEach(() => localStorage.clear());

  it("is disabled without a token", () => {
    const client = new QueryClient();
    const { result } = renderHook(() => useUser(), {
      wrapper: wrapper(client),
    });
    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches the profile when a token is present", async () => {
    localStorage.setItem("actkn", "tkn");
    vi.mocked(userApi.getInfo).mockResolvedValue({
      response: { id: "1", username: "u", displayName: "d" },
    });
    const client = new QueryClient();
    const { result } = renderHook(() => useUser(), {
      wrapper: wrapper(client),
    });
    await waitFor(() => expect(result.current.data?.id).toBe("1"));
  });
});
