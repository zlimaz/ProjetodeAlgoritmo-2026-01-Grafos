/**
 * Classe Graph - Representação por Lista de Adjacência
 * Implementada para o projeto Graph-Fit (Otimizador de Treinos)
 */
export class Graph<T> {
  // O Map armazena o vértice como chave e um Set de adjacências como valor
  // O Set garante que não haja arestas duplicadas
  private adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Adiciona um novo vértice (exercício) ao grafo
   */
  addVertex(v: T): void {
    if (!this.adjacencyList.has(v)) {
      this.adjacencyList.set(v, new Set());
    }
  }

  /**
   * Adiciona uma aresta (relação de músculo comum) entre v e w
   * Como o treino é mútuo, o grafo é não-dirigido
   */
  addEdge(v: T, w: T): void {
    // Garante que ambos os vértices existem
    if (!this.adjacencyList.has(v)) this.addVertex(v);
    if (!this.adjacencyList.has(w)) this.addVertex(w);

    // Adiciona a relação bidirecional
    this.adjacencyList.get(v)?.add(w);
    this.adjacencyList.get(w)?.add(v);
  }

  /**
   * Retorna a lista de adjacência de um vértice específico
   */
  getAdjacents(v: T): T[] {
    return Array.from(this.adjacencyList.get(v) || []);
  }

  /**
   * Retorna todos os vértices do grafo
   */
  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Retorna o grau de um vértice (número de conexões)
   * Essencial para o algoritmo de Welsh-Powell
   */
  getDegree(v: T): number {
    return this.adjacencyList.get(v)?.size || 0;
  }

  /**
   * Imprime a representação do grafo no console (para debug)
   */
  printGraph(): void {
    console.log("--- Representação do Grafo (Lista de Adjacência) ---");
    for (const [vertex, edges] of this.adjacencyList) {
      const edgesStr = Array.from(edges).join(", ");
      console.log(`${vertex} -> [${edgesStr}]`);
    }
  }
}
