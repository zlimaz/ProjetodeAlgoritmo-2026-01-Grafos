# Graph-Fit (Otimizador de Treinos) 🏋️‍♂️📊

**Projeto de Algoritmo - Universidade de Brasília (UnB)**  
*Módulo: Teoria dos Grafos (2026/01)*

## 🎯 O Problema
Dividir uma ficha de exercícios semanal de forma eficiente, garantindo que músculos recrutados em um dia tenham o descanso necessário antes de serem exigidos novamente.

## 🧠 A Solução (Teoria dos Grafos)
O sistema modela a seleção de exercícios do usuário como um **Grafo Não-Dirigido**:
- **Vértices (V):** Cada exercício escolhido pelo usuário.
- **Arestas (E):** Uma conexão entre o Exercício A e o Exercício B existe se eles compartilharem o mesmo grupo muscular (primário ou secundário).

### Algoritmo de Coloração (Welsh-Powell)
Para gerar a divisão de treinos (Treino A, B, C...), utilizamos uma heurística de coloração baseada no algoritmo de **Welsh-Powell**:
1. **Ordenação:** Os exercícios são ordenados pelo **grau** (número de conexões/músculos recrutados) em ordem decrescente.
2. **Coloração Gulosa:** Atribuímos "cores" (dias de treino) aos vértices de forma que vértices adjacentes (que compartilham músculos) nunca tenham a mesma cor.
3. **Resultado:** Cada cor gerada representa um dia de treino (Ex: Cor 0 = Treino A, Cor 1 = Treino B...), garantindo que o volume muscular seja distribuído sem sobreposição no mesmo dia.

## 🛠️ Tecnologias
- **React + TypeScript**
- **Vite**
- **Estrutura de Dados:** Lista de Adjacência (Map/Set) para eficiência em grafos esparsos.

## 🚀 Como Executar
1. Instale as dependências: `npm install`
2. Inicie o ambiente de desenvolvimento: `npm run dev`

---
*Desenvolvido por Miguel e Dupla para a disciplina de Projeto de Algoritmo - UnB.*
