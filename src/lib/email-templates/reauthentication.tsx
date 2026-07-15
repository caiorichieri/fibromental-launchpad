import * as React from 'react'
import { Body, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { Shell, styles } from './_brand'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Il tuo codice di verifica</Preview>
    <Body style={styles.main}>
      <Shell>
        <Heading style={styles.h1}>Conferma la tua identità</Heading>
        <Text style={styles.text}>Utilizza il codice qui sotto per confermare la tua identità:</Text>
        <Text style={styles.code}>{token}</Text>
        <Text style={styles.small}>
          Il codice scadrà a breve. Se non hai richiesto tu questa operazione, puoi ignorare questa email.
        </Text>
      </Shell>
    </Body>
  </Html>
)

export default ReauthenticationEmail
