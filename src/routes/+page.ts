import type { PageLoad } from "./$types";

type ApiMonster = {
  name: string;
  url: string;
};

export type IndexMonster = ApiMonster & {
  id: string;
  image: string;
  rarity: 'normal' | 'rare' | 'ultra';
};

export const load: PageLoad = async ({ fetch, url }) => {
  const generationId = url.searchParams.get('generation_id') || '1';
  let monstersList = [];

  if (generationId === 'all') {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const json = await response.json();
    monstersList = json.results;
  } else {
    const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
    const generationJson = await generationResponse.json();
    monstersList = generationJson.pokemon_species;
  }

  const monsters: IndexMonster[] = await Promise.all(
    monstersList.map(async (monster: ApiMonster) => {
      const splitUrl = monster.url.split('/');
      const id = splitUrl[splitUrl.length - 2];

      // Fetch additional details, such as rarity, for each monster
      const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const detailsJson = await detailsResponse.json();
      const rarity = determineRarity(detailsJson); // Implement your logic to determine rarity

      return {
        name: monster.name,
        url: monster.url,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        rarity,
      };
    })
  );

  return {
    monsters,
  };
};

// Implement your logic to determine rarity based on the fetched details
function determineRarity(detailsJson: any): 'normal' | 'rare' | 'ultra' {
  // Example logic (replace this with your actual logic)
  const baseExperience = detailsJson.base_experience;

  if (baseExperience > 200) {
    return 'ultra';
  } else if (baseExperience > 100) {
    return 'rare';
  } else {
    return 'normal';
  }
}
