export const getYearFromDate = (dateString: string | null): string => {
  if (!dateString || dateString === null) {
    return 'Year Unknown';
  }

  const parts = dateString.split('-');
  return parts[0];
};
