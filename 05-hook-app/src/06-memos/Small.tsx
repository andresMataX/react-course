import React from 'react'

interface Props {
  value: number
}

export const Small = React.memo(({ value }: Props) => {
  console.log('Me volví a dibujar :0')

  return <small>{value}</small>
})
