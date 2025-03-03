export function getIDPokemon(url) {
  const parts = url.split('/'); 
  return parseInt(parts[parts.length - 2], 10);
}