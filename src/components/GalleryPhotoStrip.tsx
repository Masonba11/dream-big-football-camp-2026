import { Link } from 'react-router-dom'
import { galleryStripSrcsOffset } from '../config/galleryAssets'

type Props = {
  /** 0 = start of roll; 0.33 = offset strip for variety */
  offset?: number
  className?: string
}

export function GalleryPhotoStrip({ offset = 0, className = '' }: Props) {
  const srcs = galleryStripSrcsOffset(offset, 8)
  if (srcs.length === 0) return null

  return (
    <div className={className}>
      <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 [scrollbar-width:thin]">
        {srcs.map((src, i) => (
          <Link
            key={`${src}-${i}`}
            to="/gallery"
            className="group relative shrink-0 overflow-hidden rounded-lg border border-white/10 ring-1 ring-white/5 transition hover:border-red-500/40 hover:ring-red-500/20"
          >
            <img
              src={src}
              alt=""
              role="presentation"
              width={112}
              height={72}
              className="h-14 w-[4.5rem] object-cover transition duration-300 group-hover:scale-105 sm:h-16 sm:w-24"
              loading="lazy"
            />
            <span className="sr-only">Open photo gallery</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
