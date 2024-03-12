import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const getProductsWithPrices = async () => {
  const { data: products } = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  const productWithPrices = await Promise.all(
    products.map(async (product) => {
      const { data: prices } = await stripe.prices.list({
        active: true,
        product: product.id,
      });

      return {
        ...product,
        prices,
      };
    })
  );

  const sortedProductsWithPrice = productWithPrices.sort((a, b) => {
    if (
      (a.default_price as Stripe.Price).unit_amount! <=
      (b.default_price as Stripe.Price).unit_amount!
    )
      return -1;
    else return 1;
  });

  return sortedProductsWithPrice;
};
