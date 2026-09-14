/**
 * Tabela de medidas — padrão mais comum do mercado de moda feminina
 * brasileiro (numeração P/M/G/GG equivalente a 36–50), medidas do
 * corpo em centímetros. Usada como referência geral para blusas e
 * regatas; não é uma medida exata da peça.
 */
export const sizeGuide = {
  unit: 'cm',
  columns: ['Tamanho', 'Numeração', 'Busto', 'Cintura', 'Quadril'],
  rows: [
    { size: 'P', numbering: '36–38', busto: '86–90', cintura: '66–70', quadril: '90–94' },
    { size: 'M', numbering: '40–42', busto: '91–95', cintura: '71–75', quadril: '95–99' },
    { size: 'G', numbering: '44–46', busto: '96–102', cintura: '76–82', quadril: '100–106' },
    { size: 'GG', numbering: '48–50', busto: '103–109', cintura: '83–89', quadril: '107–113' },
  ],
  note: 'Medidas aproximadas do corpo, não da peça — podem variar um pouco conforme o modelo. Entre dois tamanhos, prefira o maior.',
};
