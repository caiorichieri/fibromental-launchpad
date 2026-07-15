import * as React from 'react'

import {
  Body,
  Button,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import { Shell, styles } from './_brand'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Conferma la tua email per {siteName}</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Conferma la tua email</Heading>
        <Text style={styles.text}>
          Grazie per esserti registrato su{' '}
          <Link href={siteUrl} style={styles.link}>
            <strong>{siteName}</strong>
          </Link>.
        </Text>
        <Text style={styles.text}>
          Conferma il tuo indirizzo email ({recipient}) cliccando sul pulsante qui sotto:
        </Text>
        <Button style={styles.button} href={confirmationUrl}>
          Conferma email
        </Button>
        <Text style={styles.small}>
          Se non hai creato tu un account, puoi ignorare questa email in tutta sicurezza.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default SignupEmail
