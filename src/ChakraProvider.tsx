'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react'

export default function ChakraProvider({ children }) {
  return (
    <OriginalChakraProvider>
      <CacheProvider>{children}</CacheProvider>
    </OriginalChakraProvider>
  )
}
