# Movie App - GraphQL Full Stack

Полнофункциональное приложение для управления фильмами с GraphQL API и React фронтендом.

## 🚀 Технологии

### Backend
- Node.js + TypeScript
- GraphQL (Apollo Server)
- Prisma ORM
- PostgreSQL
- JWT аутентификация
- bcrypt для хеширования паролей

### Frontend
- React 18 + TypeScript
- Apollo Client (GraphQL)
- Material-UI
- React Router

## 📁 Структура проекта

```
MovieApp-GraphQl/
├── src/                    # Backend код
│   ├── auth/              # Аутентификация
│   ├── db/                # База данных
│   ├── schema/            # GraphQL схема
│   └── validation/        # Валидация
├── frontend/              # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── contexts/      # React контексты
│   │   ├── graphql/       # GraphQL запросы
│   │   └── types/         # TypeScript типы
│   └── package.json
├── prisma/                # Схема базы данных
└── package.json
```

## 🛠️ Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd MovieApp-GraphQl
npm install
cd frontend
npm install
cd ..
```

### 2. Настройка базы данных

1. Создайте файл `.env` в корне проекта:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/movieapp"
JWT_SECRET="your-secret-key"
```

2. Настройте базу данных:
```bash
npm run db:generate
npm run db:push
```

### 3. Запуск приложения

#### Вариант 1: Запуск только бэкенда
```bash
npm run dev
```

#### Вариант 2: Запуск только фронтенда
```bash
npm run frontend
```

#### Вариант 3: Запуск всего приложения
```bash
npm run dev:full
```

## 🌐 Доступные URL

- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000/graphql
- **GraphQL API**: http://localhost:4000/graphql

## 🔐 Аутентификация

Приложение поддерживает:
- Регистрацию новых пользователей
- Вход в систему
- JWT токены для аутентификации
- Защищенные маршруты

## 📽️ Функции приложения

### Backend API
- ✅ CRUD операции для фильмов
- ✅ Аутентификация пользователей
- ✅ Валидация данных
- ✅ GraphQL схема
- ✅ Prisma ORM

### Frontend
- ✅ Современный UI с Material-UI
- ✅ Аутентификация (регистрация/вход)
- ✅ Просмотр списка фильмов
- ✅ Добавление новых фильмов
- ✅ Редактирование фильмов
- ✅ Удаление фильмов
- ✅ Рейтинговая система
- ✅ Адаптивный дизайн

## 📝 GraphQL Схема

### Запросы (Queries)
- `movies` - получить все фильмы пользователя
- `movie(id)` - получить конкретный фильм

### Мутации (Mutations)
- `register(username, password)` - регистрация
- `login(username, password)` - вход
- `createMovie(...)` - создать фильм
- `updateMovie(id, ...)` - обновить фильм
- `deleteMovie(id)` - удалить фильм

## 🎯 Следующие шаги для улучшения

- [ ] Поиск и фильтрация фильмов
- [ ] Пагинация
- [ ] Загрузка изображений
- [ ] Рейтинги и отзывы
- [ ] Избранные фильмы
- [ ] Тесты (Jest, Supertest)
- [ ] Docker контейнеризация
- [ ] CI/CD пайплайн
- [ ] Мониторинг и логирование
- [ ] Экспорт/импорт данных
- [ ] Интеграция с внешними API (OMDB, TMDB)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License
