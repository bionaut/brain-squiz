import Link from 'next/link'

interface LogoProps {
  href: string
  compact?: boolean
}

export const Logo = ({ href, compact }: LogoProps) => {
  return (
    <Link href={href} className={'btn btn-ghost normal-case'}>
      <span>🧠</span>️{!compact && <span>BrainSquiz</span>}
    </Link>
  )
}
