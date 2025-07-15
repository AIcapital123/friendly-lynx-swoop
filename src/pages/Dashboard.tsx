import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DealPipelineTable } from "@/components/DealPipelineTable";
import { Commission } from "@/types";
import { DollarSign, Users, CreditCard } from "lucide-react";

const initialCommissions: Commission[] = [
  {
    id: '1',
    clientName: 'Innovate LLC',
    loanAmount: 350000,
    loanType: 'conventional',
    lender: 'Major Bank Corp',
    commission: 3500,
    broker: 'John Doe',
    brokerCommission: 1750,
    processingFees: 500,
    fundedDate: new Date('2024-07-15'),
  },
  {
    id: '2',
    clientName: 'Apex Solutions',
    loanAmount: 500000,
    loanType: 'jumbo',
    lender: 'Prestige Lenders',
    commission: 5000,
    processingFees: 750,
    fundedDate: new Date('2024-07-20'),
  },
];

const Dashboard = () => {
  const [commissions] = useState<Commission[]>(initialCommissions);

  const totalCommission = commissions.reduce((acc, c) => acc + c.commission, 0);
  const totalLoanAmount = commissions.reduce((acc, c) => acc + c.loanAmount, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Gross Commissions
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Based on {commissions.length} deals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Loan Volume
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</div>
               <p className="text-xs text-muted-foreground">
                Across all deals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{commissions.length}</div>
              <p className="text-xs text-muted-foreground">
                In the current pipeline
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>MTD Deal Pipeline</CardTitle>
            <CardDescription>
              Deals funded in the current month.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <DealPipelineTable commissions={commissions} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;