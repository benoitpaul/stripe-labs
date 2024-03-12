import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PricingTableProps {
  productWithPricing: {
    name: string;
    description: string | null;
    metadata: {
      [name: string]: string;
    };
    prices: {
      unit_amount: number | null;
      recurring: {
        interval: string;
      } | null;
    }[];
    features: {
      name?: string;
    }[];
  };
}

export const PricingTable = ({ productWithPricing }: PricingTableProps) => {
  const { name, description, features, metadata, prices } = productWithPricing;

  const montlyPrice = prices.find(
    (price) => price.recurring?.interval === "month",
  );
  const yearlyPrice = prices.find(
    (price) => price.recurring?.interval === "year",
  );

  const popular = metadata["popular"] === "true";

  return (
    <div className="mx-auto text-left">
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border",
          { "border-primary": popular },
        )}
      >
        <div className="flex flex-1 flex-col">
          <div className="px-6 py-10">
            <div className="mb-4 flex items-center justify-between ">
              <h3 className="text-2xl font-medium">{name}</h3>
              {popular && <Badge>Most popular</Badge>}
            </div>
            <h4 className="font-base mb-4 text-sm text-muted-foreground">
              {description}
            </h4>
            <div className="mb-4 flex items-end">
              <span className="flex items-start text-5xl tracking-tight">
                <span className="font-bold">
                  ${montlyPrice?.unit_amount / 100}
                </span>
              </span>
              <span className="text-xl font-medium text-muted-foreground">
                /month
              </span>
            </div>
            <div className="mb-8 flex">
              <span className="text-muted-foreground">
                ${yearlyPrice?.unit_amount / (100 * 12)} per month if paid
                annually
              </span>
            </div>

            <Button
              variant={popular ? "default" : "outline"}
              className="w-full"
            >
              Subscribe
            </Button>
          </div>

          {/* features */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon
                      className="text-primary-500 h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-3 text-sm font-normal text-muted-foreground">
                    {feature.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
