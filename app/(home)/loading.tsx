export default function HomeLoading() {
  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-1/3 animate-pulse rounded bg-[#393628]" />
        <div className="mt-6 h-4 w-full animate-pulse rounded bg-[#393628]" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 rounded-xl animate-pulse bg-[#393628]" />
          ))}
        </div>
      </div>
    </>
  );
}
