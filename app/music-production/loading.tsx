export default function MusicLoading() {
  return (
    <div className="w-full h-fit bg-primary">
      <div className="mx-auto max-w-6xl p-6">
        <div className="h-8 w-32 animate-pulse rounded bg-[#393628]" />
        <div className="mt-6 h-4 w-1/2 animate-pulse rounded bg-[#393628]" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:px-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 rounded-xl animate-pulse bg-[#393628]" />
        ))}
      </div>
    </div>
  )
}
