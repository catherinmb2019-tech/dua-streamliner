# DUA Generation — Backend Skeleton

NestJS modular monolith backend for automated DUA (Document Use Agreement) generation.
Built on Node.js · NestJS · TypeORM · PostgreSQL (RDS) · AWS (Cognito, S3, ECS Fargate).

---

## Project Structure

```
src/
├── main.ts                          # Bootstrap: pipes, filters, Swagger, HTTP server
├── app.module.ts                    # Root module — wires all feature modules
│
├── config/
│   ├── app.config.ts                # App-level env vars (port, limits, thresholds)
│   ├── database.config.ts           # PostgreSQL / RDS connection config
│   └── aws.config.ts                # AWS region, S3, Cognito parameters
│
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts   # @CurrentUser() — extracts JWT user from request
│   │   ├── public.decorator.ts         # @Public()      — bypasses JwtAuthGuard
│   │   └── roles.decorator.ts          # @Roles()       — RBAC role metadata
│   ├── filters/
│   │   └── http-exception.filter.ts    # Global error envelope + CloudWatch logging
│   ├── guards/
│   │   ├── jwt-auth.guard.ts           # Validates Cognito JWT on every request
│   │   └── roles.guard.ts              # Enforces @Roles() RBAC rules
│   └── interceptors/
│       └── logging.interceptor.ts      # Structured JSON latency logging
│
├── shared/
│   └── database/
│       ├── database.module.ts          # Shared TypeORM root module
│       └── database-config.factory.ts  # TypeORM options factory (pool, SSL, entities)
│
└── modules/
    ├── auth/                        # Authentication — AWS Cognito + JWT
    │   ├── auth.module.ts
    │   ├── domain/interfaces/
    │   │   └── authenticated-user.interface.ts
    │   ├── infrastructure/
    │   │   ├── cognito/cognito-auth.service.ts    # Cognito SDK wrapper
    │   │   └── strategies/jwt.strategy.ts         # Passport JWT + JWKS validation
    │   └── presentation/
    │       ├── controllers/auth.controller.ts
    │       └── dtos/  login · refresh-token · token-response
    │
    ├── users/                       # User management
    │   ├── users.module.ts
    │   ├── domain/
    │   │   ├── entities/user.entity.ts
    │   │   ├── entities/user-role.enum.ts         # ADMIN | OPERATOR | VIEWER
    │   │   └── interfaces/user-repository.interface.ts
    │   ├── application/users.service.ts
    │   ├── infrastructure/persistence/
    │   │   └── repositories/user-typeorm.repository.ts
    │   └── presentation/controllers/users.controller.ts
    │
    ├── files/                       # File ingestion & S3 storage
    │   ├── files.module.ts
    │   ├── domain/
    │   │   ├── entities/file-record.entity.ts     # DocumentType · FileProcessingStatus
    │   │   └── interfaces/  file-repository · storage-service
    │   ├── application/files.service.ts
    │   ├── infrastructure/
    │   │   ├── detection/file-type-detector.ts    # MIME + extension classification
    │   │   ├── persistence/repositories/file-typeorm.repository.ts
    │   │   └── storage/s3-storage.service.ts      # S3 upload · presign · download · delete
    │   └── presentation/controllers/files.controller.ts
    │
    └── dua/                         # DUA generation — core bounded context
        ├── dua.module.ts
        ├── domain/
        │   ├── entities/dua-process.entity.ts     # DuaProcessStatus · ConfidenceLevel
        │   ├── value-objects/
        │   │   └── extracted-field.value-object.ts
        │   └── interfaces/
        │       ├── dua-process-repository.interface.ts
        │       ├── document-extractor.interface.ts    # Strategy port
        │       ├── semantic-extractor.interface.ts    # AI/NLP port
        │       └── dua-document-generator.interface.ts
        ├── application/
        │   ├── dua-process.service.ts              # Main orchestrator
        │   ├── pipelines/
        │   │   ├── file-processing.pipeline.ts     # Stages 1-3: detect→extract→analyse
        │   │   └── dua-generation.pipeline.ts      # Stages 4-6: map→validate→generate
        │   └── agents/
        │       ├── file-processing.agent.ts        # Agent 1 — route & extract per file
        │       ├── ocr.agent.ts                    # Agent 2 — IMAGE → text via OCR
        │       ├── extraction.agent.ts             # Agent 3 — NLP semantic extraction
        │       ├── mapping.agent.ts                # Agent 4 — map to DUA template schema
        │       ├── validation.agent.ts             # Agent 5 — consistency checks
        │       └── document-generation.agent.ts    # Agent 6 — render final .docx
        ├── infrastructure/
        │   ├── ai/ai-semantic-extractor.ts         # LLM/NLP implementation
        │   ├── extraction/
        │   │   ├── extraction-strategy.factory.ts  # Strategy factory (PDF/WORD/EXCEL)
        │   │   └── strategies/
        │   │       ├── pdf-extractor.strategy.ts
        │   │       ├── word-extractor.strategy.ts
        │   │       └── excel-extractor.strategy.ts
        │   ├── ocr/
        │   │   ├── ocr-engine.interface.ts
        │   │   └── tesseract-ocr-engine.ts
        │   ├── persistence/repositories/
        │   │   └── dua-process-typeorm.repository.ts
        │   └── template/
        │       ├── dua-template.schema.ts          # Canonical field keys + aliases
        │       └── docx-dua-generator.ts           # docx-js Word document renderer
        └── presentation/
            ├── controllers/dua-process.controller.ts
            └── dtos/  start-dua-process · dua-process-response
```

