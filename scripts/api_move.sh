printf "\033c" && rg --pcre2 -g '!api.imba' '(?<!api.)'"$1"
