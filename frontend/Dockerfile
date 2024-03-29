


ARG NODE_VERSION=18.16.1

FROM node:${NODE_VERSION}

ENV NODE_ENV="development"

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

ENV NPM_CONFIG_CACHE=/usr/src/app/.npm-cache
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/src/app/.npm-cache 

RUN npm ci 
RUN chown -R node:node /usr/src/app
USER node

COPY . .

EXPOSE 3000

CMD npm start
