# Gerador de SUCI (5G - ECDH)

Este projeto é um simulador para a geração e reversão do **SUCI (Subscription Concealed Identifier)**, um mecanismo fundamental de privacidade e segurança em redes 5G. A solução utiliza o esquema de proteção de chave pública **ECIES (Elliptic Curve Integrated Encryption Scheme)**, baseado em **ECDH (Elliptic Curve Diffie-Hellman)**, para cifrar o identificador permanente do assinante (SUPI) e proteger a identidade do usuário contra interceptação.

A aplicação foi desenvolvida como parte de um estudo sobre os algoritmos de criptografia e os protocolos de segurança que sustentam a arquitetura das redes 5G.

## Contexto: Privacidade em Redes 5G

Em redes móveis, a identidade de um assinante é tradicionalmente vinculada ao seu **IMSI (International Mobile Subscriber Identity)**. No entanto, a transmissão do IMSI em texto claro representa um risco significativo de segurança, permitindo o rastreamento de usuários e outros ataques.

As redes 5G introduzem o conceito de **SUPI (Subscription Permanent Identifier)** e, para proteger a privacidade do usuário, o SUPI é raramente transmitido. Em vez disso, ele é cifrado para criar um **SUCI**. Este projeto demonstra o processo de geração de SUCI a partir de um SUPI (ou qualquer texto de entrada) e o processo inverso, simulando a decifragem que ocorreria na função de rede UDM (Unified Data Management).

## Funcionalidades

*   **Geração de SUCI:** Converte um texto de entrada (simulando um SUPI) em um SUCI cifrado utilizando ECDH.
*   **Reversão de SUCI:** Converte o SUCI de volta para o texto original, simulando o processo de decifragem na rede.
*   **Interface Web Simples:** Uma interface desenvolvida em React para facilitar a interação com o backend.
*   **Backend Robusto:** Um servidor Express que lida com toda a lógica de criptografia e decifragem.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

| Componente | Tecnologia | Biblioteca Principal |
| :--- | :--- | :--- |
| **Frontend** | React.js | - |
| **Backend** | Node.js / Express.js | `crypto` (módulo nativo do Node.js) |

## Pré-requisitos

Para executar este projeto, você precisará ter o **Node.js** instalado em sua máquina. O `npm` (Node Package Manager) será instalado junto com o Node.js.

- [Node.js](https://nodejs.org/)

## Instalação e Execução

O projeto está dividido em duas pastas: `frontend` e `backend`. Siga os passos abaixo para executar a aplicação.

### 1. Backend (Servidor Express)

Navegue até a pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

Após a instalação, inicie o servidor:

```bash
node index.js
```

O servidor estará em execução na porta definida no arquivo `index.js` (geralmente `http://localhost:3001` ou similar).

### 2. Frontend (Aplicação React)

Abra um novo terminal, navegue até a pasta do frontend e instale as dependências:

```bash
cd frontend
npm install
```

Após a instalação, inicie a aplicação React:

```bash
npm start
```

A aplicação será aberta automaticamente no seu navegador padrão, geralmente em `http://localhost:3000`.

## Estrutura do Projeto

```
.gerador-suci/
├── backend/
│   ├── node_modules/
│   ├── index.js
│   └── package.json
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   └── ... (arquivos do React)
    └── package.json
```

## Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).
