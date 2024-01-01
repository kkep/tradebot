FROM node:18

# создание директории приложения
WORKDIR /usr/src/app

# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

COPY --chown=node:node . .

# копируем исходный код
COPY server/ ./

RUN npm install --loglevel verbose

# Сервер привязан к 8080 порту, поэтому мы будем использовать инструкцию EXPOSE,
# чтобы проинформировать Docker о том,
# что в контейнере имеется приложение, прослушивающее этот порт.
EXPOSE 80:3000

CMD [ "node", "./src/main.js" ]
