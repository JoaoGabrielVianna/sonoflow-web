export const formatDate = (date: Date, format: 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'long'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const day = String(date.getDate()).padStart(2, '0');
  
  const longMonthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  switch (format) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'long':
      return `${day} de ${longMonthNames[date.getMonth()]} de ${year}`;
    default:
      throw new Error('Formato de data desconhecido');
  }
};
