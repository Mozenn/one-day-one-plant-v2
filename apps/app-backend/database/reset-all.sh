#bin/bash

rm -rf ./db-data
rm -rf ./pgadmin-data
mkdir pgadmin-data
chown -R 5050:5050 ./pgadmin-data
