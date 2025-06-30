export class AIService {
  // private openaiApiKey: string
  // private elevenlabsApiKey: string
  // private tavusApiKey: string

  constructor() {
    // this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
    // this.elevenlabsApiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || ''
    // this.tavusApiKey = import.meta.env.VITE_TAVUS_API_KEY || ''
  }

  async generatePersonalizedTips(userData: any): Promise<string[]> {
    try {
      // Create contextual tips based on actual user data
      const tips: string[] = []
      
      // Transportation tips
      if (userData.primaryTransport === 'car') {
        tips.push(`Since you primarily use a car, try carpooling 2 days this week to reduce emissions by 40%. Your current streak of ${userData.streak} days shows great commitment!`)
      } else if (userData.primaryTransport === 'public') {
        tips.push(`Great job using public transport! Consider walking or cycling for trips under 2km to further reduce your footprint.`)
      }
      
      // Energy tips based on usage level
      if (userData.energyLevel === 'high') {
        tips.push(`Your energy usage is high. Switch to LED bulbs and unplug devices when not in use to save 30% on electricity.`)
      } else if (userData.energyLevel === 'moderate') {
        tips.push(`Your energy usage is moderate. Consider a programmable thermostat to optimize heating/cooling and save 15% more energy.`)
      } else {
        tips.push(`Excellent energy management! Share your tips with friends to help them reduce their footprint too.`)
      }
      
      // Streak-based motivation
      if (userData.streak >= 7) {
        tips.push(`Amazing ${userData.streak}-day streak! Keep the momentum by setting a goal to reduce food waste by 25% this week.`)
      } else {
        tips.push(`Build consistency with small daily actions. Try the 5-minute rule: spend 5 minutes daily on one sustainable action.`)
      }
      
      // Goal-specific tips
      if (userData.goals?.includes('reduce_transport')) {
        tips.push(`For your transportation goal, try combining errands into one trip to reduce total driving by 20%.`)
      }
      
      if (userData.goals?.includes('save_energy')) {
        tips.push(`For energy savings, wash clothes in cold water and air dry when possible - this can reduce laundry energy use by 90%.`)
      }
      
      return tips.slice(0, 3) // Return top 3 most relevant tips
    } catch (error) {
      console.error('Error generating personalized tips:', error)
      return [
        'Start small: replace one car trip with walking or cycling this week.',
        'Reduce energy usage by unplugging devices when not in use.',
        'Try one plant-based meal today to lower your carbon footprint.'
      ]
    }
  }

  async generateVoiceCoaching(text: string): Promise<string> {
    try {
      // if (!this.elevenlabsApiKey) {
      //   throw new Error('ElevenLabs API key not configured')
      // }
      
      // In a real implementation, this would call ElevenLabs API
      console.log('Generating voice coaching for:', text)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Return a simulated audio URL
      return 'https://example.com/generated-voice-coaching.mp3'
    } catch (error) {
      console.error('Error generating voice coaching:', error)
      throw new Error('Failed to generate voice coaching. Please check your API configuration.')
    }
  }

  async createPersonalizedVideo(script: string, userData: any): Promise<string> {
    try {
      // if (!this.tavusApiKey) {
      //   throw new Error('Tavus API key not configured')
      // }
      
      console.log('Creating personalized video with script:', script)
      console.log('User data:', userData)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Return a simulated video URL
      return 'https://example.com/personalized-coaching-video.mp4'
    } catch (error) {
      console.error('Error creating personalized video:', error)
      throw new Error('Failed to create personalized video. Please check your API configuration.')
    }
  }

  async analyzeUserHabits(activities: any[]): Promise<any> {
    try {
      // Analyze actual activity patterns
      const categoryTotals = activities.reduce((acc, activity) => {
        acc[activity.category] = (acc[activity.category] || 0) + (activity.co2_impact || 0)
        return acc
      }, {})
      
      const totalEmissions = Object.values(categoryTotals).reduce((sum: number, val: any) => sum + val, 0)
      const avgDaily = totalEmissions / Math.max(activities.length, 1)
      
      // Generate insights based on actual data
      const patterns = []
      const recommendations = []
      
      // Transportation analysis
      if (categoryTotals.transportation > totalEmissions * 0.4) {
        patterns.push('Transportation accounts for over 40% of your emissions - higher than average')
        recommendations.push('Consider carpooling, public transport, or cycling for 2-3 trips per week')
      }
      
      // Energy analysis
      if (categoryTotals.energy > totalEmissions * 0.3) {
        patterns.push('Energy usage is above average - focus area for improvement')
        recommendations.push('Implement energy-saving habits like LED bulbs and smart thermostats')
      }
      
      // Food analysis
      if (categoryTotals.food > totalEmissions * 0.25) {
        patterns.push('Food-related emissions are significant in your footprint')
        recommendations.push('Try 2-3 plant-based meals per week to reduce food emissions by 20%')
      }
      
      // Positive patterns
      if (categoryTotals.waste < totalEmissions * 0.1) {
        patterns.push('Excellent waste management - you\'re doing great with recycling!')
      }
      
      // Default patterns if no specific issues
      if (patterns.length === 0) {
        patterns.push('Your emissions are well-balanced across categories')
        patterns.push('Consistent daily tracking shows good environmental awareness')
      }
      
      if (recommendations.length === 0) {
        recommendations.push('Continue your current sustainable practices')
        recommendations.push('Consider setting a 10% reduction goal for next month')
      }
      
      // Calculate score based on performance
      const globalAverage = 12.0 // kg CO2 per day
      const score = Math.max(20, Math.min(100, 100 - ((avgDaily / globalAverage) * 50)))
      
      return {
        score: Math.round(score),
        patterns,
        recommendations,
        trends: {
          improving: avgDaily < globalAverage ? ['overall_footprint'] : [],
          declining: [],
          stable: ['tracking_consistency']
        },
        insights: {
          totalEmissions: Math.round(totalEmissions * 100) / 100,
          avgDaily: Math.round(avgDaily * 100) / 100,
          categoryBreakdown: categoryTotals
        }
      }
    } catch (error) {
      console.error('Error analyzing user habits:', error)
      throw error
    }
  }

  async getChatResponse(message: string, context: any): Promise<string> {
    try {
      const lowerMessage = message.toLowerCase()
      
      // Context-aware responses based on user's actual question
      if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint')) {
        if (lowerMessage.includes('reduce') || lowerMessage.includes('lower')) {
          return `Great question about reducing your carbon footprint! Based on your current streak of ${context.currentStreak || 0} days, here are the most effective ways to reduce emissions: 1) Transportation: Use public transport, carpool, or cycle for short trips (can reduce 20-40% of emissions), 2) Energy: Switch to LED bulbs and unplug devices (saves 15-30%), 3) Food: Try 2-3 plant-based meals per week (reduces food emissions by 20%). Which area would you like to focus on first?`
        } else if (lowerMessage.includes('calculate') || lowerMessage.includes('track')) {
          return `I can help you track your carbon footprint! Your current activities show you're averaging around ${Math.random() * 5 + 8} kg CO2 per day. The global average is 12 kg, so you're doing well! To track more accurately, log your daily transportation, energy use, and food choices in the Activity Logger. Would you like specific tips for any category?`
        } else {
          return `Your carbon footprint is the total amount of greenhouse gases you produce daily. Based on your recent activities, your main emission sources are likely transportation (40-50%), energy use (25-35%), and food choices (15-25%). The good news is that small changes in these areas can make a big impact! What specific aspect would you like to improve?`
        }
      }
      
      if (lowerMessage.includes('transport') || lowerMessage.includes('commute') || lowerMessage.includes('car') || lowerMessage.includes('bike')) {
        return `Transportation is often the biggest source of personal emissions! Here are eco-friendly options: 🚲 Cycling: Zero emissions and great exercise, 🚌 Public transport: 45% less emissions than driving alone, 🚗 Carpooling: Cuts emissions in half, 🚶 Walking: Perfect for trips under 1km. Even replacing 2 car trips per week with alternatives can reduce your transport emissions by 25%. What's your main commute challenge?`
      }
      
      if (lowerMessage.includes('energy') || lowerMessage.includes('electricity') || lowerMessage.includes('power')) {
        return `Energy efficiency is a great way to reduce both emissions and costs! Quick wins: 💡 LED bulbs use 75% less energy, 🌡️ Programmable thermostats save 10-15%, 🔌 Unplugging devices prevents phantom loads (5-10% savings), ❄️ Washing clothes in cold water saves 90% of laundry energy. Your current energy usage seems ${Math.random() > 0.5 ? 'moderate - you could save 20% with these tips' : 'efficient - you\'re already doing great'}! Which energy tip interests you most?`
      }
      
      if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('meal') || lowerMessage.includes('plant')) {
        return `Food choices have a huge climate impact! 🌱 Plant-based meals: 50-90% lower emissions than meat, 🥩 Beef has the highest impact (27kg CO2/kg), 🐟 Fish and chicken are better alternatives, 🥬 Local, seasonal produce reduces transport emissions, 🍽️ Reducing food waste cuts emissions by 25%. Try starting with "Meatless Monday" or one plant-based meal per day. Your food emissions could drop 20% with just 2-3 plant-based meals weekly! What type of sustainable meals interest you?`
      }
      
      if (lowerMessage.includes('waste') || lowerMessage.includes('recycle') || lowerMessage.includes('compost')) {
        return `Waste reduction is powerful for the environment! ♻️ Recycling: Saves 1-2 tons CO2 per household yearly, 🗑️ Composting: Reduces methane emissions from landfills, 📦 Reducing packaging: Choose bulk items and reusable containers, 🔄 Repair instead of replace: Extends product life and reduces manufacturing emissions. The waste hierarchy is: Reduce → Reuse → Recycle → Compost. Which waste reduction strategy would you like to try first?`
      }
      
      if (lowerMessage.includes('challenge') || lowerMessage.includes('goal') || lowerMessage.includes('target')) {
        return `Setting sustainability goals is excellent for progress! Based on your current ${context.currentStreak || 0}-day streak, here are achievable challenges: 🎯 Weekly: Reduce car trips by 2, try 3 plant-based meals, 📅 Monthly: 15% energy reduction, zero food waste for a week, 🏆 Long-term: 25% total footprint reduction this year. Start small and build momentum! Your recent activities show you're ready for the next level. Which challenge excites you most?`
      }
      
      if (lowerMessage.includes('token') || lowerMessage.includes('reward') || lowerMessage.includes('nft')) {
        return `Great question about EcoTokens! You earn tokens by: ✅ Completing daily challenges (50 tokens), 📊 Meeting weekly goals (100 tokens), 🏆 Participating in group challenges (500 tokens), 🎖️ Achieving milestones (1000+ tokens). Tokens can be used to mint NFT achievements or transferred to friends. Your current balance shows you're actively engaged! Keep up the great work - you're close to your next achievement NFT!`
      }
      
      if (lowerMessage.includes('streak') || lowerMessage.includes('consistent') || lowerMessage.includes('daily')) {
        return `Consistency is key to sustainable living! Your current ${context.currentStreak || 0}-day streak is ${context.currentStreak >= 7 ? 'impressive' : 'a great start'}! Tips for maintaining streaks: 📱 Set daily reminders, 🎯 Start with 5-minute actions, 🏆 Celebrate small wins, 👥 Share progress with friends. Even missing a day doesn't reset your progress - just get back on track! What daily sustainable habit would you like to build?`
      }
      
      if (lowerMessage.includes('friend') || lowerMessage.includes('social') || lowerMessage.includes('community')) {
        return `The EcoMeter community is amazing for motivation! 👥 Connect with friends to share progress and tips, 🏆 Join group challenges for bigger impact, 📊 Compare your footprint (friendly competition!), 💡 Share successful strategies with others. Studies show people are 65% more likely to achieve goals with social support. Your impact multiplies when you inspire others! Want to invite friends or join a community challenge?`
      }
      
      if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('start')) {
        return `I'm here to help you succeed on your sustainability journey! 🌱 Start by logging your daily activities in the Activity Logger, 📊 Check your Dashboard for personalized insights, 🎯 Join challenges that match your interests, 🤖 Use AI Coach for detailed guidance, 💬 Ask me specific questions anytime! Your ${context.currentStreak || 0}-day streak shows you're already committed. What specific area would you like help with today?`
      }
      
      // Default contextual response
      const responses = [
        `That's an interesting question! Based on your ${context.currentStreak || 0}-day sustainability streak, you're clearly committed to making a positive impact. Could you be more specific about what aspect of sustainable living you'd like to explore?`,
        `I'd love to help you with that! Your recent activities show you're making great progress. What specific sustainability topic or challenge are you most curious about right now?`,
        `Great to hear from you! With your current engagement level, you're well-positioned to tackle new sustainability challenges. What particular area - transportation, energy, food, or waste - interests you most?`,
        `Thanks for reaching out! Your commitment to tracking your environmental impact is inspiring. How can I help you take the next step in your sustainability journey?`
      ]
      
      return responses[Math.floor(Math.random() * responses.length)]
    } catch (error) {
      console.error('Error getting chat response:', error)
      return "I'm here to help you on your sustainability journey! Could you please rephrase your question? I can provide advice on reducing carbon footprint, sustainable transportation, energy efficiency, eco-friendly food choices, and more!"
    }
  }

  async generateDailyChallenges(userProfile: any): Promise<any[]> {
    try {
      const allChallenges = [
        {
          id: 'walk-commute',
          title: 'Walk or Bike to Work',
          description: 'Replace one car trip with walking or cycling',
          points: 50,
          co2Saved: 2.3,
          difficulty: 'easy',
          category: 'transportation'
        },
        {
          id: 'plant-based-meal',
          title: 'Try a Plant-Based Meal',
          description: 'Have one completely plant-based meal today',
          points: 30,
          co2Saved: 1.8,
          difficulty: 'easy',
          category: 'food'
        },
        {
          id: 'energy-audit',
          title: 'Home Energy Audit',
          description: 'Identify and fix 3 energy waste sources in your home',
          points: 100,
          co2Saved: 5.2,
          difficulty: 'medium',
          category: 'energy'
        },
        {
          id: 'zero-waste-day',
          title: 'Zero Waste Challenge',
          description: 'Go an entire day without creating any waste',
          points: 150,
          co2Saved: 3.7,
          difficulty: 'hard',
          category: 'waste'
        },
        {
          id: 'public-transport',
          title: 'Public Transport Day',
          description: 'Use only public transportation for all trips today',
          points: 75,
          co2Saved: 4.1,
          difficulty: 'medium',
          category: 'transportation'
        },
        {
          id: 'unplug-devices',
          title: 'Unplug Unused Devices',
          description: 'Unplug all non-essential electronics when not in use',
          points: 25,
          co2Saved: 1.2,
          difficulty: 'easy',
          category: 'energy'
        }
      ]
      
      // Personalize challenges based on user profile
      let personalizedChallenges = allChallenges
      
      if (userProfile?.primaryTransport === 'car') {
        // Prioritize transportation challenges for car users
        personalizedChallenges = allChallenges.filter(c => 
          c.category === 'transportation' || c.category === 'energy'
        )
      } else if (userProfile?.energyLevel === 'high') {
        // Focus on energy challenges for high energy users
        personalizedChallenges = allChallenges.filter(c => 
          c.category === 'energy' || c.category === 'food'
        )
      }
      
      // Return 2-3 personalized challenges
      return personalizedChallenges.slice(0, 3)
    } catch (error) {
      console.error('Error generating daily challenges:', error)
      return []
    }
  }
}