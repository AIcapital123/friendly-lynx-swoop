import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Commissions = () => {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Commissions Management</CardTitle>
          <CardDescription>
            View, edit, and manage all commission records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A full-featured table for commission management will be implemented here.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Commissions;