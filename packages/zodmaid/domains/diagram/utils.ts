export const fixObject = (value: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(value).filter(([_, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        return false;
      }
      return true;
    })
  );
};
