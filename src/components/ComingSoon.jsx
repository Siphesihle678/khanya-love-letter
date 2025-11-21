export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-ivory text-center px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-khanyaPinkDeep/60">
        In progress
      </p>
      <h2 className="text-3xl font-serif">{title}</h2>
      <p className="max-w-md text-base text-khanyaPinkDeep/80">
        This chapter is still being written. We&apos;ll bring it to life right
        after the opening splash.
      </p>
    </div>
  )
}


