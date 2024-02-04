#!/bin/bash

psql -U odop -tc "SELECT 1 FROM pg_database WHERE datname = 'odop_core'" | grep -q 1 || psql -U odop -c "CREATE DATABASE odop_core"
