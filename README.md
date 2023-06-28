brew update
brew doctor
brew install postgresql@14
postgres -V

This formula has created a default database cluster with:
initdb --locale=C -E UTF-8 /usr/local/var/postgresql@14

brew services start postgresql@14

brew services list

brew services stop postgresql@14

psql postgres
\du
CREATE ROLE douglas WITH LOGIN PASSWORD '123';
\password douglas
ALTER ROLE douglas CREATEDB;
CREATE DATABASE recipes;
\q
psql postgres -U douglas
\list
\connect

psql postgress://douglasdiasleal@localhost:5432/recipes

npx prisma migrate dev --name init
npx prisma studio   