import * as React from 'react'
import { Body, Button, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { Shell, styles } from './_brand'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Reimposta la password di {siteName}</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Reimposta la password</Heading>
        <Text style={styles.text}>
          Abbiamo ricevuto una richiesta di reimpostazione della password per {siteName}.
          Clicca sul pulsante qui sotto per sceglierne una nuova.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>Reimposta password</Button>
        <Text style={styles.small}>
          Se non hai richiesto tu la reimpostazione, ignora questa email: la tua password resterà invariata.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default RecoveryEmail
