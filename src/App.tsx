import { useState } from 'react';
import { Brain, Sparkles, BarChart3, Shield } from 'lucide-react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { FeatureCard } from './components/FeatureCard';
import { HouseFeatures, PredictionResult as PredictionData, predictHousePrice } from './services/mlService';

function App() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = (features: HouseFeatures) => {
    setIsLoading(true);
    setPrediction(null);

    setTimeout(() => {
      const result = predictHousePrice(features);
      setPrediction(result);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <Brain className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            House Price Prediction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leverage advanced machine learning algorithms to estimate property values with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={Sparkles}
            title="AI-Powered Analysis"
            description="Our model analyzes multiple property features to provide accurate price predictions"
          />
          <FeatureCard
            icon={BarChart3}
            title="Market Insights"
            description="Get comprehensive price ranges and confidence scores for informed decisions"
          />
          <FeatureCard
            icon={Shield}
            title="Reliable Results"
            description="Built on proven algorithms with consistent and trustworthy predictions"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Property Details</h2>
          <PredictionForm onPredict={handlePredict} isLoading={isLoading} />

          {prediction && <PredictionResult result={prediction} />}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by Machine Learning | For demonstration purposes</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
