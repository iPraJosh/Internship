import { PredictionResult as PredictionData } from '../services/mlService';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionData;
}

export const PredictionResult = ({ result }: PredictionResultProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-3 rounded-full">
          <TrendingUp className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Prediction Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-600" size={20} />
            <span className="text-sm font-medium text-gray-600">Predicted Price</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(result.predictedPrice)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-gray-600">Confidence</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{result.confidence}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-orange-600" size={20} />
            <span className="text-sm font-medium text-gray-600">Price Range</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(result.priceRange.min)} - {formatCurrency(result.priceRange.max)}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> This prediction is based on machine learning algorithms
          analyzing multiple property features. Market conditions and location specifics may affect actual prices.
        </p>
      </div>
    </div>
  );
};
