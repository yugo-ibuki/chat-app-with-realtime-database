'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function ChakraProvider({ children }: { children: ReactNode }) {
  return (
    <OriginalChakraProvider>
      <CacheProvider>{children}</CacheProvider>
    </OriginalChakraProvider>
  )
}
