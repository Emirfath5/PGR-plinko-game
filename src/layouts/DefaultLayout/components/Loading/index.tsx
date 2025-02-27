import { skull } from 'phosphor-react'

export function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background text-text">
      <skull className="animate-spin" size="50" weight="bold" />
    </div>
  )
}
