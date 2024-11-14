import { format } from 'date-fns';

export const formatDate = (dateString) => format(new Date(dateString), 'MMMM d, yyyy');
