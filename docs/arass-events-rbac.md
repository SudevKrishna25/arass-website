# ARASS EVENTS — Role-Based Access Control (RBAC) Matrix

## Roles Hierarchy

```
SUPER_ADMIN
    └── ORGANIZER
            └── MANAGER
                    └── EVALUATOR
                            └── VIEWER
                                    └── PARTICIPANT
```

## Explicit Permissions

| Permission | SUPER_ADMIN | ORGANIZER | MANAGER | EVALUATOR | VIEWER | PARTICIPANT |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `ORG_MANAGE` | ✓ | - | - | - | - | - |
| `EVENT_CREATE` | ✓ | ✓ | - | - | - | - |
| `EVENT_READ` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `EVENT_UPDATE` | ✓ | ✓ | ✓ (assigned) | - | - | - |
| `EVENT_DELETE` | ✓ | ✓ | - | - | - | - |
| `EVENT_PUBLISH` | ✓ | ✓ | - | - | - | - |
| `PARTICIPANT_READ`| ✓ | ✓ | ✓ | - | ✓ | - |
| `PARTICIPANT_EXPORT`| ✓ | ✓ | ✓ | - | - | - |
| `ROUND_CREATE` | ✓ | ✓ | ✓ | - | - | - |
| `ROUND_UPDATE` | ✓ | ✓ | ✓ | - | - | - |
| `SUBMISSION_READ` | ✓ | ✓ | ✓ | ✓ (assigned) | ✓ | Own |
| `SUBMISSION_CREATE`| - | - | - | - | - | Own |
| `SUBMISSION_EVALUATE`| ✓ | ✓ | - | ✓ (assigned) | - | - |
| `CERTIFICATE_CREATE`| ✓ | ✓ | ✓ | - | - | - |
| `CERTIFICATE_REVOKE`| ✓ | ✓ | - | - | - | - |
| `ANALYTICS_READ` | ✓ | ✓ | ✓ | - | ✓ | - |
| `AUDIT_READ` | ✓ | ✓ | - | - | - | - |

## Enforcement
- Server-side validation via `requirePermission(user, permission)` and `requireRole(user, roles)`.
- Never trust client-side role assertions.
