const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// "New" means released within the last 30 days (and not a future date).
export const isNewRelease = (date?: string | null): boolean => {
  if (!date) return false;
  const released = new Date(date).getTime();
  if (Number.isNaN(released)) return false;
  const age = Date.now() - released;
  return age >= 0 && age <= THIRTY_DAYS_MS;
};
