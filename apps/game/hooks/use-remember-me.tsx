'use client'

export const useRememberMe = () => {
  const setPlayer = async (player: string) => {
    localStorage.setItem('player', player)
  }

  const getPlayer = async () => {
    return localStorage.getItem('player')
  }

  return {
    setPlayer,
    getPlayer,
  }
}
