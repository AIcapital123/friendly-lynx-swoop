import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { showSuccess } from "@/utils/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const commissionSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  loanAmount: z.coerce.number().min(1000, "Loan amount must be at least $1,000"),
  loanType: z.enum(["conventional", "fha", "va", "jumbo", "commercial"], {
    required_error: "You need to select a loan type.",
  }),
  lender: z.string().min(1, "Lender name is required"),
  commission: z.coerce.number().min(0, "Commission cannot be negative"),
  broker: z.string().optional(),
  brokerCommission: z.coerce.number().optional(),
  processingFees: z.coerce.number().default(0),
  fundedDate: z.date({ required_error: "Funded date is required." }),
});

type CommissionFormProps = {
  onSubmit: (data: z.infer<typeof commissionSchema>) => void;
};

const FormLabelWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
  <div className="flex items-center gap-1.5">
    <FormLabel>{label}</FormLabel>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-3 w-3 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export function CommissionForm({ onSubmit }: CommissionFormProps) {
  const form = useForm<z.infer<typeof commissionSchema>>({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      clientName: "",
      lender: "",
      broker: "",
    },
  });

  function handleFormSubmit(values: z.infer<typeof commissionSchema>) {
    onSubmit(values);
    showSuccess("New commission added successfully!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithTooltip label="Loan Amount" tooltip="The total amount of the loan." />
                <FormControl>
                  <Input type="number" placeholder="350000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="fha">FHA</SelectItem>
                    <SelectItem value="va">VA</SelectItem>
                    <SelectItem value="jumbo">Jumbo</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="lender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lender</FormLabel>
              <FormControl>
                <Input placeholder="Major Bank Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commission"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithTooltip label="Commission" tooltip="Total commission received for this deal." />
              <FormControl>
                <Input type="number" placeholder="3500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="broker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broker (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brokerCommission"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithTooltip label="Broker Commission" tooltip="Portion of the commission paid to the broker." />
                <FormControl>
                  <Input type="number" placeholder="1750" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="processingFees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processing Fees</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fundedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel>Funded Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-gokapital-green hover:bg-gokapital-green/90">Add Commission</Button>
      </form>
    </Form>
  );
}