import * as React from 'react'
import { Body, Button, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import { Shell, styles } from './_brand'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Sei stato invitato su {siteName}</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Sei stato invitato</Heading>
        <Text style={styles.text}>
          Hai ricevuto un invito per unirti a{' '}
          <Link href={siteUrl} style={styles.link}><strong>{siteName}</strong></Link>.
          Clicca sul pulsante qui sotto per accettare l'invito e creare il tuo account.
        </Text>
        <Button style={styles.button} href={confirmationUrl}>Accetta invito</Button>
        <Text style={styles.small}>
          Se non ti aspettavi questo invito, puoi ignorare questa email in tutta sicurezza.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default InviteEmail
