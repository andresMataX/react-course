export const getImagen = async () => {
  try {
    const apiKey = 'E7TOz8YH0UdvnAm3I6kt7CdpH7o5McoY'
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    )
    const { data } = await resp.json()

    const { url } = data.images.original

    return url
  } catch (error) {
    console.error(error)
    return 'No se encontró la imagen'
  }
}

// getImagen()
