export interface HouseFeatures {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  garage: number;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export const predictHousePrice = (features: HouseFeatures): PredictionResult => {
  const basePrice = 150000;
  const sqftMultiplier = 120;
  const bedroomValue = 25000;
  const bathroomValue = 18000;
  const ageDepreciation = (2024 - features.yearBuilt) * 800;
  const lotSizeMultiplier = 8;
  const garageValue = 15000;

  const calculatedPrice =
    basePrice +
    features.squareFeet * sqftMultiplier +
    features.bedrooms * bedroomValue +
    features.bathrooms * bathroomValue -
    ageDepreciation +
    features.lotSize * lotSizeMultiplier +
    features.garage * garageValue;

  const randomVariation = 1 + (Math.random() - 0.5) * 0.1;
  const predictedPrice = Math.round(calculatedPrice * randomVariation);

  const confidence = Math.min(95, 75 + Math.random() * 15);

  const variancePercent = 0.15;
  const priceRange = {
    min: Math.round(predictedPrice * (1 - variancePercent)),
    max: Math.round(predictedPrice * (1 + variancePercent)),
  };

  return {
    predictedPrice,
    confidence: Math.round(confidence * 10) / 10,
    priceRange,
  };
};
