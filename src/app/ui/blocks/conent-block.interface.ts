/**
 * Lógica: Definimos um Enum para os tipos de blocos para evitar erros de digitação
 * e facilitar o uso no @switch do Renderer e nas funções do Manager.
 */
export enum BlockType {
  HEADER = 'HEADER',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  COMPARISON = 'COMPARISON',
  CHECKLIST = 'CHECKLIST',
  MODULE_HIGHLIGHT = 'MODULE_HIGHLIGHT',
  ALERT = 'ALERT',
  TIMELINE = 'TIMELINE'
}

/**
 * Lógica: Tipos específicos para o bloco de alerta, garantindo que o estilo
 * visual corresponda à intenção da mensagem.
 */
export enum AlertType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

/**
 * Lógica: Interface principal que representa a estrutura salva no banco de dados (JSONB).
 * O campo 'data' é genérico (any) porque cada tipo de bloco tem propriedades diferentes.
 */
export interface ContentBlock {
  id: string; // Lógica: Usamos UUID gerado no front para manipulação em memória.
  type: BlockType;
  order: number; // Lógica: Define a posição na lista para o sortedBlocks.
  data: any;
}

/**
 * Lógica: Interfaces específicas para Castings.
 * Usadas no BlockManager para garantir que o TypeScript reconheça os campos durante o upload.
 */
export interface ComparisonBlock extends ContentBlock {
  type: BlockType.COMPARISON;
  data: {
    imageBefore: string;
    imageAfter: string;
    captionBefore?: string;
    captionAfter?: string;
    sliderPosition: number;
  };
}

export interface HeaderBlock extends ContentBlock {
  type: BlockType.HEADER;
  data: {
    title: string;
    level: 1 | 2 | 3;
  };
}

export interface TextBlock extends ContentBlock {
  type: BlockType.TEXT;
  data: {
    content: string;
  };
}

export interface AlertBlock extends ContentBlock {
  type: BlockType.ALERT;
  data: {
    type: AlertType;
    title: string;
    message: string;
  };
}
