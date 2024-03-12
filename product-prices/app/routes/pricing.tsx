import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PricingTable } from "~/components/pricing-table";
import { Button } from "~/components/ui/button";
import { getProductsWithPrices } from "~/services/stripe.server";

export const loader = async () => {
  const productsWithPrices = await getProductsWithPrices();
  return json({ productsWithPrices });
};

export default function PricingPage() {
  const { productsWithPrices } = useLoaderData<typeof loader>();
  return (
    <div className="p-8 text-center">
      <h1 className="mb-10 scroll-m-20 text-2xl font-extrabold lg:text-5xl">
        Pricing
      </h1>

      <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        {productsWithPrices.map((product) => (
          <div key={product.id} className="flex-1">
            <PricingTable productWithPricing={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
