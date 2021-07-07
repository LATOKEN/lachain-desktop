import ReactGA from 'react-ga'

/**
 * useAnalytics  for connect google analytics
 * and send errors to google analytics
 * @trackingCode from google analytics
 * */

export function useAnalytics() {
  function setAnalytics(category, actionName, error) {
    ReactGA.initialize('UA-198032624-1')
    ReactGA.event({category, action: actionName, label: error})
  }
  function setAnalyticBasePath(path) {
    ReactGA.pageview(path)
  }
  return {setAnalytics, setAnalyticBasePath}
}
