import { createContext, useContext, useState, useEffect } from 'react';
import { getAllTrips } from '../app/appwrite/trips';

interface Trip {
  $id: string;
  [key: string]: any;
}

interface TripsContextType {
  trips: Trip[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  fetchTrips: (limit: number, offset: number) => Promise<void>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrips = async (limit: number, offset: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const { allTrips, total: totalTrips } = await getAllTrips(limit, offset);
      setTrips(allTrips);
      setTotal(totalTrips);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch trips'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips(8, 0);
  }, []);

  return (
    <TripsContext.Provider value={{ trips, total, isLoading, error, fetchTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};