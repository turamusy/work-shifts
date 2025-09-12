
export interface IShift {
  id: string | number;
  logo?: string;
  address?: string;
  companyName?: string;
  dateStartByCity?: string;
  timeStartByCity?: string;
  timeEndByCity?: string;
  currentWorkers?: number;
  planWorkers?: number;
  workTypes?: {
    id: number;
    name: string;
    nameGt5?: string;
    nameLt5?: string;
    nameOne?: string;
  }[];
  priceWorker?: number;
  customerFeedbacksCount?: number;
  customerRating?: number;
};