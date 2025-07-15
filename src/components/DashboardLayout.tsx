import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, DollarSign, CreditCard, Building, Landmark } from "lucide-react";
import { MadeWithDyad } from "./made-with-dyad";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Commissions", href: "/commissions", icon: DollarSign },
  { name: "Expenses", href: "/expenses", icon: CreditCard },
  { name: "Bank Sync", href: "/bank-sync", icon: Landmark },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navLinks = (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            location.pathname === item.href && "bg-muted text-primary"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="GoKapital" className="h-6 w-auto" />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">{navLinks}</div>
          <div className="mt-auto p-4">
            <MadeWithDyad />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex h-[60px] items-center border-b px-6">
                <Link to="/" className="flex items-center gap-2">
                  <img src="/logo.png" alt="GoKapital" className="h-6 w-auto" />
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">{navLinks}</div>
              <div className="mt-auto p-4">
                <MadeWithDyad />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Commission Dashboard</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  );
}