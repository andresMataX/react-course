import { AddCategory, GifGrid } from './components'
import { useCategories } from './hooks/useCategories'

export const GifExpertApp = () => {
  const { categories, onAddCategory } = useCategories()

  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategory onNewCategory={(value) => onAddCategory(value)} />

      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  )
}
