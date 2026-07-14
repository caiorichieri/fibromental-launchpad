import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  firstName?: string;
  lastName?: string;
  profession?: string;
  orderNumber?: string;
  amountLabel?: string;
}

const CourseConfirmationEmail = ({
  firstName,
  lastName,
  profession,
  orderNumber,
  amountLabel,
}: Props) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "collega";
  return (
    <Html lang="it" dir="ltr">
      <Head />
      <Preview>Iscrizione confermata al corso clinico FibroMental</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>FibroMental</Heading>
          <Text style={sub}>Formazione clinica per psicologi e psicoterapeuti</Text>

          <Section style={card}>
            <Heading as="h2" style={h2}>
              Iscrizione confermata ✓
            </Heading>
            <Text style={paragraph}>
              Ciao {fullName}, grazie per esserti iscritta/o al{" "}
              <strong>Corso Clinico FibroMental</strong>. Il tuo pagamento è stato ricevuto correttamente.
            </Text>

            <Hr style={hr} />

            <Text style={detail}>
              <strong>Corso:</strong> Corso Clinico FibroMental — CBT, ACT, Mindfulness, VR
            </Text>
            {profession ? (
              <Text style={detail}>
                <strong>Professione:</strong> {profession}
              </Text>
            ) : null}
            {orderNumber ? (
              <Text style={detail}>
                <strong>Ordine / n. iscrizione:</strong> {orderNumber}
              </Text>
            ) : null}
            {amountLabel ? (
              <Text style={detail}>
                <strong>Importo:</strong> {amountLabel}
              </Text>
            ) : null}

            <Hr style={hr} />

            <Text style={paragraph}>
              Nei prossimi giorni riceverai un'email con i dettagli di accesso ai materiali,
              il calendario del corso e le indicazioni per l'attestato di partecipazione.
            </Text>

            <Text style={paragraph}>
              Per qualsiasi domanda scrivici a{" "}
              <a href="mailto:info@fibromental.it" style={link}>
                info@fibromental.it
              </a>
              .
            </Text>
          </Section>

          <Text style={footer}>
            FibroMental — MetaCare S.r.l.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: CourseConfirmationEmail,
  subject: "Iscrizione confermata — Corso Clinico FibroMental",
  displayName: "Corso FibroMental — Conferma iscrizione",
  previewData: {
    firstName: "Anna",
    lastName: "Rossi",
    profession: "Psicologa",
    orderNumber: "12345",
    amountLabel: "€ 80,00",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" };
const container = { padding: "24px", maxWidth: "560px", margin: "0 auto" };
const h1 = { color: "#3A0078", fontSize: "26px", margin: "0", fontWeight: 700 as const };
const sub = { color: "#666", fontSize: "13px", marginTop: "4px" };
const card = {
  backgroundColor: "#faf7ff",
  border: "1px solid #ebe3fb",
  borderRadius: "12px",
  padding: "24px",
  marginTop: "20px",
};
const h2 = { color: "#F37021", fontSize: "20px", margin: "0 0 8px 0" };
const paragraph = { color: "#1f2937", fontSize: "15px", lineHeight: "1.6" };
const detail = { color: "#1f2937", fontSize: "14px", lineHeight: "1.6", margin: "4px 0" };
const hr = { borderColor: "#ebe3fb", margin: "16px 0" };
const link = { color: "#3A0078", textDecoration: "underline" };
const footer = { color: "#94a3b8", fontSize: "12px", textAlign: "center" as const, marginTop: "20px" };