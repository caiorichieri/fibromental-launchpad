import * as React from 'react'
import { Container, Hr, Img, Section, Text } from '@react-email/components'

export const BRAND = {
  navy: '#7B2D8B',
  orange: '#E8820A',
  orangeLight: '#F5A030',
  cream: '#FFF8EF',
  ink: '#2A1B33',
  muted: '#6B5A73',
  border: 'rgba(123,45,139,0.15)',
  logoUrl: 'https://www.fibromental.it/fibromental-logo.png',
  siteUrl: 'https://www.fibromental.it',
  serif: 'Georgia, "Times New Roman", serif',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}

export const styles = {
  main: { backgroundColor: '#ffffff', fontFamily: BRAND.sans, margin: 0, padding: '32px 0' },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: `1px solid ${BRAND.border}`,
    overflow: 'hidden' as const,
  },
  header: {
    background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.orange} 100%)`,
    padding: '28px 32px',
    textAlign: 'center' as const,
  },
  logo: { margin: '0 auto', display: 'block' as const },
  body: { padding: '32px 32px 8px' },
  h1: {
    fontFamily: BRAND.serif,
    fontSize: '26px',
    fontWeight: 700 as const,
    color: BRAND.navy,
    lineHeight: 1.25,
    margin: '0 0 20px',
  },
  text: {
    fontSize: '15px',
    color: BRAND.ink,
    lineHeight: 1.6,
    margin: '0 0 20px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: BRAND.orange,
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600 as const,
    borderRadius: '10px',
    padding: '14px 26px',
    textDecoration: 'none',
    margin: '8px 0 24px',
  },
  link: { color: BRAND.navy, textDecoration: 'underline' },
  code: {
    fontFamily: 'Courier, monospace',
    fontSize: '28px',
    fontWeight: 700 as const,
    color: BRAND.navy,
    letterSpacing: '6px',
    backgroundColor: BRAND.cream,
    border: `1px solid ${BRAND.border}`,
    borderRadius: '10px',
    padding: '16px 20px',
    textAlign: 'center' as const,
    margin: '0 0 24px',
  },
  hr: { borderColor: BRAND.border, margin: '24px 0 16px' },
  small: { fontSize: '12px', color: BRAND.muted, lineHeight: 1.5, margin: '0 0 8px' },
  footer: {
    padding: '8px 32px 28px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    color: BRAND.muted,
    margin: '4px 0',
  },
  footerBrand: {
    fontFamily: BRAND.serif,
    fontSize: '13px',
    color: BRAND.navy,
    fontWeight: 600 as const,
    margin: '0 0 4px',
  },
}

export const BrandHeader = () => (
  <Section style={styles.header}>
    <Img
      src={BRAND.logoUrl}
      width="140"
      height="auto"
      alt="FibroMental"
      style={styles.logo}
    />
  </Section>
)

export const BrandFooter = () => (
  <Section style={styles.footer}>
    <Hr style={styles.hr} />
    <Text style={styles.footerBrand}>FibroMental</Text>
    <Text style={styles.footerText}>
      Il primo network italiano di psicologi specializzati in fibromialgia
    </Text>
    <Text style={styles.footerText}>fibromental.it</Text>
  </Section>
)

export const Shell = ({ children }: { children: React.ReactNode }) => (
  <Container style={styles.container}>
    <BrandHeader />
    <Section style={styles.body}>{children}</Section>
    <BrandFooter />
  </Container>
)