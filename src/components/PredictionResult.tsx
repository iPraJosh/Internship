import { useState } from 'react';
import { PredictionResult as PredictionData } from '../services/mlService';
import { TrendingUp, DollarSign, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PredictionResultProps {
  result: PredictionData;
}

export const PredictionResult = ({ result }: PredictionResultProps) => {

  // ---------- Default currency = INR ----------
  const [currency, setCurrency] = useState("INR");

  // ---------- USD is the MODEL BASE ----------
  // Convert once from USD → selected currency
  const conversionRates: Record<string, number> = {
    USD: 1,
    INR: 83,
    EUR: 0.93,
    GBP: 0.79,
  };

  // ---------- 10x Indian Real Estate Scaling ----------
  const INDIAN_PRICE_SCALING = 0.10; // Reduce to 1/10th for realistic Indian pricing

  // ---------- Currency Formatting ----------
  const formatCurrency = (value: number) => {
    // 1. Apply Indian scaling
    const scaledValue = value * INDIAN_PRICE_SCALING;

    // 2. Convert USD → selected currency
    const converted = Math.round(
      (scaledValue * conversionRates[currency]) / 100
    ) * 100;

    // 3. Correct locale formatting
    const localeMap: Record<string, string> = {
      USD: "en-US",
      EUR: "de-DE",
      INR: "en-IN",
      GBP: "en-GB",
    };

    return new Intl.NumberFormat(localeMap[currency], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  // ---------- Confidence Badge Colors ----------
  const getConfidenceColor = (value: number) => {
    if (value >= 80) return "text-green-600 bg-green-100";
    if (value >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // ---------- Graph Data ----------
  const graphData = [
    { label: "Min Price", value: result.priceRange.min },
    { label: "Predicted", value: result.predictedPrice },
    { label: "Max Price", value: result.priceRange.max },
  ];

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full">

      {/* Currency Selector */}
      <div className="flex justify-end mb-3">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded px-3 py-1 bg-white text-gray-700 shadow-sm"
        >
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <TrendingUp size={24} className="text-blue-600" />
        Prediction Results
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {/* Predicted Price */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-600" />
            <p className="font-semibold text-gray-800">Predicted Price</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(result.predictedPrice)}
          </p>
        </div>

        {/* Confidence */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-blue-600" />
            <p className="font-semibold text-gray-800">Confidence</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full font-bold text-lg 
            ${getConfidenceColor(result.confidence)}`}
          >
            {result.confidence.toFixed(1)}%
          </span>
        </div>

        {/* Price Range */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-orange-600" />
            <p className="font-semibold text-gray-800">Price Range</p>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(result.priceRange.min)} – {formatCurrency(result.priceRange.max)}
          </p>
        </div>
      </div>

      {/* Price Range Graph */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-2">
          Price Range Graph
        </h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={graphData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(val) => formatCurrency(val as number)} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> This prediction is based on
          machine learning algorithms analyzing multiple property features.
          Market conditions and location specifics may affect actual prices.
        </p>
      </div>

    </div>
  );
};
