import { toast } from 'react-hot-toast';

const VIN_API_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin';

export interface DecodedVehicle {
  year: string;
  make: string;
  model: string;
  trim?: string;
  bodyStyle?: string;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  fuelType?: string;
}

export async function decodeVIN(vin: string): Promise<DecodedVehicle> {
  try {
    const response = await fetch(`${VIN_API_URL}/${vin}?format=json`);
    
    if (!response.ok) {
      throw new Error('Failed to decode VIN');
    }

    const data = await response.json();

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error('Invalid response from VIN decoder');
    }

    // Create a map of the results for easier access
    const results = data.Results.reduce((acc: Record<string, string>, item: any) => {
      if (item.Value && item.Value !== 'null' && item.Value !== 'Not Applicable') {
        acc[item.Variable.toLowerCase().replace(/\s+/g, '')] = item.Value;
      }
      return acc;
    }, {});

    // Extract relevant information
    const decodedInfo: DecodedVehicle = {
      year: results.modelyear || '',
      make: results.make || '',
      model: results.model || '',
      trim: results.trim,
      bodyStyle: results.bodystyle,
      engine: results.enginemodel || results.engineconfiguration,
      transmission: results.transmissionstyle,
      drivetrain: results.drivetype,
      fuelType: results.fueltype
    };

    // Validate required fields
    if (!decodedInfo.year || !decodedInfo.make || !decodedInfo.model) {
      throw new Error('Could not decode essential vehicle information');
    }

    return decodedInfo;
  } catch (error) {
    console.error('VIN decoding error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to decode VIN';
    toast.error(errorMessage);
    throw error;
  }
}