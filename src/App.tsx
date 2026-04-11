import { useState } from 'react'
import './App.css'

type Exercise = {
  id: string
  name: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
}

const exerciseOptions: Exercise[] = [
  { id: 'E1', name: 'Supino reto', primaryMuscles: ['peitoral'], secondaryMuscles: ['tríceps'] },
  { id: 'E2', name: 'Barra fixa pronada', primaryMuscles: ['costas'], secondaryMuscles: ['bíceps'] },
  { id: 'E3', name: 'Agachamento livre', primaryMuscles: ['quadríceps'], secondaryMuscles: ['glúteo'] },
  { id: 'E4', name: 'Levantamento terra', primaryMuscles: ['posterior de coxa'], secondaryMuscles: ['lombar'] },
  { id: 'E5', name: 'Desenvolvimento militar', primaryMuscles: ['deltoide'], secondaryMuscles: ['tríceps'] },
  { id: 'E6', name: 'Rosca direta', primaryMuscles: ['bíceps'], secondaryMuscles: ['antebraço'] },
  { id: 'E7', name: 'Tríceps testa', primaryMuscles: ['tríceps'], secondaryMuscles: ['antebraço'] },
]

const fakeWorkoutCards = [
  {
    id: 'A',
    label: 'Treino A',
    exercises: ['Supino reto', 'Fly inclinado', 'Tríceps testa'],
  },
  {
    id: 'B',
    label: 'Treino B',
    exercises: ['Barra fixa pronada', 'Remada curvada', 'Rosca direta'],
  },
  {
    id: 'C',
    label: 'Treino C',
    exercises: ['Agachamento livre', 'Leg press', 'Panturrilha em pé'],
  },
]

function App() {
  const [selectedExercises, setSelectedExercises] = useState<string[]>(['E1', 'E2'])

  const toggleExercise = (id: string) => {
    setSelectedExercises((current) =>
      current.includes(id) ? current.filter((exerciseId) => exerciseId !== id) : [...current, id],
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="app-badge">UI: Seleção de Exercícios</span>
          <h1>Organizador de Treinos A/B/C</h1>
          <p className="app-lead">
            Interface estática para selecionar exercícios e visualizar os cards de treino.
          </p>
        </div>
        <button className="action-button">Gerar treino</button>
      </header>

      <main className="app-grid">
        <section className="panel panel-left">
          <div className="panel-header">
            <h2>Exercícios disponíveis</h2>
            <p>Escolha alguns exercícios para simular a seleção do usuário.</p>
          </div>

          <div className="exercise-list">
            {exerciseOptions.map((exercise) => (
              <label key={exercise.id} className="exercise-item">
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(exercise.id)}
                  onChange={() => toggleExercise(exercise.id)}
                />
                <div>
                  <strong>{exercise.name}</strong>
                  <p>{exercise.primaryMuscles.join(', ')} {exercise.secondaryMuscles.length > 0 ? `· ${exercise.secondaryMuscles.join(', ')}` : ''}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="panel panel-right">
          <div className="panel-header">
            <h2>Cards de treino</h2>
            <p>Layout de Treino A, B e C com conteúdo estático para protótipo.</p>
          </div>

          <div className="cards-grid">
            {fakeWorkoutCards.map((card) => (
              <article key={card.id} className="training-card">
                <div className="training-card__header">
                  <span className="training-badge">{card.label}</span>
                  <strong>{card.exercises.length} exercícios</strong>
                </div>
                <ul>
                  {card.exercises.map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
