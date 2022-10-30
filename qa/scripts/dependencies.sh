#!/bin/bash


installing_homebrew(){
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
}
installing_curl(){
    brew install curl
}
installing_nvm() {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
}

###
# Main Body Scripts
###
installing_homebrew
installing_curl
installing_nvm