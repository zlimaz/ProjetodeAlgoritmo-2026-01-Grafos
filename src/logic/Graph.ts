export class Graph {
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(id: string): void {
    if (!this.adjacencyList.has(id)) {
      this.adjacencyList.set(id, new Set());
    }
  }

  addEdge(vId: string, wId: string): void {
    if (!this.adjacencyList.has(vId)) this.addVertex(vId);
    if (!this.adjacencyList.has(wId)) this.addVertex(wId);

    this.adjacencyList.get(vId)?.add(wId);
    this.adjacencyList.get(wId)?.add(vId);
  }

  getAdjacents(id: string): string[] {
    return Array.from(this.adjacencyList.get(id) || []);
  }

  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  getDegree(id: string): number {
    return this.adjacencyList.get(id)?.size || 0;
  }

  printGraph(): void {
    console.log("--- Representação do Grafo (IDs de Exercícios) ---");
    for (const [id, edges] of this.adjacencyList) {
      const edgesStr = Array.from(edges).join(", ");
      console.log(`${id} -> [${edgesStr}]`);
    }
  }

  colorGraph(): Record<number, string[]> {
    const vertices = this.getVertices().sort((a, b) => this.getDegree(b) - this.getDegree(a));
    
    const result: Record<number, string[]> = {};
    const colored = new Set<string>();
    let colorIndex = 0;

    for (const v of vertices) {
      if (colored.has(v)) continue;

      result[colorIndex] = [v];
      colored.add(v);

      for (const w of vertices) {
        if (!colored.has(w)) {
          const isAdjacent = result[colorIndex].some((coloredVertex) => {
            const adjacents = this.getAdjacents(w);
            return adjacents.includes(coloredVertex);
          });

          if (!isAdjacent) {
            result[colorIndex].push(w);
            colored.add(w);
          }
        }
      }
      
      colorIndex++;
    }

    return result;
  }
}
