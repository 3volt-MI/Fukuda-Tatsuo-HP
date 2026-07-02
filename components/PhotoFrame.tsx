import Image from 'next/image'
import type { MicroCMSImage } from '@/lib/microcms'

type Props = {
  image: MicroCMSImage
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  fill?: boolean
}

export default function PhotoFrame({
  image,
  alt,
  priority = false,
  sizes = '100vw',
  className = '',
  fill = true,
}: Props) {
  return (
    <div className={`ph ${className}`}>
      {fill ? (
        <Image
          src={image.url}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          src={image.url}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
        />
      )}
    </div>
  )
}
