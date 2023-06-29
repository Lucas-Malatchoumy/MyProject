FROM node:alpine

RUN apk update && apk upgrade --no-cache && apk add --no-cache curl

WORKDIR /app

COPY --chown=node:node / /app

RUN npm i

EXPOSE 3001

USER node

ENTRYPOINT ["node"]

CMD ["index.js"]

HEALTHCHECK --interval=1m --timeout=20s --retries=3 CMD curl --fail http://localhost:3001 || exit 1