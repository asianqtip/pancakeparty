FROM node:10.16.3-alpine
# Create Directory for the Container
RUN mkdir /code
WORKDIR /code

COPY package.json .
RUN npm install
# Add the patch fix
COPY common/stack-fix.c /lib/

# Prepare the libraries packages
RUN set -ex \
    && apk add --no-cache  --virtual .build-deps build-base \
    && gcc  -shared -fPIC /lib/stack-fix.c -o /lib/stack-fix.so \
    && apk del .build-deps

# export the environment variable of LD_PRELOAD
ENV LD_PRELOAD /lib/stack-fix.so
COPY . /src
COPY . /public
COPY . /views
RUN npm install -g tsc \
    && npm install -g concurrently \
    && npm install -g typescript 
COPY . /src
COPY . /public
COPY . /views


#copy config files
ADD . /code


# TypeScript
RUN tsc
# Start
CMD [ "node", "bin/www" ]

EXPOSE 3000
EXPOSE 27017
