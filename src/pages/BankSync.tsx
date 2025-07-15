import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Landmark } from "lucide-react";

const BankSync = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
              <Landmark className="h-8 w-8" />
            </div>
            <CardTitle>Connect Your Bank Account</CardTitle>
            <CardDescription>
              Securely link your bank account using Plaid to automatically
              sync transactions and reconcile commission payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold">How it works:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Click "Connect with Plaid" below.</li>
                <li>Select your bank and enter your credentials.</li>
                <li>Your data is encrypted and secure.</li>
                <li>We'll start syncing your transactions.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gokapital-blue hover:bg-gokapital-blue/90">
              Connect with Plaid
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BankSync;