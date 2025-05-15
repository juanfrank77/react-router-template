import { getHintUtils } from '@epic-web/client-hints'
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme'
import {
  clientHint as reducedMotionHint,
  subscribeToMotionChange,
} from '@epic-web/client-hints/reduced-motion'
import { clientHint as timezoneHint } from '@epic-web/client-hints/time-zone'
import { useEffect } from 'react'
import { useRevalidator } from 'react-router'

export const { getHints, getClientHintCheckScript } = getHintUtils({
  theme: colorSchemeHint,
  timezone: timezoneHint,
  reducedMotion: reducedMotionHint,
})

//Utility component used to check the client hints on the client and send them to the server
export function ClientHintCheck({ nonce }: { nonce?: string }) {
  const { revalidate } = useRevalidator()

  useEffect(() => {
    subscribeToSchemeChange(() => revalidate())
  }, [revalidate])

  useEffect(() => {
    subscribeToMotionChange(() => revalidate())
  }, [revalidate])

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: getClientHintCheckScript(),
      }}
    />
  )
}
