export default function Gallery({ images }) {
  if (!images?.length) {
    return (
      <p className="text-sm text-khanyaPinkDeep/70">
        Memories will bloom here soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, index) => (
        <div
          key={src ?? index}
          className="aspect-square overflow-hidden rounded-2xl bg-khanyaPink/10 border border-khanyaPink/20"
        >
          <img
            src={src}
            alt={`Chapter memory ${index + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}


