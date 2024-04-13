'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export default function ChakraUIRenderer({ children }) {
  return (
    <ChakraProvider>
      <CacheProvider>{children}</CacheProvider>
    </ChakraProvider>
  )
}
