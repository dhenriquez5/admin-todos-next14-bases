# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombar el .env.example a .env y rempplazar variables de entorno

3. ejecutar commando `npm install`

4. ejecutar commando `npm run dev`

5. ejecutar commando

```
npx prisma migrate dev
npx prisma generate
```

5. Ejecutar Seed para (crear la base de datos local localhost:3000/api/seed )
## NOTA: Usuarios por defecto
__usuario:__ test1@example.com
__password:__ 123

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
