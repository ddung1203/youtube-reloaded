# YouTube Reloaded

`mongo`

```bash
docker run -d --name mongo \
        -e MONGO_INITDB_ROOT_USERNAME=mongo \
        -e MONGO_INITDB_ROOT_PASSWORD=mongo \
        -p 27017:27017 \
        -v /home/ubuntu/mongo:/data/db      \
        mongo
```

`youtube`

``` bash
docker run -d --name youtube \
        --link mongo \
        -p 80:4000 \
        ddung1203/youtube:latest
```
