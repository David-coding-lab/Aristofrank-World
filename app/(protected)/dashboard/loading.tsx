export default function DashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-screen-md px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded bg-border" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-24 animate-pulse rounded-xl bg-border" />
        <div className="h-24 animate-pulse rounded-xl bg-border" />
      </div>
    </main>
  )
}
