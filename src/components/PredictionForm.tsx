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

  // UNIVERSAL FIXED INPUT HANDLER
  const handleNumberInput = (name: keyof HouseFeatures, value: string) => {
    // Allow empty field
    if (value === "") {
      setFormData({ ...formData, [name]: "" as any });
      return;
    }

    // Remove leading zeros (01700 → 1700)
    const cleaned = value.replace(/^0+(?=\d)/, "");

    // Convert to number safely
    const num = Number(cleaned);

    if (!isNaN(num)) {
      setFormData({ ...formData, [name]: num });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all values are numbers
    const finalData: HouseFeatures = {
      squareFeet: Number(formData.squareFeet),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      yearBuilt: Number(formData.yearBuilt),
      lotSize: Number(formData.lotSize),
      garage: Number(formData.garage),
    };

    onPredict(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Square Feet */}
        <div>
          <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
            Buildup area
          </label>
          <input
            type="number"
            id="squareFeet"
            name="squareFeet"
            step="any"   // <--- ALLOW ANY VALUE
            value={formData.squareFeet === 0 ? "" : formData.squareFeet}
            onChange={(e) => handleNumberInput("squareFeet", e.target.value)}
            min="300"
            max="10000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            step="1"
            value={formData.bedrooms === 0 ? "" : formData.bedrooms}
            onChange={(e) => handleNumberInput("bedrooms", e.target.value)}
            min="1"
            max="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            step="0.5"
            value={formData.bathrooms === 0 ? "" : formData.bathrooms}
            onChange={(e) => handleNumberInput("bathrooms", e.target.value)}
            min="1"
            max="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Year Built */}
        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
            Year Built
          </label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            step="1"
            value={formData.yearBuilt === 0 ? "" : formData.yearBuilt}
            onChange={(e) => handleNumberInput("yearBuilt", e.target.value)}
            min="1900"
            max="2024"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Lot Size */}
        <div>
          <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 mb-2">
            Total Land area (sq ft)
          </label>
          <input
            type="number"
            id="lotSize"
            name="lotSize"
            step="any"
            value={formData.lotSize === 0 ? "" : formData.lotSize}
            onChange={(e) => handleNumberInput("lotSize", e.target.value)}
            min="500"
            max="50000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Garage */}
        <div>
          <label htmlFor="garage" className="block text-sm font-medium text-gray-700 mb-2">
            Garage Space
          </label>
          <input
            type="number"
            id="garage"
            name="garage"
            step="1"
            value={formData.garage === 0 ? "" : formData.garage}
            onChange={(e) => handleNumberInput("garage", e.target.value)}
            min="0"
            max="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 
          px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 
          flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Home size={20} />
        {isLoading ? 'Predicting...' : 'Predict House Price'}
      </button>
    </form>
  );
};
