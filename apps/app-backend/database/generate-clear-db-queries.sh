#bin/bash

docker exec -it postgres psql -U dev -d micoris_core -tc "SELECT 'drop table if exists ' || tablename || ' cascade;'  FROM pg_tables WHERE schemaname = 'public'"