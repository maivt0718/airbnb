# Command to create token

openssl genrsa -out src/keys/access_token.private.key 2048
openssl rsa -in src/keys/access_token.private.key -outform PEM -pubout -out src/keys/access_token.public.key
openssl genrsa -out src/keys/refresh_token.private.key 2048\n
openssl rsa -in src/keys/refresh_token.private.key -outform PEM -pubout -out src/keys/refresh_token.public.key\n