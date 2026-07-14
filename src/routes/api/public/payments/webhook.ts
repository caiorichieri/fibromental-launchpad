import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhook, type StripeEnv } from "@/lib/stripe.server";

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  if (session.metadata?.product !== "corso_fibromental") return;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const email = session.customer_details?.email ?? session.customer_email;
  const firstName = session.metadata?.first_name ?? "";
  const lastName = session.metadata?.last_name ?? "";
  const profession = session.metadata?.profession ?? null;
  const orderNumber = session.metadata?.order_number ?? null;
  const amount = session.amount_total ?? 0;
  const currency = session.currency ?? "eur";

  if (!email) {
    console.error("checkout.session.completed missing email", session.id);
    return;
  }

  const { error: insertErr } = await supabaseAdmin
    .from("course_signups")
    .upsert(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        profession,
        order_number: orderNumber,
        amount_cents: amount,
        currency,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent ?? null,
        status: "paid",
      },
      { onConflict: "stripe_session_id" },
    );
  if (insertErr) console.error("course_signups upsert failed", insertErr);

  const amountLabel = `${(amount / 100).toLocaleString("it-IT", {
    style: "currency",
    currency: currency.toUpperCase(),
  })}`;

  const payload = {
    templateName: "course-confirmation",
    recipientEmail: email,
    idempotencyKey: `course-confirm-${session.id}`,
    templateData: { firstName, lastName, profession, orderNumber, amountLabel },
  };

  // Recipient copy
  const { error: e1 } = await supabaseAdmin.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload,
  });
  if (e1) console.error("enqueue recipient email failed", e1);

  // Admin BCC
  const { error: e2 } = await supabaseAdmin.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      ...payload,
      recipientEmail: "info@fibromental.it",
      idempotencyKey: `course-confirm-admin-${session.id}`,
    },
  });
  if (e2) console.error("enqueue admin email failed", e2);
}

async function handle(request: Request, env: StripeEnv) {
  const event = await verifyWebhook(request, env);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          return Response.json({ received: true, ignored: "invalid env" });
        }
        try {
          await handle(request, rawEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});