/**
 * Classe Graph - Representação por Lista de Adjacência
 * Implementada para o projeto Graph-Fit (Otimizador de Treinos)
 * 
 * ARQUITETURA: Para evitar erros de referência de memória em JavaScript (Map key equality),
 * esta classe utiliza apenas Strings (IDs) para representar os vértices.
 */
export class Graph {
  // O Map armazena o ID do vértice como chave e um Set de IDs adjacentes como valor
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Adiciona um novo vértice (ID do exercício) ao grafo
   */
  addVertex(id: string): void {
    if (!this.adjacencyList.has(id)) {
      this.adjacencyList.set(id, new Set());
    }
  }

  /**
   * Adiciona uma aresta (relação de músculo comum) entre dois exercícios pelos seus IDs
   * Como o treino é mútuo, o grafo é não-dirigido
   */
  addEdge(vId: string, wId: string): void {
    // Garante que ambos os vértices existem
    if (!this.adjacencyList.has(vId)) this.addVertex(vId);
    if (!this.adjacencyList.has(wId)) this.addVertex(wId);

    // Adiciona a relação bidirecional
    this.adjacencyList.get(vId)?.add(wId);
    this.adjacencyList.get(wId)?.add(vId);
  }

  /**
   * Retorna a lista de IDs adjacentes de um vértice específico
   */
  getAdjacents(id: string): string[] {
    return Array.from(this.adjacencyList.get(id) || []);
  }

  /**
   * Retorna todos os IDs dos vértices do grafo
   */
  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Retorna o grau de um vértice (número de conexões)
   * Essencial para o algoritmo de Welsh-Powell (Coloração)
   */
  getDegree(id: string): number {
    return this.adjacencyList.get(id)?.size || 0;
  }

  /**
   * Imprime a representação do grafo no console (para debug)
   */
  printGraph(): void {
    console.log("--- Representação do Grafo (IDs de Exercícios) ---");
    for (const [id, edges] of this.adjacencyList) {
      const edgesStr = Array.from(edges).join(", ");
      console.log(`${id} -> [${edgesStr}]`);
    }
  }

  /**
   * Coloração de Vértices usando o algoritmo de Welsh-Powell
   * Retorna um objeto onde a chave é a "cor" (dia de treino) e o valor é um array de IDs de exercícios
   */
  colorGraph(): Record<number, string[]> {
    // 1. Ordena os vértices em ordem decrescente de grau
    const vertices = this.getVertices().sort((a, b) => this.getDegree(b) - this.getDegree(a));
    
    const result: Record<number, string[]> = {};
    const colored = new Set<string>();
    let colorIndex = 0;

    // 2. Itera sobre todos os vértices
    for (const v of vertices) {
      if (colored.has(v)) continue; // Pula se já estiver colorido

      // Atribui uma nova cor a este vértice
      result[colorIndex] = [v];
      colored.add(v);

      // 3. Tenta atribuir a mesma cor aos vértices restantes
      for (const w of vertices) {
        if (!colored.has(w)) {
          // Verifica se w é adjacente a algum vértice já colorido com a cor atual
          const isAdjacent = result[colorIndex].some((coloredVertex) => {
            const adjacents = this.getAdjacents(w);
            return adjacents.includes(coloredVertex);
          });

          // Se não for adjacente a nenhum vértice desta cor, pinta com a mesma cor
          if (!isAdjacent) {
            result[colorIndex].push(w);
            colored.add(w);
          }
        }
      }
      
      colorIndex++; // Prepara a próxima cor
    }

    return result;
  }
}
