import { useState } from 'react'
import './App.css'
import { exerciseDatabase, buildWorkoutGraph, getExerciseById } from './database'

function App() {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([
    'E1', 'E2', 'E3', 'E4' // Alguns exercícios pré-selecionados
  ])
  const [workoutPlan, setWorkoutPlan] = useState<Record<number, string[]> | null>(null)

  const toggleExercise = (id: string) => {
    setSelectedExercises((current) =>
      current.includes(id) ? current.filter((exerciseId) => exerciseId !== id) : [...current, id],
    )
  }

  const handleGenerateWorkout = () => {
    if (selectedExercises.length === 0) {
      setWorkoutPlan(null)
      return
    }

    // Filtra os exercícios completos a partir dos IDs selecionados
    const selectedList = exerciseDatabase.filter(e => selectedExercises.includes(e.id))
    
    // Constrói o grafo e gera a coloração
    const graph = buildWorkoutGraph(selectedList)
    const result = graph.colorGraph()
    
    setWorkoutPlan(result)
  }

  const getLabelForColor = (index: number) => {
    return `Treino ${String.fromCharCode(65 + index)}`
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Graph-Fit</h1>
          <p className="app-lead">
            Otimize sua rotina de musculação com inteligência. Selecione seus exercícios e nosso motor baseado em 
            <strong> Teoria dos Grafos (Welsh-Powell)</strong> montará treinos perfeitos, garantindo o máximo rendimento e descanso muscular adequado para hipertrofia.
          </p>
        </div>
        <button className="action-button" onClick={handleGenerateWorkout}>
          Gerar treino otimizado
        </button>
      </header>

      <main className="app-grid">
        <section className="panel panel-left">
          <div className="panel-header">
            <h2>Exercícios disponíveis</h2>
            <p>Escolha os exercícios para montar sua rotina.</p>
          </div>

          <div className="exercise-list">
            {exerciseDatabase.map((exercise) => (
              <label key={exercise.id} className="exercise-item">
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(exercise.id)}
                  onChange={() => toggleExercise(exercise.id)}
                />
                <div>
                  <strong>{exercise.name}</strong>
                  <p>
                    {exercise.primaryMuscles.join(', ')} 
                    {exercise.secondaryMuscles.length > 0 ? ` · ${exercise.secondaryMuscles.join(', ')}` : ''}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="panel panel-right">
          <div className="panel-header">
            <h2>Seu Plano de Treino</h2>
            <p>
              {workoutPlan 
                ? 'Treinos gerados pelo algoritmo Welsh-Powell.' 
                : 'Clique no botão acima para processar o grafo.'}
            </p>
          </div>

          <div className="cards-grid">
            {workoutPlan ? (
              Object.entries(workoutPlan).map(([color, exerciseIds]) => (
                <article key={color} className="training-card">
                  <div className="training-card__header">
                    <span className="training-badge">{getLabelForColor(Number(color))}</span>
                    <strong>{exerciseIds.length} exercícios</strong>
                  </div>
                  <ul>
                    {exerciseIds.map((id) => {
                      const ex = getExerciseById(id)
                      return <li key={id}>{ex?.name || id}</li>
                    })}
                  </ul>
                </article>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text)' }}>
                Nenhum treino gerado. Selecione exercícios e clique em "Gerar treino otimizado".
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
