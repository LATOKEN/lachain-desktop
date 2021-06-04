import ReactGA from 'react-ga'

export function useAnalytics() {
  ReactGA.initialize('UA-198032624-1')
  return ReactGA
}
