import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeBlock } from '../../../core/models/blocks/content-block.interface';

@Pipe({
  name: 'safeYoutubeUrl',
  standalone: true
})
export class SafeYoutubeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl | null {
    if (!url) return null;

    // Logica: Esta Regex identifica o ID de 11 caracteres em links comuns,
    // links de compartilhamento, links de Shorts e ate dentro do codigo de um IFRAME.
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/|src="https:\/\/www\.youtube\.com\/embed\/)([^#&?"\s]*).*/;
    const match = url.match(regExp);

    if (match && match[1].length === 11) {
      const videoId = match[1];
      // Logica: Montamos a URL de incorporacao segura com o ID extraido
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return null;
  }
}

@Component({
  selector: 'app-youtube-block',
  standalone: true,
  imports: [CommonModule, SafeYoutubeUrlPipe],
  template: `
    <div class="youtube-block w-full max-w-4xl mx-auto my-8">
      @if (data.title) {
        <h3 class="text-xl font-bold mb-4 text-gray-900">{{ data.title }}</h3>
      }

      <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-black">
        @if (data.videoUrl | safeYoutubeUrl; as safeUrl) {
          <iframe
            [src]="safeUrl"
            class="absolute top-0 left-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        } @else {
          <div class="flex flex-col items-center justify-center h-full text-white p-4 text-center">
            <p class="text-sm opacity-60">Aguardando URL valida do YouTube...</p>
          </div>
        }
      </div>
    </div>
  `
})
export class YoutubeBlockComponent {
  @Input() data!: YoutubeBlock['data'];
}
