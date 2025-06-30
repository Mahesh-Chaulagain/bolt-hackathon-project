export interface ActivityData {
  category: string
  type: string
  value: number
  unit: string
}

export interface CarbonCalculation {
  co2Amount: number
  unit: string
  category: string
}

export class CarbonCalculatorService {
  // Emission factors (kg CO2 per unit)
  private emissionFactors = {
    transportation: {
      car_gasoline: 0.21, // kg CO2 per km
      car_diesel: 0.17,
      car_electric: 0.05,
      bus: 0.08,
      train: 0.04,
      plane_domestic: 0.25,
      plane_international: 0.15,
      motorcycle: 0.12,
      bicycle: 0,
      walking: 0
    },
    energy: {
      electricity: 0.5, // kg CO2 per kWh
      natural_gas: 2.0, // kg CO2 per cubic meter
      heating_oil: 2.7, // kg CO2 per liter
      propane: 1.5 // kg CO2 per liter
    },
    food: {
      beef: 27.0, // kg CO2 per kg
      pork: 12.1,
      chicken: 6.9,
      fish: 6.1,
      dairy: 3.2,
      vegetables: 2.0,
      fruits: 1.1,
      grains: 2.7,
      plant_based_meal: 1.5,
      processed_food: 4.5
    },
    waste: {
      general_waste: 0.5, // kg CO2 per kg
      recycling: -0.1, // negative because it saves emissions
      composting: -0.2,
      electronic_waste: 1.2
    },
    consumption: {
      clothing_new: 8.0, // kg CO2 per item
      clothing_secondhand: 2.0,
      electronics: 300.0, // kg CO2 per device
      books: 1.0,
      furniture: 50.0
    }
  }

  calculateCarbonFootprint(activity: ActivityData): CarbonCalculation {
    const { category, type, value } = activity
    
    let emissionFactor = 0
    
    if (category in this.emissionFactors) {
      const categoryFactors = this.emissionFactors[category as keyof typeof this.emissionFactors]
      if (type in categoryFactors) {
        emissionFactor = categoryFactors[type as keyof typeof categoryFactors]
      }
    }
    
    const co2Amount = value * emissionFactor
    
    return {
      co2Amount: Math.round(co2Amount * 100) / 100, // Round to 2 decimal places
      unit: 'kg CO2',
      category
    }
  }

  calculateDailyFootprint(activities: ActivityData[]): number {
    return activities.reduce((total, activity) => {
      const calculation = this.calculateCarbonFootprint(activity)
      return total + calculation.co2Amount
    }, 0)
  }

  calculateWeeklyFootprint(dailyActivities: ActivityData[][]): number {
    return dailyActivities.reduce((total, dayActivities) => {
      return total + this.calculateDailyFootprint(dayActivities)
    }, 0)
  }

  calculateMonthlyFootprint(weeklyFootprints: number[]): number {
    return weeklyFootprints.reduce((total, weekly) => total + weekly, 0)
  }

  getReductionSuggestions(activities: ActivityData[]): string[] {
    const suggestions: string[] = []
    
    activities.forEach(activity => {
      const { category, type, value } = activity
      
      switch (category) {
        case 'transportation':
          if (type.includes('car') && value > 20) {
            suggestions.push('Consider carpooling or using public transport for long trips')
          }
          if (type === 'plane_domestic' && value > 500) {
            suggestions.push('Try video conferencing instead of short flights')
          }
          break
          
        case 'energy':
          if (type === 'electricity' && value > 30) {
            suggestions.push('Switch to LED bulbs and unplug devices when not in use')
          }
          break
          
        case 'food':
          if (type === 'beef' && value > 0.5) {
            suggestions.push('Try reducing meat consumption by having one plant-based meal per day')
          }
          break
          
        case 'waste':
          if (type === 'general_waste' && value > 2) {
            suggestions.push('Increase recycling and composting to reduce general waste')
          }
          break
      }
    })
    
    return suggestions
  }

  getAverageFootprint(region: string = 'global'): number {
    // Average daily carbon footprints by region (kg CO2)
    const averages = {
      global: 12.0,
      usa: 16.0,
      europe: 8.5,
      asia: 7.2,
      africa: 3.1,
      oceania: 15.8
    }
    
    return averages[region as keyof typeof averages] || averages.global
  }

  compareToAverage(userFootprint: number, region: string = 'global'): {
    percentage: number
    status: 'above' | 'below' | 'average'
    message: string
  } {
    const average = this.getAverageFootprint(region)
    const percentage = Math.round(((userFootprint - average) / average) * 100)
    
    let status: 'above' | 'below' | 'average'
    let message: string
    
    if (Math.abs(percentage) <= 5) {
      status = 'average'
      message = `Your footprint is about average for ${region}`
    } else if (percentage > 0) {
      status = 'above'
      message = `Your footprint is ${percentage}% above the ${region} average`
    } else {
      status = 'below'
      message = `Your footprint is ${Math.abs(percentage)}% below the ${region} average - great job!`
    }
    
    return { percentage, status, message }
  }
}