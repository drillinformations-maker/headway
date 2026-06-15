export const trackingUrl = "https://headway.partners/user/signup?hwp=e4e4f5";

export async function trackOutboundClick(anchorName: string, pageOrigin: string): Promise<void> {
  try {
    const payload = {
      page: pageOrigin,
      anchor: anchorName,
      url: trackingUrl
    };
    
    // Fire-and-forget back-end analytics register
    navigator.sendBeacon 
      ? navigator.sendBeacon('/api/analytics/track-click', JSON.stringify(payload))
      : fetch('/api/analytics/track-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        });
        
    console.log(`[Affiliate Analytics] Logged outbound click to: ${anchorName}`);
  } catch (error) {
    console.error('Click tracking event failure:', error);
  }
}

export function handleAffiliateRedirect(anchorName: string, pageOrigin: string) {
  trackOutboundClick(anchorName, pageOrigin);
  window.open(trackingUrl, '_blank', 'noopener,noreferrer');
}
