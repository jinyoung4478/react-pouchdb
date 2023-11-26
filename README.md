# React + PouchDB

## 환경 세팅

### CouchDB with Docker

1. Create `docker-compose.yml`

```yml
version: '3'
services:
  couchserver:
    image: couchdb
    restart: always
    ports:
      - '5984:5984'
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=YOURPASSWORD
    volumes:
      - ./dbdata:/opt/couchdb/data
```

2. Run docker compose
   `docker-compose up -d`

3. Access CouchDB admin
   `http://localhost:5984/_utils/`

4. Create `_users` Database

<img width="742" alt="image" src="https://github.com/jinyoung4478/react-pouchdb/assets/102174146/48ea02c0-603b-4f22-8128-dad13d421d9d">

### Client 세팅

1. Clone project `https://github.com/jinyoung4478/react-pouchdb.git`
2. Install dependencies: yarn

3. Start the development server: yarn dev
