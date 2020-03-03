#!/bin/bash

#author Tornike Bakuradze <tokobakuradze@gmail.com>

#builds front-end application in production mode

SOURCE_DIR=$(git rev-parse --show-toplevel)

(cd "$SOURCE_DIR" && npm run build)
