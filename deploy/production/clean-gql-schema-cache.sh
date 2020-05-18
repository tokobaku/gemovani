#!/bin/bash

#author Tornike Bakuradze <tokobakuradze@gmail.com>

#cleans graphql schema cache

SOURCE_DIR=$(git rev-parse --show-toplevel)

(cd "$SOURCE_DIR" && php artisan lighthouse:clear-cache)
