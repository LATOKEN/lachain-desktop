import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export function useAnalytics() {
  return Analytics({
    app: 'lachain-desktop',
    plugins: [
      googleAnalytics({
        trackingId: 'UA-198032624-1',
        customDimensions: {
          buttonName: 'dimension1',
        },
      }),
    ],
  })
}
