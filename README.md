<h1 align="center">
    <a href="https://laravelcollective.com/tools/banner">
        <img alt="Banner" title="#Banner" style="object-fit: cover;" src="App.png"  />
    </a>
</h1>

# 📝 Lista de Tarefas (Todo List)

<p align="center">Uma aplicação web moderna de lista de tarefas desenvolvida com React no frontend e Laravel no backend. </p>

<h2 align="center">
  <img src="https://img.shields.io/badge/web%3F-ok-blue?style=for-the-badge" alt="Sistema web Ok" />
  <img src="https://img.shields.io/badge/server%3F-ok-blue?style=for-the-badge" alt="Server Ok" />
  <img src="https://img.shields.io/badge/Mobile-OK-blue?style=for-the-badge" alt="Aplicativo mobile Ok" />
</h2>

## 📌 Índice
<p align="center">         
  <a href="#tecnologias">Tecnologias </a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;        
  <a href="#instalação"> Instalação e Uso </a> &nbsp; &nbsp; &nbsp;
</p>  

## Tecnologias                                
### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PHP](https://php.net) (v8.1 ou superior)
- [Composer](https://getcomposer.org/)

## 🔧 Instalação e Configuração

### Backend (Laravel)

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências do PHP:
```bash
composer install
```

3. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure o arquivo .env com suas credenciais do banco de dados

5. Gere a chave da aplicação:
```bash
php artisan key:generate
```

6. Execute as migrações do banco de dados:
```bash
php artisan migrate
```

7. Inicie o servidor:
```bash
php artisan serve
```

O backend estará rodando em `http://localhost:8000`

### Frontend (React)

1. Em outro terminal, navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

-------------          

- [Voltar ao Início](#index)
