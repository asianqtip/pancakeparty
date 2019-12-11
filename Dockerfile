FROM node:10.16.3-alpine
# Create Directory for the Container
RUN mkdir /code
WORKDIR /code

COPY package.json .
RUN npm config set unsafe-perm true
RUN npm install

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
