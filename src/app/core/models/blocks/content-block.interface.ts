export enum BlockType {
  HEADER = 'HEADER',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  COMPARISON = 'COMPARISON',
  CHECKLIST = 'CHECKLIST',
  MODULE_HIGHLIGHT = 'MODULE_HIGHLIGHT',
  ALERT = 'ALERT',
  TIMELINE = 'TIMELINE',
  YOUTUBE = 'YOUTUBE' // <-- Adicione esta linha

}

export enum AlertType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  order: number;
  data: any;
}

export interface HeaderBlock extends ContentBlock {
  type: BlockType.HEADER;
  data: {
    title: string;
    subtitle?: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface TextBlock extends ContentBlock {
  type: BlockType.TEXT;
  data: {
    content: string;
    allowHtml: boolean;
  };
}

export interface ImageBlock extends ContentBlock {
  type: BlockType.IMAGE;
  data: {
    url: string;
    alt: string;
    caption?: string;
    width?: 'full' | 'large' | 'medium' | 'small';
    zoomable?: boolean;
  };
}

export interface ComparisonBlock extends ContentBlock {
  type: BlockType.COMPARISON;
  data: {
    imageBefore: string;
    imageAfter: string;
    captionBefore?: string;
    captionAfter?: string;
    sliderPosition?: number;
  };
}

export interface ChecklistItem {
  text: string;
  checked: boolean;
  highlight?: boolean;
}

export interface ChecklistBlock extends ContentBlock {
  type: BlockType.CHECKLIST;
  data: {
    title?: string;
    items: ChecklistItem[];
  };
}



export interface ModuleHighlightBlock extends ContentBlock {
  type: BlockType.MODULE_HIGHLIGHT;
  data: {
    title: string;
    subtitle?: string;
    iconUrl: string;
    features: string[];
    variant?: 'primary' | 'secondary' | 'accent';
  };
}

export interface AlertBlock extends ContentBlock {
  type: BlockType.ALERT;
  data: {
    type: AlertType;
    title?: string;
    message: string;
    dismissible?: boolean;
  };
}

export interface TimelineStep {
  title: string;
  description: string;
  icon?: string;
  status?: 'pending' | 'active' | 'completed';
}

export interface TimelineBlock extends ContentBlock {
  type: BlockType.TIMELINE;
  data: {
    title?: string;
    orientation?: 'vertical' | 'horizontal';
    steps: TimelineStep[];
  };
}



export interface YoutubeBlock extends ContentBlock {
  type: BlockType.YOUTUBE;
  data: {
    videoUrl: string;
    title?: string;
  };
}

export function isHeaderBlock(block: ContentBlock): block is HeaderBlock {
  return block.type === BlockType.HEADER;
}

export function isTextBlock(block: ContentBlock): block is TextBlock {
  return block.type === BlockType.TEXT;
}

export function isImageBlock(block: ContentBlock): block is ImageBlock {
  return block.type === BlockType.IMAGE;
}

export function isComparisonBlock(block: ContentBlock): block is ComparisonBlock {
  return block.type === BlockType.COMPARISON;
}

export function isChecklistBlock(block: ContentBlock): block is ChecklistBlock {
  return block.type === BlockType.CHECKLIST;
}

export function isModuleHighlightBlock(block: ContentBlock): block is ModuleHighlightBlock {
  return block.type === BlockType.MODULE_HIGHLIGHT;
}

export function isAlertBlock(block: ContentBlock): block is AlertBlock {
  return block.type === BlockType.ALERT;
}

export function isTimelineBlock(block: ContentBlock): block is TimelineBlock {
  return block.type === BlockType.TIMELINE;
}

export function isYoutubeBlock(block: ContentBlock): block is YoutubeBlock {
  return block.type === BlockType.YOUTUBE;
}
