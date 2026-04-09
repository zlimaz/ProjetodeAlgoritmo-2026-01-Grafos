import { Graph } from './logic/Graph'

export type Exercise = {
  id: string
  name: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
}

export const exerciseDatabase: Exercise[] = [
  {
    id: 'E1',
    name: 'Supino reto',
    primaryMuscles: ['peitoral'],
    secondaryMuscles: ['tríceps', 'deltoide anterior'],
  },
  {
    id: 'E2',
    name: 'Barra fixa pronada',
    primaryMuscles: ['costas'],
    secondaryMuscles: ['bíceps', 'ombro posterior'],
  },
  {
    id: 'E3',
    name: 'Agachamento livre',
    primaryMuscles: ['quadríceps', 'glúteo'],
    secondaryMuscles: ['posterior de coxa', 'panturrilha'],
  },
  {
    id: 'E4',
    name: 'Levantamento terra',
    primaryMuscles: ['posterior de coxa', 'lombar'],
    secondaryMuscles: ['glúteo', 'trapézio'],
  },
  {
    id: 'E5',
    name: 'Desenvolvimento militar',
    primaryMuscles: ['deltoide'],
    secondaryMuscles: ['tríceps', 'trapézio'],
  },
  {
    id: 'E6',
    name: 'Remada curvada',
    primaryMuscles: ['costas'],
    secondaryMuscles: ['bíceps', 'posterior de coxa'],
  },
  {
    id: 'E7',
    name: 'Puxada na frente',
    primaryMuscles: ['costas'],
    secondaryMuscles: ['bíceps', 'ombro posterior'],
  },
  {
    id: 'E8',
    name: 'Rosca direta',
    primaryMuscles: ['bíceps'],
    secondaryMuscles: ['antebraço'],
  },
  {
    id: 'E9',
    name: 'Tríceps testa',
    primaryMuscles: ['tríceps'],
    secondaryMuscles: ['antebraço'],
  },
  {
    id: 'E10',
    name: 'Leg press',
    primaryMuscles: ['quadríceps'],
    secondaryMuscles: ['glúteo', 'posterior de coxa'],
  },
  {
    id: 'E11',
    name: 'Stiff',
    primaryMuscles: ['posterior de coxa'],
    secondaryMuscles: ['glúteo', 'lombar'],
  },
  {
    id: 'E12',
    name: 'Cadeira abdutora',
    primaryMuscles: ['glúteo'],
    secondaryMuscles: ['quadríceps'],
  },
  {
    id: 'E13',
    name: 'Fly inclinado',
    primaryMuscles: ['peitoral'],
    secondaryMuscles: ['deltoide anterior'],
  },
  {
    id: 'E14',
    name: 'Elevação lateral',
    primaryMuscles: ['deltoide'],
    secondaryMuscles: ['trapézio'],
  },
  {
    id: 'E15',
    name: 'Panturrilha em pé',
    primaryMuscles: ['panturrilha'],
    secondaryMuscles: [],
  },
  {
    id: 'E16',
    name: 'Prancha',
    primaryMuscles: ['abdominal'],
    secondaryMuscles: ['lombar'],
  },
  {
    id: 'E17',
    name: 'Crunch abdominal',
    primaryMuscles: ['abdominal'],
    secondaryMuscles: [],
  },
  {
    id: 'E18',
    name: 'Remada unilateral',
    primaryMuscles: ['costas'],
    secondaryMuscles: ['bíceps', 'ombro posterior'],
  },
]

export function buildWorkoutGraph(exercisesList: Exercise[]): Graph {
  const graph = new Graph()

  for (const exercise of exercisesList) {
    graph.addVertex(exercise.id)
  }

  for (let i = 0; i < exercisesList.length; i += 1) {
    for (let j = i + 1; j < exercisesList.length; j += 1) {
      const firstMuscles = new Set([
        ...exercisesList[i].primaryMuscles,
        ...exercisesList[i].secondaryMuscles,
      ])
      const secondMuscles = new Set([
        ...exercisesList[j].primaryMuscles,
        ...exercisesList[j].secondaryMuscles,
      ])

      const hasCommonMuscle = Array.from(firstMuscles).some((muscle) =>
        secondMuscles.has(muscle),
      )

      if (hasCommonMuscle) {
        graph.addEdge(exercisesList[i].id, exercisesList[j].id)
      }
    }
  }

  return graph
}

export function getExerciseById(id: string): Exercise | undefined {
  return exerciseDatabase.find((exercise) => exercise.id === id)
}
