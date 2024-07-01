export const getYearFromDate = (dateString: string): string => {
  if (!dateString) {
    return 'Year Unknown';
  }

  const parts = dateString.split('-');
  return parts[0];
};
