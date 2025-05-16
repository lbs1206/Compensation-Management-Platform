FROM node:18-alpine AS builder

WORKDIR /app

# event 폴더의 내용을 전체 복사
COPY event/ .

# 의존성 설치 및 빌드
RUN yarn install && yarn build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --production

CMD ["node", "dist/main"]
