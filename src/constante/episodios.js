async function getEpisodios () {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/episode')
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export default getEpisodios