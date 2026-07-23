import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'draft' | 'completed'
  platform: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
}

export interface ContentItem {
  id: string
  title: string
  type: 'ad' | 'email' | 'social' | 'blog'
  content: string
  createdAt: string
}

interface AppState {
  campaigns: Campaign[]
  contentItems: ContentItem[]
  apiKey: string
  brandVoice: string
  setApiKey: (key: string) => void
  setBrandVoice: (voice: string) => void
  addContentItem: (item: ContentItem) => void
  addCampaign: (campaign: Campaign) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      campaigns: [
        {
          id: '1', name: 'Summer Sale 2026', status: 'active', platform: 'Google Ads',
          budget: 5000, spent: 2340, impressions: 45000, clicks: 1200, conversions: 89,
        },
        {
          id: '2', name: 'Brand Awareness Q3', status: 'active', platform: 'Facebook',
          budget: 3000, spent: 1500, impressions: 89000, clicks: 2300, conversions: 145,
        },
        {
          id: '3', name: 'Product Launch Email', status: 'draft', platform: 'Email',
          budget: 1000, spent: 0, impressions: 0, clicks: 0, conversions: 0,
        },
      ],
      contentItems: [],
      apiKey: '',
      brandVoice: 'Professional, friendly, and innovative',
      setApiKey: (apiKey) => set({ apiKey }),
      setBrandVoice: (brandVoice) => set({ brandVoice }),
      addContentItem: (item) => set((s) => ({ contentItems: [item, ...s.contentItems] })),
      addCampaign: (campaign) => set((s) => ({ campaigns: [...s.campaigns, campaign] })),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ apiKey: state.apiKey, brandVoice: state.brandVoice }),
    }
  )
)
