# gerar-cartao-malga

[![npm version](https://img.shields.io/npm/v/gerar-cartao-malga)](https://www.npmjs.com/package/gerar-cartao-malga)
[![license](https://img.shields.io/npm/l/gerar-cartao-malga)](LICENSE)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-blue)

CLI para gerar cartões de teste no sandbox da [Malga](https://docs.malga.io/sdks/api-sdks/docs/sandbox/generate-card#gerar-cartao), com seleção de bandeira, status e cópia automática para a área de transferência.

---

## 🚀 Instalação

Instale o CLI globalmente com:

```bash
npm install -g gerar-cartao-malga
```

---

## 🧾 Uso

1. Crie um arquivo `.env` na raiz do projeto com suas credenciais da Malga:

```bash
MALGA_API_KEY=sua-chave  
MALGA_CLIENT_ID=seu-client-id
```

2. Execute o comando interativo:

```bash
gerar-cartao
```

3. Siga as instruções no terminal:
- Escolha a bandeira (Visa, Mastercard, etc)
- Escolha o status do cartão (authorized, expired_card, etc)
- O cartão será gerado e poderá ser copiado para sua área de transferência automaticamente.

---

## 🎯 Funcionalidades

- Geração de cartões de teste no sandbox Malga  
- Seleção interativa da bandeira e status  
- Cópia automática do número ou dados completos para a área de transferência  
- Interface de linha de comando intuitiva com prompts

---

## 📄 Licença

MIT © [Gesley Elois](https://github.com/gesleyelois)
