import { useState } from 'react';
import { HouseFeatures } from '../services/mlService';
import { Home } from 'lucide-react';

interface PredictionFormProps {
  onPredict: (features: HouseFeatures) => void;
  isLoading: boolean;
}

export const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<HouseFeatures>({
    squareFeet: 2000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    lotSize: 5000,
    garage: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
            Square Feet
          </label>
          <input
            type="number"
            id="squareFeet"
            name="squareFeet"
            value={formData.squareFeet}
            onChange={handleChange}
            min="500"
            max="10000"
            step="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min="1"
            max="10"
            step="0.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
            Year Built
          </label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            min="1900"
            max="2024"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 mb-2">
            Lot Size (sq ft)
          </label>
          <input
            type="number"
            id="lotSize"
            name="lotSize"
            value={formData.lotSize}
            onChange={handleChange}
            min="1000"
            max="50000"
            step="500"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="garage" className="block text-sm font-medium text-gray-700 mb-2">
            Garage Spaces
          </label>
          <input
            type="number"
            id="garage"
            name="garage"
            value={formData.garage}
            onChange={handleChange}
            min="0"
            max="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Home size={20} />
        {isLoading ? 'Predicting...' : 'Predict House Price'}
      </button>
    </form>
  );
};
