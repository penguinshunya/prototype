#### Cloud SQL (PostgreSQL) に接続するときのコネクションストリング  

```sh
# 参考: https://www.postgresql.org/docs/current/libpq-connect.html
postgres://postgres:postgres@/apidb?host=/cloudsql/upbeat-glow-336702:asia-northeast1:postgres-instance
```

#### ローカルの PostgreSQL に接続するときのコネクションストリング

```sh
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/apidb
```
