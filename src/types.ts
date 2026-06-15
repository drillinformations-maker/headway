export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Forex Basics' | 'Broker Reviews' | 'Trading Strategies' | 'Risk Management';
  status: 'draft' | 'published';
  authorName: string;
  authorBio: string;
  publishedAt: string;
  featuredImage: string;
  
  // SEO Configuration
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  canonicalUrl: string;
  schemaMarkup: string; // JSON-LD string
  
  // SEO Metrics
  seoScore: number;
  readabilityScore: number;
  keywordSuggestions: string[];
}

export interface PageSeoSettings {
  pageId: string; // 'home' | 'review' | 'forex' | 'trading' | 'disclosure'
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  schemaMarkup: string; // JSON-LD string
}

export interface AnalyticsMetric {
  pageviews: number;
  clicks: number;
  signups: number;
  ctr: number;
  dailyConversions: { date: string; clicks: number; signups: number }[];
  sourceDistribution: { source: string; value: number }[];
}