---

## Key Classes

| Class | Path | Responsibility |
|---|---|---|
| `AppModule` | `src/app.module.ts` | Root module — wires everything |
| `JwtStrategy` | `modules/auth/.../jwt.strategy.ts` | Cognito JWKS token validation |
| `CognitoAuthService` | `modules/auth/.../cognito-auth.service.ts` | Cognito SDK wrapper |
| `DuaProcessService` | `modules/dua/application/dua-process.service.ts` | DUA lifecycle orchestrator |
| `FileProcessingPipeline` | `modules/dua/application/pipelines/...` | Multi-stage extraction pipeline |
| `DuaGenerationPipeline` | `modules/dua/application/pipelines/...` | Mapping → validation → generation |
| `FileProcessingAgent` | `modules/dua/application/agents/...` | Routes files to extraction strategies |
| `OcrAgent` | `modules/dua/application/agents/...` | IMAGE → text via OCR engine |
| `ExtractionAgent` | `modules/dua/application/agents/...` | NLP semantic field extraction |
| `MappingAgent` | `modules/dua/application/agents/...` | Maps fields to DUA template schema |
| `ValidationAgent` | `modules/dua/application/agents/...` | Consistency / completeness checks |
| `DocumentGenerationAgent` | `modules/dua/application/agents/...` | Renders final .docx |
| `ExtractionStrategyFactory` | `modules/dua/infrastructure/extraction/...` | Strategy pattern for PDF/WORD/EXCEL |
| `AiSemanticExtractor` | `modules/dua/infrastructure/ai/...` | LLM/NLP extraction implementation |
| `DocxDuaGenerator` | `modules/dua/infrastructure/template/...` | docx-js Word renderer |
| `S3StorageService` | `modules/files/infrastructure/storage/...` | S3 upload / presign / download |
| `FilesService` | `modules/files/application/files.service.ts` | File ingestion orchestrator |
| `DuaTemplateSchema` | `modules/dua/infrastructure/template/...` | Canonical DUA field keys & aliases |

---

## Architecture Layers

```
HTTP Request
     │
     ▼
┌─────────────────────┐
│   Presentation      │  Controllers · DTOs · Guards · Filters
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Application       │  Services · Pipelines · Agents (orchestration only)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Domain            │  Entities · Value Objects · Repository & Port interfaces
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Infrastructure    │  TypeORM repositories · S3 · Cognito · OCR · AI/NLP · docx-js
└─────────────────────┘
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your AWS / RDS credentials

# 3. Run in development mode
npm run start:dev

# 4. OpenAPI docs
# http://localhost:3000/api/docs
```

---

## Key Workflows (as implemented in code)

| Workflow | Entry point | Pipeline |
|---|---|---|
| Upload files | `POST /dua-processes/:id/files` | `FilesService.ingestFiles()` |
| Trigger processing | `POST /dua-processes/:id/trigger` | `FileProcessingPipeline.run()` |
| Generate DUA | Internal (after processing) | `DuaGenerationPipeline.run()` |
| Retrieve result | `GET /dua-processes/:id/result` | `DuaProcessService.getResultDownloadUrl()` |

---

## Notes

- **No business logic is implemented.** All method bodies throw `new Error('Not implemented')`.
  This skeleton defines the full structure, contracts, and wiring — ready for implementation.
- **All infrastructure adapters are bound via DI tokens** (`Symbol`), making them swappable without touching application or domain code.
- **RBAC** is enforced via `@Roles()` + `RolesGuard` globally. Routes are locked to `ADMIN`, `OPERATOR`, or `VIEWER` as appropriate.
- **Retry and timeout policies** belong in the pipeline services and agent implementations.
