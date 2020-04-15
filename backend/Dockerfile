FROM node:12.16.1

WORKDIR /app

RUN npm install -g --unsafe-perm serverless

COPY ./package.json ./

RUN npm install 

COPY ./ ./

# CMD ["npm","run", "offline"]
RUN sls config credentials --provider aws --key "$AWS_ACCESS_KEY_ID "--secret "$AWS_SECRET_ACCESS_KEY"

RUN sls deploy -v