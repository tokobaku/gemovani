#!/bin/bash

#author Tornike Bakuradze <tokobakuradze@gmail.com>

#sets laravel up for production.
#this script is supposed to run after every deployment and update application to current version

SOURCE_DIR=$(git rev-parse --show-toplevel)

(cd "$SOURCE_DIR" && composer install)
(cd "$SOURCE_DIR" && php artisan migrate)
