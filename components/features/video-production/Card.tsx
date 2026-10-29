import Image from "next/image"

interface CardProps {
  icon: string
  title: string
  description: string
}

function Card({ icon, title, description }: CardProps) {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl bg-[#1D1B16] p-8 font-open-sans">
      <Image src={icon} width={60} height={60} alt={title} />
      <h3 className="text-xl text-start font-bold text-secondary">{title}</h3>
      <p className="text-base text-start font-semibold leading-snug text-sand">
        {description}
      </p>
    </div>
  )
}

export default Card