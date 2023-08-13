import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

interface Props {
  images: string[]
}

export const ImageGallery = ({ images }: Props) => {
  return (
    <ImageList
      sx={{ width: '100%', height: images.length !== 0 ? 500 : 0 }}
      cols={4}
      rowHeight={200}
    >
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
