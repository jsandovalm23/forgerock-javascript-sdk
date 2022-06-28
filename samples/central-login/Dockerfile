FROM okteto.dev/base as base

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

ENV PORT=8002
ENV NODE_ENV production

COPY --from=base /app/builder/dist/samples/central-login .

EXPOSE 8002

