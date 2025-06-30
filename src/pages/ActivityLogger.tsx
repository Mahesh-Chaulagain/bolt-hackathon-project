import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Car, Zap, Utensils, Trash2, ShoppingBag, Save, Calculator, TreePine,  Home, Award,  HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { CarbonCalculatorService, type ActivityData } from '../services/carbon'
import toast from 'react-hot-toast'

const carbonCalculator = new CarbonCalculatorService()

interface PositiveAction {
  id: string
  name: string
  icon: React.ComponentType<any>
  formula: string
  inputType: 'number' | 'toggle'
  unit?: string
  co2SavedPerUnit: number
  yearlyAmount?: number
  description: string
}

const positiveActions: PositiveAction[] = [
  {
    id: 'plant_tree',
    name: 'Plant a Tree',
    icon: TreePine,
    formula: 'number_of_trees × 21 kg/year',
    inputType: 'number',
    unit: 'trees',
    co2SavedPerUnit: 21,
    description: 'Each tree absorbs approximately 21 kg of CO₂ per year'
  },
  {
    id: 'renewable_energy',
    name: 'Switched to Renewable Energy',
    icon: Zap,
    formula: '2,250 kg/year (average)',
    inputType: 'toggle',
    co2SavedPerUnit: 2250,
    yearlyAmount: 2250,
    description: 'Switching to renewable energy saves 1,500-3,000 kg CO₂ annually'
  },
  {
    id: 'home_insulation',
    name: 'Home Insulation Improvement',
    icon: Home,
    formula: '500 kg/year',
    inputType: 'toggle',
    co2SavedPerUnit: 500,
    yearlyAmount: 500,
    description: 'Improved home insulation saves 500 kg CO₂ annually'
  }
]

