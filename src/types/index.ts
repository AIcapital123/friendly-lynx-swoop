export type Commission = {
  id: string;
  clientName: string;
  loanAmount: number;
  loanType: "conventional" | "fha" | "va" | "jumbo" | "commercial";
  lender: string;
  commission: number;
  broker?: string;
  brokerCommission?: number;
  processingFees: number;
  fundedDate: Date;
};