#!/bin/bash

#author Tornike Bakuradze <tokobakuradze@gmail.com>

#builds front-end application in production mode

SOURCE_DIR=$(git rev-parse --show-toplevel)

(cd "$SOURCE_DIR" && rm -rf node_modules)
(cd "$SOURCE_DIR" && npm ci)
(cd "$SOURCE_DIR" && npm run build && npm run admin)