export default function ActivityLogger() {
  const [selectedCategory, setSelectedCategory] = useState('transportation')
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [positiveActionValues, setPositiveActionValues] = useState<Record<string, any>>({})
  const [positiveActionsSaved, setPositiveActionsSaved] = useState<any[]>([])
  const [showCO2Info, setShowCO2Info] = useState(false)
  const [currentActivity, setCurrentActivity] = useState<Partial<ActivityData>>({
    category: 'transportation',
    type: '',
    value: 0,
    unit: 'km'
  })

  useEffect(() => {
    // Load existing activities from localStorage
    const savedActivities = JSON.parse(localStorage.getItem('userActivities') || '[]')
    const savedPositiveActions = JSON.parse(localStorage.getItem('userPositiveActions') || '[]')
    setActivities(savedActivities)
    setPositiveActionsSaved(savedPositiveActions)
  }, [])

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: Car, color: 'bg-blue-500' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'bg-yellow-500' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'bg-green-500' },
    { id: 'waste', name: 'Waste', icon: Trash2, color: 'bg-red-500' },
    { id: 'consumption', name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-500' },
    { id: 'positive', name: 'Positive Actions', icon: Award, color: 'bg-eco-500' }
  ]

  const activityTypes = {
    transportation: [
      { id: 'car_gasoline', name: 'Car (Gasoline)', unit: 'km' },
      { id: 'car_diesel', name: 'Car (Diesel)', unit: 'km' },
      { id: 'car_electric', name: 'Car (Electric)', unit: 'km' },
      { id: 'bus', name: 'Bus', unit: 'km' },
      { id: 'train', name: 'Train', unit: 'km' },
      { id: 'plane_domestic', name: 'Flight (Domestic)', unit: 'km' },
      { id: 'plane_international', name: 'Flight (International)', unit: 'km' },
      { id: 'motorcycle', name: 'Motorcycle', unit: 'km' },
      { id: 'bicycle', name: 'Bicycle', unit: 'km' },
      { id: 'walking', name: 'Walking', unit: 'km' }
    ],
    energy: [
      { id: 'electricity', name: 'Electricity', unit: 'kWh' },
      { id: 'natural_gas', name: 'Natural Gas', unit: 'm³' },
      { id: 'heating_oil', name: 'Heating Oil', unit: 'L' },
      { id: 'propane', name: 'Propane', unit: 'L' }
    ],
    food: [
      { id: 'beef', name: 'Beef', unit: 'kg' },
      { id: 'pork', name: 'Pork', unit: 'kg' },
      { id: 'chicken', name: 'Chicken', unit: 'kg' },
      { id: 'fish', name: 'Fish', unit: 'kg' },
      { id: 'dairy', name: 'Dairy Products', unit: 'kg' },
      { id: 'vegetables', name: 'Vegetables', unit: 'kg' },
      { id: 'fruits', name: 'Fruits', unit: 'kg' },
      { id: 'grains', name: 'Grains', unit: 'kg' },
      { id: 'plant_based_meal', name: 'Plant-based Meal', unit: 'meals' },
      { id: 'processed_food', name: 'Processed Food', unit: 'kg' }
    ],
    waste: [
      { id: 'general_waste', name: 'General Waste', unit: 'kg' },
      { id: 'recycling', name: 'Recycling', unit: 'kg' },
      { id: 'composting', name: 'Composting', unit: 'kg' },
      { id: 'electronic_waste', name: 'E-waste', unit: 'kg' }
    ],
    consumption: [
      { id: 'clothing_new', name: 'New Clothing', unit: 'items' },
      { id: 'clothing_secondhand', name: 'Secondhand Clothing', unit: 'items' },
      { id: 'electronics', name: 'Electronics', unit: 'items' },
      { id: 'books', name: 'Books', unit: 'items' },
      { id: 'furniture', name: 'Furniture', unit: 'items' }
    ]
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    if (categoryId !== 'positive') {
      setCurrentActivity({
        category: categoryId,
        type: '',
        value: 0,
        unit: activityTypes[categoryId as keyof typeof activityTypes][0]?.unit || 'units'
      })
    }
  }

  const handleTypeChange = (typeId: string) => {
    const type = activityTypes[selectedCategory as keyof typeof activityTypes].find(t => t.id === typeId)
    setCurrentActivity({
      ...currentActivity,
      type: typeId,
      unit: type?.unit || 'units'
    })
  }

  const handleValueChange = (value: number) => {
    setCurrentActivity({
      ...currentActivity,
      value
    })
  }

  const handlePositiveActionChange = (actionId: string, value: any) => {
    setPositiveActionValues(prev => ({
      ...prev,
      [actionId]: value
    }))
  }

  const calculatePositiveActionSavings = (action: PositiveAction, value: any) => {
    if (!value) return 0

    switch (action.inputType) {
      case 'number':
        return value * action.co2SavedPerUnit
      case 'toggle':
        return value ? action.co2SavedPerUnit : 0
      default:
        return 0
    }
  }

  const calculateImpact = () => {
    if (!currentActivity.type || !currentActivity.value) return null
    
    const activity: ActivityData = {
      category: currentActivity.category!,
      type: currentActivity.type,
      value: currentActivity.value,
      unit: currentActivity.unit!
    }
    
    return carbonCalculator.calculateCarbonFootprint(activity)
  }

  const addActivity = () => {
    if (!currentActivity.type || !currentActivity.value) {
      toast.error('Please fill in all fields')
      return
    }

    const activity: ActivityData = {
      category: currentActivity.category!,
      type: currentActivity.type,
      value: currentActivity.value,
      unit: currentActivity.unit!
    }

    const calculation = carbonCalculator.calculateCarbonFootprint(activity)
    
    // Create activity with CO2 impact and date
    const activityWithImpact = {
      ...activity,
      co2_impact: calculation.co2Amount,
      date: new Date().toISOString(),
      id: Date.now().toString()
    }

    const updatedActivities = [...activities, activityWithImpact]
    setActivities(updatedActivities)
    
    // Save to localStorage
    localStorage.setItem('userActivities', JSON.stringify(updatedActivities))
    
    // Reset form
    setCurrentActivity({
      category: selectedCategory,
      type: '',
      value: 0,
      unit: activityTypes[selectedCategory as keyof typeof activityTypes][0]?.unit || 'units'
    })
    
    toast.success(`Activity logged! CO2 impact: ${calculation.co2Amount} kg`)
  }

  const savePositiveAction = (action: PositiveAction) => {
    const value = positiveActionValues[action.id]
    if (!value) return

    const co2Saved = calculatePositiveActionSavings(action, value)
    
    if (co2Saved <= 0) {
      toast.error('Please enter a valid value')
      return
    }

    const positiveActionEntry = {
      id: Date.now().toString(),
      actionId: action.id,
      name: action.name,
      value: value,
      co2Saved: co2Saved,
      date: new Date().toISOString(),
      formula: action.formula,
      description: action.description
    }

    const updatedPositiveActions = [...positiveActionsSaved, positiveActionEntry]
    setPositiveActionsSaved(updatedPositiveActions)
    localStorage.setItem('userPositiveActions', JSON.stringify(updatedPositiveActions))

    // Reset the input
    setPositiveActionValues(prev => ({
      ...prev,
      [action.id]: action.inputType === 'number' ? 0 : false
    }))

    toast.success(`Positive action saved! CO2 saved: ${co2Saved.toFixed(3)} kg`)
  }

  const removeActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index)
    setActivities(updatedActivities)
    localStorage.setItem('userActivities', JSON.stringify(updatedActivities))
    toast.success('Activity removed')
  }

  const removePositiveAction = (index: number) => {
    const updatedPositiveActions = positiveActionsSaved.filter((_, i) => i !== index)
    setPositiveActionsSaved(updatedPositiveActions)
    localStorage.setItem('userPositiveActions', JSON.stringify(updatedPositiveActions))
    toast.success('Positive action removed')
  }

  const totalFootprint = activities.reduce((total, activity) => {
    return total + (activity.co2_impact || 0)
  }, 0)

  const totalSavings = positiveActionsSaved.reduce((total, action) => {
    return total + (action.co2Saved || 0)
  }, 0)

  const netFootprint = totalFootprint - totalSavings

  const currentImpact = calculateImpact()

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Activity Logger</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Track your daily activities and positive environmental actions to see their real-time impact
        </p>
      </motion.div>

      {/* Net Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-eco-500 to-green-600 rounded-2xl p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalFootprint.toFixed(1)} kg</div>
            <div className="text-eco-100">CO2 Emissions</div>
          </div>
          <div>
            <div className="text-2xl font-bold">-{totalSavings.toFixed(1)} kg</div>
            <div className="text-eco-100">CO2 Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{netFootprint.toFixed(1)} kg</div>
            <div className="text-eco-100">Net Impact</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{positiveActionsSaved.length}</div>
            <div className="text-eco-100">Positive Actions</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-eco-500 bg-eco-50 dark:bg-eco-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-eco-300 dark:hover:border-eco-600'
                  }`}
                >
                  <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <category.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Regular Activity Logging */}
          {selectedCategory !== 'positive' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="metric-card"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Log Activity</h3>
              
              <div className="space-y-4">
                {/* Activity Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity Type
                  </label>
                  <select
                    value={currentActivity.type || ''}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select activity type</option>
                    {activityTypes[selectedCategory as keyof typeof activityTypes]?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Value Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount ({currentActivity.unit})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={currentActivity.value || ''}
                    onChange={(e) => handleValueChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={`Enter amount in ${currentActivity.unit}`}
                  />
                </div>

                {/* Impact Preview */}
                {currentImpact && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-300">
                        Estimated Impact: +{currentImpact.co2Amount} {currentImpact.unit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Add Button */}
                <button
                  onClick={addActivity}
                  disabled={!currentActivity.type || !currentActivity.value}
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Log Activity
                </button>
              </div>
            </motion.div>
          )}

          {/* Positive Actions Section */}
          {selectedCategory === 'positive' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="metric-card"
            >
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Positive Actions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Log eco-friendly actions that reduce or offset your carbon emissions</p>
                </div>
              </div>

              <div className="space-y-6">
                {positiveActions.map((action) => {
                  const currentValue = positiveActionValues[action.id]
                  const estimatedSavings = calculatePositiveActionSavings(action, currentValue)

                  return (
                    <div key={action.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/10">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{action.description}</p>
                          <p className="text-xs text-green-700 dark:text-green-400 mb-3">Formula: {action.formula}</p>
                          
                          <div className="flex items-end space-x-4">
                            <div className="flex-1">
                              {action.inputType === 'number' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Number of {action.unit}
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={currentValue || ''}
                                    onChange={(e) => handlePositiveActionChange(action.id, parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder={`Enter number of ${action.unit}`}
                                  />
                                </div>
                              )}
                              
                              {action.inputType === 'toggle' && (
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={currentValue || false}
                                    onChange={(e) => handlePositiveActionChange(action.id, e.target.checked)}
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    I have implemented this
                                  </label>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-right">
                              {estimatedSavings > 0 && (
                                <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                  -{estimatedSavings.toFixed(3)} kg CO₂
                                </div>
                              )}
                              <button
                                onClick={() => savePositiveAction(action)}
                                disabled={!currentValue || estimatedSavings <= 0}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                              >
                                Save Action
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* CO2 Calculation Explanation - Collapsible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="metric-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">How CO₂ Calculations Work</h3>
              </div>
              <button
                onClick={() => setShowCO2Info(!showCO2Info)}
                className="flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {showCO2Info ? (
                  <>
                    Hide Details
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show Details
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </div>
            
            {showCO2Info && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Our carbon footprint calculations are based on scientifically validated emission factors from leading climate research organizations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Transportation</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                      <li>• Car (Gasoline): 0.21 kg CO₂/km</li>
                      <li>• Car (Electric): 0.05 kg CO₂/km</li>
                      <li>• Flight (Domestic): 0.25 kg CO₂/km</li>
                      <li>• Train: 0.04 kg CO₂/km</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Energy</h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                      <li>• Electricity: 0.5 kg CO₂/kWh</li>
                      <li>• Natural Gas: 2.0 kg CO₂/m³</li>
                      <li>• Heating Oil: 2.7 kg CO₂/L</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Food</h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                      <li>• Beef: 27.0 kg CO₂/kg</li>
                      <li>• Chicken: 6.9 kg CO₂/kg</li>
                      <li>• Vegetables: 2.0 kg CO₂/kg</li>
                      <li>• Plant-based meal: 1.5 kg CO₂/meal</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Waste</h4>
                    <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                      <li>• General Waste: 0.5 kg CO₂/kg</li>
                      <li>• Recycling: -0.1 kg CO₂/kg (saves)</li>
                      <li>• Composting: -0.2 kg CO₂/kg (saves)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Data Sources:</strong> IPCC Guidelines, EPA Emission Factors, DEFRA Carbon Factors, and peer-reviewed climate research.
                    Calculations include direct emissions and relevant indirect emissions (scope 1, 2, and key scope 3 emissions).
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Sidebar - Desktop: Same Row Layout */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Impact</h3>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  +{totalFootprint.toFixed(1)} kg
                </div>
                <div className="text-sm text-red-700 dark:text-red-400">CO2 Emissions</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  -{totalSavings.toFixed(1)} kg
                </div>
                <div className="text-sm text-green-700 dark:text-green-400">CO2 Saved</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {netFootprint.toFixed(1)} kg
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-400">Net Impact</div>
                <div className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                  {netFootprint < 0 ? 'Carbon Negative!' : netFootprint < 10 ? 'Great job!' : 'Room for improvement'}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {categories.filter(c => c.id !== 'positive').map((category) => {
                const categoryTotal = activities
                  .filter(a => a.category === category.id)
                  .reduce((total, activity) => {
                    return total + (activity.co2_impact || 0)
                  }, 0)

                if (categoryTotal === 0) return null

                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${category.color} rounded-full mr-2`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {categoryTotal.toFixed(1)} kg
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="metric-card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
            
            {activities.length === 0 && positiveActionsSaved.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No activities logged yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {/* Recent regular activities */}
                {activities.slice(-5).reverse().map((activity, index) => {
                  const category = categories.find(c => c.id === activity.category)
                  const type = activityTypes[activity.category as keyof typeof activityTypes]
                    ?.find(t => t.id === activity.type)

                  return (
                    <div key={activity.id || index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <div className={`w-2 h-2 ${category?.color} rounded-full mr-2`}></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {type?.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {activity.value} {activity.unit} • +{(activity.co2_impact || 0).toFixed(1)} kg CO2
                        </div>
                      </div>
                      <button
                        onClick={() => removeActivity(activities.length - 1 - index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
                
                {/* Recent positive actions */}
                {positiveActionsSaved.slice(-5).reverse().map((action, index) => (
                  <div key={action.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        -{action.co2Saved.toFixed(3)} kg CO2 saved
                      </div>
                    </div>
                    <button
                      onClick={() => removePositiveAction(positiveActionsSaved.length - 1 - index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Save Button */}
          {(activities.length > 0 || positiveActionsSaved.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button 
                onClick={() => toast.success('All activities and positive actions saved to your profile!')}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Today's Log
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}