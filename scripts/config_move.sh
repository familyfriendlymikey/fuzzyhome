printf "\033c" && rg --pcre2 -g '!config.imba' 'config\.(?!data.)'"$1"
