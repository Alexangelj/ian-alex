import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { Button, Spacer, createTheme, ThemeProvider } from 'react-neu'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    line-height: 1.5;
    margin: 0;
    max-width: 100%;
    overflow-x: initial !important;
    overflow-y: visible;
  }
  body {
    background-color: #040404;
    font-family: 'Nunito Sans', sans-serif;
  }
  body.fontLoaded {
    font-family: 'Nunito Sans', sans-serif;
  }
  #app {
    background-color: #040404;
    min-height: 100%;
    min-width: 100%;
  }
  span {
    color: white;
  }
`

const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

function Wallet() {
  const { activate } = useWeb3React()
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })

  return (
    <>
      <Spacer size="lg" />
      <StyledText>
        This interface requires a connection from the browser to Ethereum.
      </StyledText>
      <Spacer />
      <Button size="sm" text="Connect" onClick={() => activate(injected)} />
      <Spacer />
    </>
  )
}

function App() {
  const { error, active } = useWeb3React()
  const { dark, light } = createTheme({
    baseColor: { h: 0, s: 150, l: 15 },
    borderRadius: 16,
  })

  return (
    <>
      <GlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider darkTheme={dark} lightTheme={light}>
          <>
            <>
              {!active ? (
                <WaitingRoom>
                  <Wallet />
                </WaitingRoom>
              ) : (
                <></>
              )}
            </>
          </>
        </ThemeProvider>
      </Web3ReactProvider>
    </>
  )
}

const StyledText = styled.div`
  font-size: 18px;
`
const WaitingRoom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 36px;
  justify-content: center;
  min-height: calc(100vh - ${(props) => props.theme.barHeight * 2}px);
  width: 100%;
`

export default App
