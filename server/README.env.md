# Environment variables

## Required
- `DB_HOST`: MySQL host
- `DB_USER`: MySQL user
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name

## Optional
- `DB_PORT`: MySQL port (default: 3306)
- `DB_SSL`: Set to `true` if using cloud MySQL (PlanetScale, Aiven, etc.)
- `PORT`: Express server port (default: 3000 or Render auto-assigns)

## Example for local (XAMPP)
Create a `.env` file in the project root (`d:/PROJECT/SITE/.env`) with:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=test
DB_PORT=3306
PORT=3000
```

## Example for cloud (Aiven / Render)
```env
DB_HOST=mysql-xxxxxxxxx.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=xxxxxxxx
DB_NAME=defaultdb
DB_PORT=3306
DB_SSL=true
PORT=10000
```

