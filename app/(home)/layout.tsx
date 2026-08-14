/**
 * Dark, cinematic wrapper for the public landing experience. The whole home
 * route group sits on the near-black brand background; auth and app routes
 * keep their own (light) surfaces.
 */
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-primary text-white">{children}</div>
}
