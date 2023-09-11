interface SpeciesWhale {
  tagNumber: number;
  name: string;
}

interface SpeciesData {
  id: number;
  name: string;
  latinName: string;
  description: string;
  whales: SpeciesWhale[];
}

export default SpeciesData;