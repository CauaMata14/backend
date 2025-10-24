const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('Função calcularMediaAluno', () => {
  test('deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar exceção quando a1 não for informada', () => {
    expect(() => calcularMediaAluno(undefined, 8, 7)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar exceção quando a2 não for informada', () => {
    expect(() => calcularMediaAluno(7, undefined, 6)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar exceção quando a1 for negativa', () => {
    expect(() => calcularMediaAluno(-1, 8, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve lançar exceção quando a2 for negativa', () => {
    expect(() => calcularMediaAluno(7, -2, 6)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve lançar exceção quando a3 for negativa', () => {
    expect(() => calcularMediaAluno(7, 8, -3)).toThrow('Nota a3 não pode ser negativa');
  });

  test('deve calcular a média correta quando a3 não for informada', () => {
    expect(calcularMediaAluno(7, 8)).toBeCloseTo(7.6);
  });

  test('deve calcular a média correta quando a3 não for informada (outro caso)', () => {
    expect(calcularMediaAluno(5, 10)).toBeCloseTo(8.0);
  });

  test('deve calcular substituindo a2 (menor nota)', () => {
    expect(calcularMediaAluno(9, 5, 8)).toBeCloseTo(8.4);
  });

  test('deve calcular substituindo a1 (menor nota)', () => {
    expect(calcularMediaAluno(4, 9, 8)).toBeCloseTo(8.6);
  });

  test('deve calcular substituindo a2 quando ambas notas são iguais', () => {
    expect(calcularMediaAluno(6, 6, 10)).toBeCloseTo(8.4);
  });

  test('deve calcular corretamente com notas altas e recuperação menor', () => {
    expect(calcularMediaAluno(10, 9, 7)).toBeCloseTo(8.2);
  });
});
