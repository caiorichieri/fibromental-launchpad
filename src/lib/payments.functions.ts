import { createServerFn } from "@tanstack/react-start";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

type CheckoutResult = { clientSecret: string } | { error: string };

export const createCourseCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: {
    firstName: string;
    lastName: string;
    email: string;
    profession?: string;
    orderNumber?: string;
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    const first = (data.firstName ?? "").trim();
    const last = (data.lastName ?? "").trim();
    const email = (data.email ?? "").trim();
    if (!first || first.length > 80) throw new Error("Nome non valido");
    if (!last || last.length > 80) throw new Error("Cognome non valido");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
      throw new Error("Email non valida");
    return {
      ...data,
      firstName: first,
      lastName: last,
      email,
      profession: (data.profession ?? "").trim().slice(0, 120) || undefined,
      orderNumber: (data.orderNumber ?? "").trim().slice(0, 80) || undefined,
    };
  })
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: ["corso_fibromental_80"] });
      if (!prices.data.length) throw new Error("Prezzo del corso non trovato");
      const price = prices.data[0];

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer_email: data.email,
        payment_intent_data: {
          description: "Corso Clinico FibroMental",
        },
        metadata: {
          product: "corso_fibromental",
          first_name: data.firstName,
          last_name: data.lastName,
          profession: data.profession ?? "",
          order_number: data.orderNumber ?? "",
        },
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });