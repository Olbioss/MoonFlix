import { useEffect, type ReactNode } from "react";
import useUiStore from "../../store/uiStore";
import { useUser } from "../../api/queries/user.queries";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useUser();
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);

  useEffect(() => {
    // Don't prompt for sign-in until the (possibly persisted) user query has
    // settled, to avoid flashing the auth modal during revalidation.
    if (!isLoading) setAuthModalOpen(!user);
  }, [user, isLoading, setAuthModalOpen]);

  return user ? children : null;
};

export default ProtectedPage;
