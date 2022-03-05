const dateWithHourOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

export function formatDate(date: Date | string): string | undefined {
  if (!date || new Date(date).toString() == 'Invalid Date') return;
  return new Date(date).toLocaleDateString("fr-FR", dateWithHourOptions);
}

