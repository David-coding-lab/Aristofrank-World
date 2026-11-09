export default function EventsLoading() {
  return (
    <div className="w-full h-fit bg-primary">
      <div className="mx-auto mt-16 flex w-full max-w-6xl flex-col justify-start px-4 text-center sm:mt-20 sm:px-6">
        <div className="h-8 w-32 animate-pulse rounded bg-[#393628]" />
        <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-[#393628]" />
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 rounded-xl animate-pulse bg-[#393628]" />
        ))}
      </div>
    </div>
  );
}
