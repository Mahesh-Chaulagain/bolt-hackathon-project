import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
        }
        Update: {
          email?: string
          full_name?: string
          avatar_url?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          category: string
          type: string
          value: number
          co2_impact: number
          date: string
          created_at: string
        }
        Insert: {
          user_id: string
          category: string
          type: string
          value: number
          co2_impact: number
          date: string
        }
        Update: {
          category?: string
          type?: string
          value?: number
          co2_impact?: number
          date?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          badge_url: string
          nft_id?: string
          earned_at: string
        }
        Insert: {
          user_id: string
          title: string
          description: string
          badge_url: string
          nft_id?: string
        }
        Update: {
          title?: string
          description?: string
          badge_url?: string
          nft_id?: string
        }
      }
      challenges: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          target_value: number
          reward_tokens: number
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          title: string
          description: string
          type: string
          target_value: number
          reward_tokens: number
          start_date: string
          end_date: string
        }
        Update: {
          title?: string
          description?: string
          type?: string
          target_value?: number
          reward_tokens?: number
          start_date?: string
          end_date?: string
        }
      }
    }
  }
}