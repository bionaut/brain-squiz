'use server'

export async function setPlayer(data: { player: string }) {
  const player = data?.player?.trim()
  if (!player || player.length < 1) throw new Error('Missing player name')
  return { ok: true }
}
