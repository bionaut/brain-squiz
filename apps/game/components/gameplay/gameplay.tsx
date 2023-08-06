'use client'

import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useGameplay } from '@brain-squiz/gameplay'
import { Card } from '@brain-squiz/ui'
import { GameplayQuestion } from './gameplay-question'
import { useRouter } from 'next/navigation'

interface GameplayProps {}

const createMutation = gql`
  mutation CreateGame($playerName: String!) {
    createGame(playerName: $playerName) {
      id
      questionIds
      createdAt
    }
  }
`

const finishGameMutation = gql`
  mutation FinishGame($gameId: String!, $score: Float!, $playerName: String!) {
    finishGame(id: $gameId, score: $score, playerName: $playerName) {
      id
    }
  }
`

export const Gameplay = (props: GameplayProps) => {
  const router = useRouter()
  const [{ player }] = useGameplay()
  const [createGame, { data, loading }] = useMutation(createMutation)
  const [finishGame] = useMutation(finishGameMutation)

  // state
  const [questionIds, setQuestionIds] = useState<string[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const currentQuestionId = questionIds[questionIndex]

  // create game on mount
  useEffect(() => {
    ;(async function () {
      const res = await createGame({ variables: { playerName: player } })
      setQuestionIds(res.data.createGame.questionIds)
    })()
  }, [])

  const onAnswer = async (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1)

    if (questionIndex + 1 < questionIds.length) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1)
      }, 1500)
    } else {
      finishGame({
        variables: {
          playerName: player,
          gameId: data.createGame.id,
          score,
        },
      }).then(() => {
        router.push(`/game/results/${data.createGame.id}`)
      })
    }
  }

  if (loading || currentQuestionId === undefined)
    return (
      <Card
        className={
          'flex items-center justify-center h-1/2 animate-pulse bg-base-200'
        }
      >
        Loading...
      </Card>
    )

  return (
    <div>
      <div className={'flex flex-row justify-between items-center'}>
        <div className={'text-2xl font-bold'}>
          Question: {questionIndex + 1}
        </div>
        <div className={'text-2xl font-bold'}>Score: {score}</div>
      </div>
      <GameplayQuestion
        key={currentQuestionId}
        questionId={currentQuestionId}
        onAnswer={onAnswer}
      />
    </div>
  )
}
