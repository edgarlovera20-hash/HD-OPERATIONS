# HD-OPERATIONS Domain

## Diagnóstico

HD-OPERATIONS gestiona la operación diaria de Heavenly Dreams: agenda, tareas, productividad, supervisión, reportes operativos y notificaciones internas.

## Riesgos

- Mezclar CRM de morosos dentro de operaciones.
- Mezclar finanzas globales o administración central.
- Crear permisos locales fuera de HD-CORE.
- Duplicar dashboards ejecutivos que pertenecen a HD-BRAIN.

## Solución Propuesta

Mantener HD-OPERATIONS como plataforma de ejecución diaria y supervisión operativa.

## Módulos

- Tareas operativas
- Agenda operativa
- Productividad
- Supervisor Workbench
- Reportes operativos
- Notificaciones internas

## Reglas

1. No gestiona clientes morosos.
2. No administra usuarios globales.
3. No administra finanzas globales.
4. No reemplaza HD-BRAIN.
5. Consume Auth, RBAC, UI, tipos y validaciones desde HD-CORE.

## Prioridad

Alta.
