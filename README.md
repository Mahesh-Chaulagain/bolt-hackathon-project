# EcoMeter - Carbon Footprint Tracking Platform

A comprehensive full-stack web application for tracking carbon footprints with Web3 features, AI coaching, and gamification elements.

## 🌟 Features

### Core Functionality
- **Real-time Carbon Tracking**: Track daily activities and calculate CO2 impact
- **Interactive Analytics**: Visualize your environmental impact with charts and insights
- **Goal Setting & Progress**: Set and track sustainability goals
- **Social Features**: Connect with eco-warriors worldwide

### Web3 Integration
- **Algorand Blockchain**: Secure, eco-friendly blockchain integration
- **EcoTokens**: Earn cryptocurrency rewards for sustainable actions
- **NFT Achievements**: Mint blockchain-verified achievement NFTs
- **Smart Contracts**: Transparent and verifiable reward system

### AI-Powered Features
- **GreenGPT Chat**: AI sustainability coach for personalized advice
- **Voice Coaching**: ElevenLabs-powered voice guidance
- **Video Coaching**: Tavus-generated personalized video content
- **Habit Analysis**: AI-driven insights into your sustainability patterns

### Gamification
- **Daily Challenges**: Engaging eco-friendly tasks
- **Achievement System**: Unlock badges and rewards
- **Global Leaderboards**: Compete with users worldwide
- **Streak Tracking**: Maintain consistency with streak rewards

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** database
- **Real-time subscriptions**
- **Row Level Security (RLS)**

### Web3 & Blockchain
- **Algorand SDK** for blockchain integration
- **AlgoKit Utils** for development tools
- **ASA (Algorand Standard Assets)** for tokens
- **NFT minting** capabilities

### AI Services
- **OpenAI GPT** for chat and insights
- **ElevenLabs** for voice generation
- **Tavus** for personalized video creation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecometer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys and configuration:
   - Supabase URL and anon key
   - OpenAI API key
   - ElevenLabs API key
   - Tavus API key

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Schema section)
   - Configure authentication settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The application uses the following main tables:

### Profiles
- User profile information
- Sustainability goals and preferences
- Avatar and bio data

### Activities
- Daily activity logging
- Carbon footprint calculations
- Category-based tracking

### Achievements
- User achievements and badges
- NFT integration data
- Unlock timestamps

### Challenges
- Global and personal challenges
- Reward structures
- Participation tracking

## 🔧 Configuration

### Supabase Setup
1. Create tables using the provided SQL migrations
2. Enable Row Level Security (RLS)
3. Configure authentication providers
4. Set up real-time subscriptions

### Algorand Integration
- Uses Algorand TestNet for development
- Supports wallet connection via AlgoSigner/MyAlgo
- Implements ASA for EcoTokens
- NFT minting for achievements

### AI Services Configuration
- **OpenAI**: For chat responses and habit analysis
- **ElevenLabs**: For voice coaching generation
- **Tavus**: For personalized video creation

## 🎮 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in
2. **Connect Wallet**: Link your Algorand wallet for Web3 features
3. **Log Activities**: Start tracking your daily carbon footprint
4. **Set Goals**: Define your sustainability targets
5. **Engage**: Participate in challenges and connect with friends

### Key Features
- **Activity Logger**: Input transportation, energy, food, and waste data
- **Analytics Dashboard**: View detailed insights and trends
- **AI Coach**: Get personalized sustainability advice
- **ClimaChat**: Interactive chat with GreenGPT
- **Web3 Dashboard**: Manage tokens and NFTs
- **Social Hub**: Connect with the global community

## 🌍 Environmental Impact

EcoMeter is built with sustainability in mind:
- **Algorand Blockchain**: Carbon-negative blockchain technology
- **Efficient Code**: Optimized for minimal energy consumption
- **Educational Focus**: Promotes environmental awareness
- **Real Impact**: Helps users reduce their actual carbon footprint

## 🔒 Security

- **Row Level Security**: Database-level access control
- **Secure Authentication**: Supabase Auth integration
- **Blockchain Security**: Algorand's proven security model
- **API Key Protection**: Environment variable configuration
- **Input Validation**: Comprehensive data validation

## 📱 Progressive Web App

EcoMeter is designed as a PWA with:
- **Offline Capability**: Core features work offline
- **Mobile Responsive**: Optimized for all devices
- **App-like Experience**: Native app feel in the browser
- **Push Notifications**: Stay engaged with reminders

## 🚀 Deployment

### Netlify Deployment
The application is configured for easy Netlify deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy automatically on push to main branch

### Environment Variables for Production
Ensure all required environment variables are set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ELEVENLABS_API_KEY`
- `VITE_TAVUS_API_KEY`

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Algorand Foundation** for the eco-friendly blockchain
- **Supabase** for the excellent backend platform
- **OpenAI** for AI capabilities
- **ElevenLabs** for voice technology
- **Tavus** for video generation
- **Pexels** for stock photography

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**EcoMeter** - Empowering sustainable living through technology 🌱