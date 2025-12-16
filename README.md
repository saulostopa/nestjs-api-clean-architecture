# NestJS Clean Architecture Backend

## Overview

This project is a backend API built with **NestJS** following **Clean Architecture**, **Domain-Driven Design (DDD)** and **Hexagonal Architecture** principles.

The goal of this repository is to serve as a **production-ready reference architecture**, focused on:

* Explicit transaction management
* Clear separation of concerns
* High testability
* Long-term scalability

It intentionally avoids framework leakage into the domain and application layers.

---

## Architecture Principles

This project is designed around the following architectural principles:

* **Clean Architecture** – separation between domain, application and infrastructure
* **Domain-Driven Design (DDD)** – explicit domain modeling
* **Hexagonal Architecture (Ports & Adapters)** – dependency inversion
* **Explicit Unit of Work** – transactional consistency
* **CQRS (planned)** – separation of write and read models

### References

* Clean Architecture: [https://en.wikipedia.org/wiki/Clean_architecture](https://en.wikipedia.org/wiki/Clean_architecture)
* Domain-Driven Design: [https://en.wikipedia.org/wiki/Domain-driven_design](https://en.wikipedia.org/wiki/Domain-driven_design)
* Hexagonal Architecture: [https://alistair.cockburn.us/hexagonal-architecture/](https://alistair.cockburn.us/hexagonal-architecture/)
* Unit of Work: [https://martinfowler.com/eaaCatalog/unitOfWork.html](https://martinfowler.com/eaaCatalog/unitOfWork.html)
* CQRS: [https://martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html)

---

## Tech Stack

* **Node.js**
* **TypeScript**
* **NestJS** – application framework
* **Prisma ORM** – data access layer
* **PostgreSQL** – write model
* **MongoDB** – read model (planned / CQRS)
* **Redis** – caching / rate limiting
* **Jest** – unit and integration testing
* **Testcontainers** – real database integration tests
* **GraphQL** – planned

### Main Libraries

* NestJS: [https://nestjs.com](https://nestjs.com)
* Prisma: [https://www.prisma.io](https://www.prisma.io)
* PostgreSQL: [https://www.postgresql.org](https://www.postgresql.org)
* MongoDB: [https://www.mongodb.com](https://www.mongodb.com)
* Testcontainers: [https://testcontainers.com](https://testcontainers.com)

---

## Project Structure

```txt
src/
├── modules/
│   ├── users/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── repositories/
│   │   ├── application/
│   │   │   ├── services/
│   │   │   └── ports/
│   │   ├── infra/
│   │   │   ├── prisma/
│   │   │   └── mongo/
│   │   └── http/
│   ├── posts/            # Planned
│   └── comments/         # Planned
│
└── shared/
    └── database/
        ├── prisma/
        └── mongo/
```

### Layer Responsibilities

* **domain**: entities, value objects, domain events, repository interfaces
* **application**: use cases, services, ports
* **infra**: database implementations, Prisma, Mongo, Redis
* **http**: REST / GraphQL controllers

---

## Domain Model

The initial domain is composed of:

* **User** (aggregate root)
* **Delivery** (aggregate root)
* **Post** (belongs to User – planned)
* **Comment** (belongs to Post – planned)

This hierarchy prepares the system for deep GraphQL nesting:

```
User → Post → Comment
```

---

## Transactions & Unit of Work

All write operations are executed inside an explicit **Unit of Work**.

* The application layer is unaware of Prisma
* Repositories can be transaction-bound via `withTransaction`
* Rollback behavior is tested with real databases

This ensures strong consistency while keeping the domain isolated.

---

## Testing Strategy

### Unit Tests

* Application services are tested by mocking repositories and UnitOfWork
* No database access

### Integration Tests

* Prisma + PostgreSQL using **Testcontainers**
* Real transactions
* Rollback behavior explicitly validated

---

## CQRS (Planned)

CQRS will be implemented in a **lightweight manner**:

* **Commands** → PostgreSQL + Prisma
* **Queries** → MongoDB read models
* **Synchronization** → domain events post-commit

This avoids unnecessary complexity while allowing scalability.

---

## GraphQL (Planned)

GraphQL will be introduced after stabilizing the domain model:

* Deep nested queries (User → Posts → Comments)
* DataLoader for N+1 prevention
* Clear separation between read and write models

---

## Environment Variables

Create a `.env` file based on the example below:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/app
MONGO_URL=mongodb://localhost:27017/app
REDIS_URL=redis://localhost:6379
```

Never commit real credentials.

---

## Installation & Running

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

---

## Database & Migrations

Prisma Migrate is the only mechanism used to manage schema changes.

* `prisma migrate dev` → local development
* `prisma migrate deploy` → CI / production
* `prisma db seed` is intentionally reset seed.
* `db push` is intentionally avoided to guarantee schema history.

---

## Useful Commands

```bash
npm run test
npm run test:watch
npm run lint
npx prisma studio
```

---

## References

* Clean Architecture — Robert C. Martin
* Domain-Driven Design — Eric Evans
* Patterns of Enterprise Application Architecture — Martin Fowler
