import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockType, ContentBlock, AlertType, ComparisonBlock } from '../../../core/models/blocks/content-block.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-block-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './block-manager.component.html',
  styleUrls: ['./block-manager.component.css']
})
export class BlockManagerComponent {
  @Input() set blocks(value: ContentBlock[]) {
    this._blocks.set(value);
  }

  // Lógica: Trocamos o localhost fixo pela base dinâmica do environment
  private readonly UPLOAD_API_URL = `${environment.apiUrl}/uploads`;
  private http = inject(HttpClient);

  @Output() blocksChange = new EventEmitter<ContentBlock[]>();

  _blocks = signal<ContentBlock[]>([]);

  BlockType = BlockType;
  AlertType = AlertType;

  availableBlocks = [
    { type: BlockType.HEADER, label: 'Título', icon: '📝', description: 'Adicione um cabeçalho' },
    { type: BlockType.TEXT, label: 'Texto', icon: '📄', description: 'Escreva um parágrafo' },
    { type: BlockType.IMAGE, label: 'Imagem', icon: '🖼️', description: 'Insira uma foto' },
    { type: BlockType.ALERT, label: 'Aviso', icon: '💡', description: 'Destaque importante' },
    { type: BlockType.CHECKLIST, label: 'Tarefas', icon: '✓', description: 'Lista de verificação' },
    { type: BlockType.MODULE_HIGHLIGHT, label: 'Destaque', icon: '⭐', description: 'Card especial' },
    { type: BlockType.COMPARISON, label: 'Comparação', icon: '↔️', description: 'Antes e Depois' },
    { type: BlockType.TIMELINE, label: 'Linha do Tempo', icon: '🕒', description: 'Eventos em sequência' },
    { type: BlockType.YOUTUBE, label: 'Vídeo YouTube', icon: '▶️', description: 'Incorpore um vídeo' }
  ];

  showAddMenu = false;

  // Lógica: Fallback de segurança. Se o navegador bloquear o crypto.randomUUID (por não ter HTTPS),
  // o try-catch captura o erro e usamos matemática nativa para gerar um ID único.
  private generateSafeUUID(): string {
    try {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
    } catch (e) {
      console.warn('crypto.randomUUID não disponível (falta HTTPS?), usando fallback matemático.');
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addBlock(type: BlockType) {
    const newBlock: ContentBlock = {
      // Lógica: Chamamos a nova função que garante a criação do ID sem quebrar a tela
      id: this.generateSafeUUID(),
      type: type,
      order: this._blocks().length,
      data: this.getInitialDataForType(type)
    };

    this.updateList([...this._blocks(), newBlock]);
    this.showAddMenu = false;
  }

  removeBlock(index: number) {
    const newList = this._blocks().filter((_, i) => i !== index);
    this.updateList(newList);
  }

  moveBlock(index: number, direction: 'up' | 'down') {
    const list = [...this._blocks()];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < list.length) {
      [list[index], list[newIndex]] = [list[newIndex], list[index]];
      list.forEach((block, i) => block.order = i);
      this.updateList(list);
    }
  }

  duplicateBlock(index: number) {
    const blocks = [...this._blocks()];
    const blockToDuplicate = blocks[index];
    const duplicatedBlock: ContentBlock = {
      ...blockToDuplicate,
      // Lógica: A mesma segurança aplicada na duplicação
      id: this.generateSafeUUID(),
      order: index + 1,
      data: JSON.parse(JSON.stringify(blockToDuplicate.data))
    };

    blocks.splice(index + 1, 0, duplicatedBlock);
    blocks.forEach((block, i) => block.order = i);
    this.updateList(blocks);
  }

  private updateList(newList: ContentBlock[]) {
    this._blocks.set(newList);
    this.blocksChange.emit(newList);
  }

  private getInitialDataForType(type: BlockType): any {
    switch (type) {
      case BlockType.HEADER:
        return { title: '', level: 2 };
      case BlockType.TEXT:
        return { content: '' };
      case BlockType.ALERT:
        return { type: AlertType.INFO, title: '', message: '' };
      case BlockType.CHECKLIST:
        return { title: 'Lista de Verificação', items: [] };
      case BlockType.IMAGE:
        return { url: '', caption: '' };
      case BlockType.MODULE_HIGHLIGHT:
        return { title: '', subtitle: '', iconUrl: '', variant: 'primary', features: [] };
      case BlockType.COMPARISON:
        return { imageBefore: '', imageAfter: '', captionBefore: '', captionAfter: '', sliderPosition: 50 };
      case BlockType.TIMELINE:
        return { title: 'Marcos do Projeto', items: [{ title: '', date: '', description: '' }] };
      case BlockType.YOUTUBE:
        return { videoUrl: '', title: '' };
      default:
        return {};
    }
  }

  addFeature(blockIndex: number) {
    const blocks = [...this._blocks()];
    if (!blocks[blockIndex].data.features) {
      blocks[blockIndex].data.features = [];
    }
    blocks[blockIndex].data.features.push('');
    this.updateList(blocks);
  }

  removeFeature(blockIndex: number, featureIndex: number) {
    const blocks = [...this._blocks()];
    blocks[blockIndex].data.features.splice(featureIndex, 1);
    this.updateList(blocks);
  }

  trackByFn(index: number): number {
    return index;
  }

  addChecklistItem(blockIndex: number) {
    const blocks = [...this._blocks()];
    const block = blocks[blockIndex];
    if (!block.data.items) block.data.items = [];

    block.data.items.push({ text: '', checked: false });
    this.updateList(blocks);
  }

  removeChecklistItem(blockIndex: number, itemIndex: number) {
    const blocks = [...this._blocks()];
    blocks[blockIndex].data.items.splice(itemIndex, 1);
    this.updateList(blocks);
  }

  getBlockTypeName(type: BlockType): string {
    const blockInfo = this.availableBlocks.find(b => b.type === type);
    return blockInfo ? blockInfo.label : type;
  }

  getBlockTypeIcon(type: BlockType): string {
    const blockInfo = this.availableBlocks.find(b => b.type === type);
    return blockInfo ? blockInfo.icon : '📦';
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3EErro ao carregar imagem%3C/text%3E%3C/svg%3E';
  }


// Logica: O parametro 'field' agora e opcional. Se nao for passado, assumimos que e um bloco IMAGE comum.
  onUploadImage(event: Event, block: ContentBlock, field?: 'imageBefore' | 'imageAfter'): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Logica: Reutiliza a URL de upload que ja configuramos com o environment
      this.http.post<{ url: string }>(this.UPLOAD_API_URL, formData).subscribe({
        next: (response) => {
          if (block.type === BlockType.COMPARISON && field) {
            // Logica: Se for COMPARISON, salva no campo especifico (antes ou depois)
            (block as ComparisonBlock).data[field] = response.url;
          } else {
            // Logica: Se for um bloco IMAGE comum, salva diretamente na url do data
            block.data.url = response.url;
          }
          console.log('Upload concluido com sucesso:', response.url);
        },
        error: (err) => {
          console.error('Erro no upload:', err);
          alert('Nao foi possivel carregar a imagem do seu computador.');
        },
        complete: () => {
          input.value = ''; // Limpa o input para permitir o mesmo arquivo novamente
        }
      });
    }
  }
}
