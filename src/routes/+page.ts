import type { PageLoad } from "./$types" 

type ApiMonster = {
  name: string
  url: string
}
export type IndexMonster = ApiMonster & {
  id: string
  image: string
}
export const load = (async ({ fetch ,url}) => {
  const generationId = url.searchParams.get('generation_id') || '1'
  let monsters: IndexMonster[] = [];
  if(generationId == 'all'){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
  const json = await response.json()
  monsters = json.results.map((monster: ApiMonster) => {
    const splitUrl = monster.url.split('/')
    const id = splitUrl[splitUrl.length - 2]
    return {
      name: monster.name,
      url: monster.url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  })
  }else{
    const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`)
  const generationJson = await generationResponse.json()
  monsters = await generationJson.pokemon_species.map((monster: ApiMonster) => {
    const splitUrl = monster.url.split('/')
    const id = splitUrl[splitUrl.length - 2]
    return {
      name: monster.name,
      url: monster.url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  })
  }
  
  //console.log(generationJson)
  // const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  // const json = await response.json()
  // const monsters: IndexMonster[] = json.results.map((monster: ApiMonster) => {
  //   const splitUrl = monster.url.split('/')
  //   const id = splitUrl[splitUrl.length - 2]
  //   return {
  //     name: monster.name,
  //     url: monster.url,
  //     id,
  //     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  //   }
  // })

  return {
    monsters 
  }
}) satisfies PageLoad