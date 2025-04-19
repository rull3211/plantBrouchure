export interface RawPlantData {
  Tidsmerke: string;
  title: string;
  type: string;
  description: string;
  details: string;
  image: string;
}
export interface Plant {
  title: string;
  description: string[];
  type: string;
  details: Record<string, string>;
  imageSrc: string;
}
export function mapToPlant(data: RawPlantData): Plant {
  const details: Record<string, string> = {};

  // Parse "details" like "såtid: feb-april/sådybde:0.5cm/grotid:5-15dager"
  data.details.split("/").forEach((entry) => {
    const [key, value] = entry.split(":").map((part) => part?.trim());
    if (key && value) {
      details[key] = value;
    }
  });

  return {
    title: data.title,
    type: data.type,
    description: data.description.split("/"),
    details,
    imageSrc: convertDriveLink(data.image),
  };
}

// Optional: Convert Google Drive link to direct image URL
function convertDriveLink(link: string): string {
  const match = link.match(/id=([^&]+)/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`
    : "";
}
