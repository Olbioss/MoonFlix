import { useEffect, type ReactNode } from "react";
import useAuthStore from "../../store/authStore";
import useUiStore from "../../store/uiStore";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);

  useEffect(() => {
    setAuthModalOpen(!user);
  }, [user, setAuthModalOpen]);

  return user ? children : null;
};

export default ProtectedPage;
