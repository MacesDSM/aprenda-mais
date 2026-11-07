# Guia de Contribuição 🚀

Bem-vindo ao repositório do nosso Projeto Integrador! Este documento foi criado para ajudar todo o grupo a configurar o ambiente local, baixar o código e começar a desenvolver sem complicações. 

Como estamos no primeiro semestre, este guia traz o passo a passo detalhado. Em caso de dúvidas, fale com o líder técnico do projeto.

---

## 📌 Pré-requisitos Básicos

Antes de começar, você precisa ter duas ferramentas instaladas no seu computador:

1. **Git**: Para gerenciar as versões do código. [Baixar Git](https://git-scm.com/)
2. **Node.js (Versão LTS)**: O ambiente que permite executar o JavaScript no computador e que traz o **npm** (gerenciador de pacotes) junto. [Baixar Node.js](https://nodejs.org/)

---

## 🛠️ Passo a Passo: Configuração Inicial

Siga estas etapas para ter o projeto rodando na sua máquina:

### 1. Clonar o Repositório
Abra o terminal (ou Git Bash) na pasta onde deseja salvar o projeto e digite:
```bash
git clone https://github.com/MacesDSM/aprenda-mais.git
```
Como alternativa, você pode baixar o projeto, clicando no botão `Code`, e em Download ZIP. Em seguida descompacte o arquivo.
### 2. Entrar na Pasta do Projeto
```bash
cd aprenda-mais
```

### 3. Instalar as Dependências (npm)
O projeto utiliza o React com bibliotecas auxiliares. Para baixar todas as dependências necessárias automaticamente, execute:
```bash
npm install
```
*Isso criará uma pasta chamada `node_modules`. Nunca apague ou envie essa pasta para o GitHub.*

### 4. Rodar o Projeto Localmente
Como nosso projeto foi estruturado com o **Vite**, o comando para iniciar o servidor de desenvolvimento é:
```bash
npm run dev
```
Após rodar o comando, o terminal exibirá um link local (geralmente `http://localhost:5173/`). Copie e cole no seu navegador para ver o projeto funcionando!

---

## 💾 Sobre o Armazenamento de Dados (LocalStorage)

Como este projeto **não utiliza banco de dados centralizado**, estamos salvando todas as informações diretamente no navegador usando a **API do LocalStorage**. 

⚠️ **Atenção:** 
* Os dados cadastrados na sua máquina **ficam salvos apenas no seu navegador**.
* Se o seu colega testar o projeto na máquina dele, ele não verá os dados que você cadastrou. Cada ambiente de teste é isolado e individual.
* Se você limpar os dados de navegação (cookies/cache) do seu navegador, os dados salvos do projeto serão apagados.

---

## 🌿 Fluxo de Trabalho do Git (Boas Práticas)

Para evitar que duas pessoas mexam no mesmo arquivo ao mesmo tempo e gerem conflitos difíceis de resolver, sigamos este fluxo:

1. **Nunca desenvolva direto na branch `main` ou `master`.**
2. Antes de começar uma nova tarefa, atualize seu repositório local:
   ```bash
   git checkout main
   git pull
   ```
3. Crie uma nova branch para a sua tarefa (use nomes simples, ex: `tela-cadastro`, `correcao-botao`):
   ```bash
   git checkout -b nome-da-sua-branch
   ```
4. Faça suas alterações, salve e faça o commit:
   ```bash
   git add .
   git commit -m "Explique brevemente o que você fez"
   ```
5. Envie para o GitHub:
   ```bash
   git push origin nome-da-sua-branch
   ```
6. Abra um **Pull Request (PR)** no GitHub para que o grupo revise e junte o código à branch principal.