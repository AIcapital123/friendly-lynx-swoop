import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Expenses = () => {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Expenses Management</CardTitle>
          <CardDescription>
            Track and manage all business expenses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A full-featured table for expense management will be implemented here.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Expenses;