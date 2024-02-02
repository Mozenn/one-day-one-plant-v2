#bin/bash

while getopts b buildFlag
do
    case "${buildFlag}" in
        b) docker build --tag "odop-core" .;;
    esac
done

docker run -d -p 127.0.0.1:8080:80 --env-file .env --network backend odop-core 
# --name odop-core --rm