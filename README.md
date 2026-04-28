# Inforplace - Modular Frontend Web

Este é o frontend moderno e modular do Portal Inforplace, desenvolvido com **Angular 21** e focado em alta performance, SEO e flexibilidade de conteúdo através de um sistema baseado em blocos.

## 🚀 Tecnologias e Inovações

- **Angular 21:** Utilizando as últimas funcionalidades como Standalone Components, Signal-based state e Zoneless por padrão.
- **Server-Side Rendering (SSR):** Implementado via `@angular/ssr` para carregamento instantâneo e otimização total para motores de busca.
- **Tailwind CSS:** Design responsivo e customizado com a identidade visual Inforplace.
- **Arquitetura de Blocos (Dynamic CMS):** Sistema único que permite construir páginas dinamicamente usando componentes de Cabeçalho, Texto, Imagem, Comparação (Antes/Depois), Linha do Tempo e YouTube.
- **Lucide Angular:** Biblioteca de ícones moderna e leve.

## 📂 Estrutura do Projeto

- `src/app/core/`: Serviços globais, interceptors, guards e modelos de dados.
- `src/app/features/public/`: Landing pages, soluções Inforplace e Hub de Conteúdo (Blog).
- `src/app/features/admin/`: Painel administrativo completo para gestão de postagens e usuários.
- `src/app/ui/blocks/`: Biblioteca de blocos dinâmicos para renderização de conteúdo.

## 🛠️ Como Iniciar

### Pré-requisitos
- Node.js 22 ou superior
- Angular CLI 21+

### Instalação
```bash
npm install
```

### Servidor de Desenvolvimento
Para rodar localmente com suporte a HTTPS (necessário para certas funcionalidades de upload e segurança):
```bash
npm start
```
Acesse: `https://localhost:4200/`

### Build e Produção
Para gerar o pacote otimizado com suporte a SSR:
```bash
npm run build
```

## 🐳 Docker e Deploy
O projeto está preparado para rodar em containers:
```bash
docker build -t inforplace-frontend .
docker run -p 4000:4000 inforplace-frontend
```

## 🔐 Segurança e Boas Práticas
- Os arquivos de ambiente (`environment.ts`) estão configurados para redirecionamento dinâmico de API.
- Certificados `.pem` e arquivos `.env` são estritamente ignorados pelo controle de versão para garantir a segurança das credenciais.

---
Desenvolvido por **BioOlegari** para o Ecossistema Inforplace.
