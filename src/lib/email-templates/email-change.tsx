import * as React from 'react'
import { Body, Button, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { Shell, styles } from './_brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Conferma il cambio email per {siteName}</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Conferma il cambio email</Heading>
        <Text style={styles.text}>
          Hai richiesto di cambiare l'indirizzo email su {siteName} da <strong>{oldEmail}</strong> a <strong>{newEmail}</strong>.
        </Text>
        <Text style={styles.text}>Clicca sul pulsante qui sotto per confermare il cambio:</Text>
        <Button style={styles.button} href={confirmationUrl}>Conferma cambio email</Button>
        <Text style={styles.small}>
          Se non hai richiesto tu questa modifica, ti consigliamo di proteggere subito il tuo account.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default EmailChangeEmail
