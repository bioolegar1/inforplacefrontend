import { Component, OnInit, signal, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BlockManagerComponent } from '../../../../ui/blocks/block-manager/block-manager.component';
import { BlockType, ContentBlock } from '../../../../core/models/blocks/content-block.interface';
import { PostService } from '../../../../core/services/post.service';
import { PostType, ProductSystem, PostRequest, PostResponse } from '../../../../core/models/post.model';
import {environment} from '../../../../../environments/environment';

// Importacao do arquivo de ambiente para controle dinamico de URL.
// Ajuste a quantidade de '../' conforme a profundidade exata desta pasta no seu projeto.

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BlockManagerComponent],
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  @ViewChild(BlockManagerComponent) blockManager!: BlockManagerComponent;

  private http = inject(HttpClient);

  // Lógica de Correção: A variavel agora e montada dinamicamente lendo o ambiente ativo.
  private readonly UPLOAD_API_URL = `${environment.apiUrl}/uploads`;

  form: FormGroup;
  blocks = signal<ContentBlock[]>([]);
  isLoading = signal(false);
  isEditing = signal(false);

  postTypes = Object.values(PostType);
  systems = Object.values(ProductSystem);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      type: [PostType.TUTORIAL, Validators.required],
      productSystem: [ProductSystem.PILLAR, Validators.required],
      version: [''],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      coverImage: [''],
      isPublished: [false]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.loadPost(Number(id));
    }
  }

  loadPost(id: number) {
    this.isLoading.set(true);
    this.postService.getPostById(id).subscribe({
      next: (post: PostResponse) => {
        this.form.patchValue(post);
        this.blocks.set(post.contentBlocks || []);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar conteúdo:', err);
        this.isLoading.set(false);
      }
    });
  }

  generateSlug() {
    const title = this.form.get('title')?.value;
    if (title) {
      const slug = title.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      this.form.patchValue({ slug });
    }
  }

  addBlockFromSidebar(blockType: string) {
    const type = BlockType[blockType as keyof typeof BlockType];
    if (type && this.blockManager) {
      this.blockManager.addBlock(type);
    }
  }

  updateBlocks(newBlocks: ContentBlock[]) {
    this.blocks.set(newBlocks);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const postData: PostRequest = {
      ...this.form.value,
      contentBlocks: this.blocks()
    };

    const id = this.route.snapshot.paramMap.get('id');
    const operation = this.isEditing() && id
      ? this.postService.updatePost(Number(id), postData)
      : this.postService.createPost(postData);

    operation.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/admin/posts']).then();
      },
      error: (err: any) => {
        this.isLoading.set(false);
        console.error('Erro ao salvar:', err);
        alert('Erro ao salvar os dados no servidor.');
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.isLoading.set(true);
      this.http.post<{ url: string }>(this.UPLOAD_API_URL, formData).subscribe({
        next: (res) => {
          this.form.patchValue({ coverImage: res.url });
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          alert('Erro no upload da imagem.');
        }
      });
    }
  }

  removeImage() { this.form.patchValue({ coverImage: null }); }
}
