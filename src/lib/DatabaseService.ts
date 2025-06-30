import { supabase } from '../supabase'
import { Database } from '../supabase'

const db = supabase

export const DatabaseService = {
  // ✅ Get Profile
  async getProfile(userId: string) {
    const { data, error } = await db
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },

  // ✅ Update Profile
  async updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
    const { data, error } = await db
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // ✅ Log Activity
  async logActivity(activity: Database['public']['Tables']['activities']['Insert']) {
    const { data, error } = await db
      .from('activities')
      .insert(activity)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // ✅ Get Activities for a user
  async getActivities(userId: string) {
    const { data, error } = await db
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
    if (error) throw error
    return data
  },

  // ✅ Get Achievements
  async getAchievements(userId: string) {
    const { data, error } = await db
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // ✅ Get Challenges
  async getChallenges() {
    const { data, error } = await db.from('challenges').select('*')
    if (error) throw error
    return data
  },

  // ✅ Join a Challenge
  async joinChallenge(userId: string, challengeId: string) {
    const { data, error } = await db
      .from('activities')
      .insert({
        user_id: userId,
        category: 'challenge',
        type: challengeId,
        value: 1,
        co2_impact: 0,
        date: new Date().toISOString()
      })
      .select()
      .single()
    if (error) throw error
    return data
  }
}
