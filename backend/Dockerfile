FROM node:12.16.1

ARG AWS_MONGO_USERNAME
ARG AWS_MONGO_HOSTNAME
ARG AWS_MONGO_PORT
ARG AWS_MONGO_DB
ARG AWS_MAIL_HOST
ARG AWS_MAIL_POST
ARG AWS_SECURE_MAIL
ARG AWS_MAIL_USERNAME
ARG AWS_MAIL_PASSWORD
ARG AWS_MONGO_PASSWORD
ARG AWS_JWT_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG SERVICE_PROVIDER_NAME
ARG NODE_RUNTIME


WORKDIR /app

RUN npm install -g --unsafe-perm serverless

COPY ./package.json ./

RUN npm install 

COPY ./ ./

RUN sls config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY --SERVICE_PROVIDER_NAME $SERVICE_PROVIDER_NAME --NODE_RUNTIME $NODE_RUNTIME --AWS_MONGO_USERNAME $AWS_MONGO_USERNAME --AWS_MONGO_PASSWORD $AWS_MONGO_PASSWORD --AWS_MONGO_HOSTNAME $AWS_MONGO_HOSTNAME --AWS_MONGO_PORT $AWS_MONGO_PORT --AWS_MONGO_DB $AWS_MONGO_DB --AWS_JWT_KEY $AWS_JWT_KEY --AWS_MAIL_HOST $AWS_MAIL_HOST --AWS_MAIL_USERNAME $AWS_MAIL_USERNAME --AWS_MAIL_PASSWORD $AWS_MAIL_PASSWORD

RUN sls deploy -v --SERVICE_PROVIDER_NAME $SERVICE_PROVIDER_NAME --NODE_RUNTIME $NODE_RUNTIME --AWS_MONGO_USERNAME $AWS_MONGO_USERNAME --AWS_MONGO_PASSWORD $AWS_MONGO_PASSWORD --AWS_MONGO_HOSTNAME $AWS_MONGO_HOSTNAME --AWS_MONGO_PORT $AWS_MONGO_PORT --AWS_MONGO_DB $AWS_MONGO_DB --AWS_JWT_KEY $AWS_JWT_KEY --AWS_MAIL_HOST $AWS_MAIL_HOST --AWS_MAIL_USERNAME $AWS_MAIL_USERNAME --AWS_MAIL_PASSWORD $AWS_MAIL_PASSWORD