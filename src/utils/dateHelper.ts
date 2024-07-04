export const getYearFromDate = (dateString: string | null): string => {
  if (!dateString || dateString === null) {
    return 'Year Unknown';
  }

  const parts = dateString.split('-');
  return parts[0];
};

export const getFollowingYear = (): string => {
  const currentYear = new Date().getFullYear();
  return String(currentYear + 1);
};
