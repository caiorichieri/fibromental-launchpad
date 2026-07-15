import * as React from 'react'
import { Body, Button, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { Shell, styles } from './_brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Il tuo link di accesso a {siteName}</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Il tuo link di accesso</Heading>
        <Text style={styles.text}>
          Clicca sul pulsante qui sotto per accedere a {siteName}. Il link scadrà a breve.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>Accedi</Button>
        <Text style={styles.small}>
          Se non hai richiesto tu questo link, puoi ignorare questa email in tutta sicurezza.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default MagicLinkEmail
