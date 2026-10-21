# ER Diagram – AI Medical Symptom Checker

## Entity Relationship Diagram (Text Representation)

```
┌─────────────────────────────────┐
│             USERS               │
├─────────────────────────────────┤
│ PK  id           INTEGER        │
│     name         VARCHAR(100)   │
│     email        VARCHAR(150)   │◄─────────────────────────────────┐
│     password_hash VARCHAR(256)  │                                  │
│     role         VARCHAR(20)    │                                  │
│     created_at   DATETIME       │                                  │
└─────────────────────────────────┘                                  │
        │ 1                                                           │
        │                                                             │
        │ has many                                                    │
        │ N                                                           │
┌─────────────────────────────────┐       ┌──────────────────────────┴──┐
│          PREDICTIONS            │       │         ADMIN_LOGS           │
├─────────────────────────────────┤       ├─────────────────────────────┤
│ PK  id               INTEGER   │       │ PK  id           INTEGER     │
│ FK  user_id          INTEGER   │       │ FK  admin_id     INTEGER     │
│     selected_symptoms TEXT      │       │     action       TEXT        │
│     predicted_disease VARCHAR  │       │     created_at   DATETIME    │
│     confidence_score  FLOAT    │       └─────────────────────────────┘
│     all_probabilities TEXT      │
│     created_at        DATETIME  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│           SYMPTOMS              │
├─────────────────────────────────┤
│ PK  id           INTEGER        │
│     symptom_name VARCHAR(100)   │
│     description  TEXT           │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│           DISEASES              │
├─────────────────────────────────┤
│ PK  id             INTEGER      │
│     disease_name   VARCHAR(150) │
│     description    TEXT         │
│     precautions    TEXT         │
│     severity_level VARCHAR(20)  │
│     emergency      BOOLEAN      │
└─────────────────────────────────┘
```

## Relationships

| Relationship        | Type    | Description                                      |
|---------------------|---------|--------------------------------------------------|
| Users → Predictions | 1 : N   | One user can have many predictions               |
| Users → AdminLogs   | 1 : N   | One admin can create many log entries            |
| Symptoms → (ML)     | Lookup  | Symptoms table feeds the ML input vector         |
| Diseases → (ML)     | Lookup  | Disease table enriches ML output with metadata   |

## Key Design Decisions

1. **selected_symptoms stored as JSON string** – Flexible, avoids a many-to-many join table
2. **all_probabilities stored as JSON string** – Preserves full top-5 prediction vector
3. **precautions stored as semicolon-separated string** – Simple, readable, easily split
4. **Symptoms and Diseases are independent tables** – Admin can manage them via CRUD without affecting the ML model
5. **role field in Users** – Simple role-based access control (RBAC) without a separate roles table
