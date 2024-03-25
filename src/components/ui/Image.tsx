import { FunctionComponent, useState } from 'react'
import noImage from '@/assets/images/noimage.jpg'

interface ImageProps {
  src?: string
  alt?: string
  width?: string
  height?: string
  loading?: 'lazy' | 'eager'
  className?: string
}

const Image: FunctionComponent<ImageProps> = ({ src, alt, width, height, loading, className }) => {
  const onError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    console.log(e)
    const target = e.target as HTMLImageElement
    target.src = noImage
  }

  return (
    <img onError={onError} src={src} alt={alt} width={width} height={height} loading={loading} className={className} />
  )
}

export default Image
