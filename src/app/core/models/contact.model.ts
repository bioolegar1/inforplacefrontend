export interface ContactMessage {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  dataEnvio?: Date;
}
