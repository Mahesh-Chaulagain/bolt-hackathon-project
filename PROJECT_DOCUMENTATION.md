# EcoMeter - Comprehensive Project Documentation

## 🌟 Project Overview

EcoMeter is a cutting-edge full-stack web application that combines sustainability tracking with Web3 technology and AI-powered coaching. Built with React, TypeScript, and Supabase, it offers users a comprehensive platform to track their carbon footprint, earn blockchain-verified rewards, and receive personalized AI guidance for sustainable living.

## 🏗️ Architecture Overview

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Build Tool**: Vite

### Backend Architecture
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **Security**: Row Level Security (RLS)

### Web3 Integration
- **Blockchain**: Algorand (TestNet for development)
- **SDK**: Algorand JavaScript SDK
- **Tokens**: EcoTokens (ASA - Algorand Standard Assets)
- **NFTs**: Achievement-based NFT minting
- **Wallet**: AlgoSigner/MyAlgo Connect integration

### AI Services
- **Chat AI**: OpenAI GPT for GreenGPT chat responses
- **Voice AI**: ElevenLabs for voice coaching
- **Video AI**: Tavus for personalized video content
- **Analytics**: Custom AI habit analysis

## 📱 Mobile Responsiveness

### Design Principles
- **Mobile-First**: Designed primarily for mobile devices
- **Touch-Friendly**: Minimum 44px touch targets
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Safe Areas**: Support for device notches and home indicators

### Mobile Features
- **Bottom Navigation**: Quick access to main features
- **Collapsible Sidebar**: Space-efficient navigation
- **Touch Gestures**: Swipe and tap interactions
- **Optimized Charts**: Mobile-friendly data visualization

### Breakpoints
- **Mobile**: 0-640px (sm)
- **Tablet**: 641-1024px (md)
- **Desktop**: 1025px+ (lg, xl)

## 🔧 Core Features

### 1. Carbon Footprint Tracking
**Location**: `src/pages/ActivityLogger.tsx`, `src/services/carbon.ts`

**Functionality**:
- Real-time CO2 calculation for various activities
- Category-based tracking (Transportation, Energy, Food, Waste, Consumption)
- Emission factors database with accurate calculations
- Daily, weekly, and monthly footprint aggregation

**Key Components**:
```typescript
// Carbon calculation service
export class CarbonCalculatorService {
  calculateCarbonFootprint(activity: ActivityData): CarbonCalculation
  getReductionSuggestions(activities: ActivityData[]): string[]
  compareToAverage(userFootprint: number, region: string)
}
```

### 2. AI-Powered Coaching (GreenGPT)
**Location**: `src/pages/AICoach.tsx`, `src/services/ai.ts`

**Features**:
- Personalized sustainability tips based on user data
- Voice coaching with ElevenLabs integration
- Video coaching with Tavus personalization
- Habit analysis and pattern recognition
- Interactive chat interface (ClimaChat)

**AI Service Methods**:
```typescript
export class AIService {
  generatePersonalizedTips(userData: any): Promise<string[]>
  generateVoiceCoaching(text: string): Promise<string>
  createPersonalizedVideo(script: string, userData: any): Promise<string>
  analyzeUserHabits(activities: any[]): Promise<any>
  getChatResponse(message: string, context: any): Promise<string>
}
```

### 3. Web3 Integration
**Location**: `src/pages/Web3Dashboard.tsx`, `src/services/algorand.ts`

**Blockchain Features**:
- EcoToken (ASA) creation and management
- NFT minting for achievements
- Wallet connection (AlgoSigner/MyAlgo)
- Token transfers and rewards
- Blockchain-verified achievements

**Algorand Service**:
```typescript
export class AlgorandService {
  connectWallet(): Promise<string>
  createEcoToken(): Promise<number>
  mintAchievementNFT(userAddress: string, achievementData: any): Promise<string>
  transferEcoTokens(from: string, to: string, amount: number): Promise<void>
  rewardUser(userAddress: string, amount: number, reason: string): Promise<void>
}
```

### 4. Social Features
**Location**: `src/pages/Social.tsx`

**Community Features**:
- Global leaderboards with regional rankings
- Friend connections and challenges
- Group challenges and competitions
- Activity sharing and social feed
- Achievement showcasing

### 5. Gamification System
**Location**: `src/pages/Challenges.tsx`

**Game Elements**:
- Daily, weekly, and special challenges
- Point-based reward system
- Streak tracking and bonuses
- Achievement badges and NFTs
- Progress tracking and goals

## 🗄️ Database Schema

### Core Tables

#### Profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT,
  bio TEXT,
  sustainability_goals JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Activities
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  co2_impact NUMERIC NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Achievements
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  badge_url TEXT,
  nft_id TEXT,
  category TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Challenges
```sql
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  category TEXT,
  target_value NUMERIC,
  reward_tokens INTEGER,
  difficulty TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Challenge Participations
```sql
CREATE TABLE challenge_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  challenge_id UUID REFERENCES challenges(id),
  progress NUMERIC DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

## 🔐 Security Implementation

### Row Level Security (RLS)
All tables implement RLS policies to ensure data privacy:

```sql
-- Example RLS policy for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
```

### Authentication Flow
1. **Registration**: Email/password with Supabase Auth
2. **Email Verification**: Required before login
3. **Session Management**: Automatic token refresh
4. **Protected Routes**: Context-based route protection

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Eco-friendly greens with earth tones
- **Typography**: System fonts with responsive scaling
- **Spacing**: 8px grid system
- **Components**: Reusable, accessible components

### Responsive Design
- **Mobile Navigation**: Bottom tab bar for easy thumb access
- **Adaptive Layouts**: Grid systems that reflow on different screens
- **Touch Targets**: Minimum 44px for accessibility
- **Performance**: Optimized images and lazy loading

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Netlify Configuration
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
VITE_OPENAI_API_KEY=your_openai_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
VITE_TAVUS_API_KEY=your_tavus_key

# Algorand
VITE_ALGORAND_NODE_URL=https://testnet-api.algonode.cloud
VITE_ALGORAND_INDEXER_URL=https://testnet-idx.algonode.cloud
```

## 📊 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Route-based lazy loading
- **Bundle Analysis**: Webpack bundle analyzer
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Service worker for offline functionality

### Database Optimization
- **Indexing**: Strategic indexes on frequently queried columns
- **Query Optimization**: Efficient joins and aggregations
- **Connection Pooling**: Supabase connection management
- **Real-time Subscriptions**: Selective data updates

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Example test for carbon calculator
describe('CarbonCalculatorService', () => {
  it('should calculate car emissions correctly', () => {
    const calculator = new CarbonCalculatorService()
    const result = calculator.calculateCarbonFootprint({
      category: 'transportation',
      type: 'car_gasoline',
      value: 100,
      unit: 'km'
    })
    expect(result.co2Amount).toBe(21) // 100km * 0.21 kg/km
  })
})
```

### Integration Testing
- **API Testing**: Supabase function testing
- **Component Testing**: React Testing Library
- **E2E Testing**: Cypress for user flows
- **Performance Testing**: Lighthouse CI

## 🔄 Data Flow

### User Activity Flow
1. **Activity Input** → Activity Logger
2. **Carbon Calculation** → Carbon Service
3. **Database Storage** → Supabase
4. **Real-time Updates** → Dashboard
5. **AI Analysis** → Personalized Tips
6. **Reward Calculation** → Token Distribution

### Web3 Integration Flow
1. **Wallet Connection** → Algorand Service
2. **Achievement Trigger** → NFT Minting
3. **Token Rewards** → ASA Transfer
4. **Blockchain Verification** → Transaction Confirmation

## 🎯 Future Enhancements

### Planned Features
1. **IoT Integration**: Smart device data collection
2. **Machine Learning**: Advanced pattern recognition
3. **Marketplace**: Carbon offset trading
4. **Mobile App**: React Native implementation
5. **Enterprise**: B2B sustainability tracking

### Scalability Considerations
- **Microservices**: Service decomposition
- **CDN**: Global content delivery
- **Database Sharding**: Horizontal scaling
- **Load Balancing**: Traffic distribution

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd ecometer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 📈 Analytics and Monitoring

### User Analytics
- **Activity Tracking**: User engagement metrics
- **Carbon Impact**: Aggregate environmental impact
- **Feature Usage**: Component interaction tracking
- **Performance Metrics**: Core Web Vitals

### Error Monitoring
- **Error Boundaries**: React error catching
- **Logging**: Structured application logging
- **Monitoring**: Real-time error tracking
- **Alerts**: Critical issue notifications

## 🤝 Contributing

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and approval

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Algorand Foundation**: Eco-friendly blockchain technology
- **Supabase**: Excellent backend-as-a-service platform
- **OpenAI**: Advanced AI capabilities
- **ElevenLabs**: Natural voice synthesis
- **Tavus**: Personalized video generation
- **Pexels**: High-quality stock photography

---

**EcoMeter** - Empowering sustainable living through technology 🌱

For technical support or questions, please refer to the repository issues or contact the development team.