#!/bin/bash

psql -U dev -tc "SELECT 1 FROM pg_database WHERE datname = 'odop_core'" | grep -q 1 || psql -U dev -c "CREATE DATABASE odop_core"
