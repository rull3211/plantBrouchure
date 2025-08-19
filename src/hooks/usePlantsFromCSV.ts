import { useQuery } from "@tanstack/react-query";
import { mapToPlant, Plant, RawPlantData } from "../utils/plantMapper";
import Papa from "papaparse";

export function usePlantsFromCSV(url: string) {
  const query = useQuery<Plant[], Error>({
    queryKey: ["plants", url],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch plants CSV");
      }

      const csvText = await response.text();
      const parsed = Papa.parse(csvText, { header: true });

      const plantsMapped: Plant[] = parsed.data.map((el) =>
        mapToPlant(el as RawPlantData)
      );

      return plantsMapped;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    plants: query.data ?? [],   // 👈 always expose as `plants`
    loading: query.isLoading,
    error: query.error,
  };
}