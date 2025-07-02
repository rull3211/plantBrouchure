import { useEffect, useState } from "react";
import { mapToPlant, Plant, RawPlantData } from "../utils/plantMapper";
import Papa from "papaparse";
export function usePlantsFromCSV(url: string) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSheetCSV() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const csvText = await response.text();
        const parsed = Papa.parse(csvText, { header: true });

        const plantsMapped: Plant[] = parsed.data
          .map((el) => mapToPlant(el as RawPlantData))
        setPlants(plantsMapped);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSheetCSV();
  }, [url]);

  return { plants, loading, error };
}