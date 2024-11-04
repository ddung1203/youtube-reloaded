# YouTube Reloaded

`docker network`
```bash
docker network create youtube
```

`mongo`

```bash
docker run -d --name mongo --network youtube \ 
        -e MONGO_INITDB_ROOT_USERNAME=mongo  \
        -e MONGO_INITDB_ROOT_PASSWORD=mongo  \
        -p 27017:27017                       \
        -v /home/ubuntu/mongo:/data/db       \
        mongo
```

`youtube`
```bash
docker run -d --name youtube --network youtube   \
    -e MONGO_USERNAME=mongo                      \
    -e MONGO_PASSWORD=mongo                      \
    -e MONGO_URL=mongo                           \
    -e COOKIE_SECRET=youtube                     \
    -p 80:4000                                   \
    ddung1203/youtube:3
```