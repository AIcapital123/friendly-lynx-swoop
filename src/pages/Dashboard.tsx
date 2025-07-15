import { useState } from "react";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommissionForm, commissionSchema } from "@/components/CommissionForm";
import { DealPipelineTable } from "@/components/DealPipelineTable";
import { Commission } from "@/types";

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
  const [commissions, setCommissions] = useState<Commission[]>(initialCommissions);

  function handleAddCommission(data: z.infer<typeof commissionSchema>) {
    const newCommission: Commission = {
      id: new Date().toISOString(),
      clientName: data.clientName,
      loanAmount: data.loanAmount,
      loanType: data.loanType,
      lender: data.lender,
      commission: data.commission,
      broker: data.broker,
      brokerCommission: data.brokerCommission,
      processingFees: data.processingFees,
      fundedDate: data.fundedDate,
    };
    setCommissions((prev) => [newCommission, ...prev]);
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-7">
        <div className="lg:col-span-3 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Commission Entry</CardTitle>
              <CardDescription>
                Add a new commission record manually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommissionForm onSubmit={handleAddCommission} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 xl:col-span-5">
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;