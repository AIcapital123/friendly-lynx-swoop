import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const TableHeadWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
  <TableHead>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center gap-1.5">{label}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </TableHead>
);

export function DealPipelineTable({ commissions }: DealPipelineTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHeadWithTooltip label="Loan Amount" tooltip="The total amount of the loan." />
          <TableHead>Loan Type</TableHead>
          <TableHead>Lender</TableHead>
          <TableHeadWithTooltip label="Commission" tooltip="Total commission received for this deal." />
          <TableHead>Broker</TableHead>
          <TableHeadWithTooltip label="Broker Comm." tooltip="Commission paid to the broker." />
          <TableHead>Proc. Fees</TableHead>
          <TableHead>Funded Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="h-24 text-center">
              No commission data available.
            </TableCell>
          </TableRow>
        ) : (
          commissions.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.clientName}</TableCell>
              <TableCell>{formatCurrency(c.loanAmount)}</TableCell>
              <TableCell className="capitalize">{c.loanType}</TableCell>
              <TableCell>{c.lender}</TableCell>
              <TableCell className="text-gokapital-green font-semibold">{formatCurrency(c.commission)}</TableCell>
              <TableCell>{c.broker || "N/A"}</TableCell>
              <TableCell>
                {c.brokerCommission ? formatCurrency(c.brokerCommission) : "N/A"}
              </TableCell>
              <TableCell>{formatCurrency(c.processingFees)}</TableCell>
              <TableCell>{c.fundedDate.toLocaleDateString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}