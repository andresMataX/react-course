import { useState } from 'react'

export const useCategories = () => {
  const [categories, setCategories] = useState(['One Punch'])

  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return
    setCategories([newCategory, ...categories])
  }

  return {
    onAddCategory,
    categories,
  }
}
