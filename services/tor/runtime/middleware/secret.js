import { defineEventHandler, getRequestHeader, setResponseStatus } from 'h3'

import { createHash, timingSafeEqual } from 'node:crypto'

const digest = (value) => createHash('sha256').update(String(value)).digest()
// fail closed: an unset secret never matches; the sha256 digests are compared with timingSafeEqual
const sameSecret = (provided, expected) => Boolean(expected && provided) && timingSafeEqual(digest(provided), digest(expected))

export default defineEventHandler((event) => {

  const { torProxySecret } = useRuntimeConfig()
  const incomingSecretHeader = getRequestHeader(event, 'x-tor-proxy-secret')

  if (!sameSecret(incomingSecretHeader, torProxySecret)) {
    setResponseStatus(event, 403)
    return { error: 'Forbidden' }
  }
})
