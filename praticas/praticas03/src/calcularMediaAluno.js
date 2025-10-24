function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
      throw new Error('Notas a1 ou a2 não informadas');
    }
  
    if (a1 < 0 || a2 < 0) {
      throw new Error('Notas a1 ou a2 não podem ser negativas');
    }
  
    if (a3 === undefined) {
      // cálculo base quando a3 não é informada
      return a1 * 0.4 + a2 * 0.6;
    }
  
    if (a3 < 0) {
      throw new Error('Nota a3 não pode ser negativa');
    }
  
    // substitui a menor nota entre a1 e a2 por a3
    if (a1 < a2) {
      return a3 * 0.4 + a2 * 0.6; // a3 substitui a1
    } else {
      return a1 * 0.4 + a3 * 0.6; // a3 substitui a2
    }
  }
  
  module.exports = { calcularMediaAluno };
  