import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Commission } from "@/types";

type DealPipelineTableProps = {
  commissions: Commission[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function DealPipelineTable({ commissions }: DealPipelineTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Funded Date</TableHead>
          <TableHead>Loan Amount</TableHead>
          <TableHead>Loan Type</TableHead>
          <TableHead>Lender</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>Broker</TableHead>
          <TableHead>Broker Commission</TableHead>
          <TableHead>Processing Fees</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              No commission data available.
            </TableCell>
          </TableRow>
        ) : (
          commissions.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.fundedDate.toLocaleDateString()}</TableCell>
              <TableCell>{formatCurrency(c.loanAmount)}</TableCell>
              <TableCell className="capitalize">{c.loanType}</TableCell>
              <TableCell>{c.lender}</TableCell>
              <TableCell>{formatCurrency(c.commission)}</TableCell>
              <TableCell>{c.broker || "N/A"}</TableCell>
              <TableCell>
                {c.brokerCommission ? formatCurrency(c.brokerCommission) : "N/A"}
              </TableCell>
              <TableCell>{formatCurrency(c.processingFees)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}