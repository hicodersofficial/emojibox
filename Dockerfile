FROM node

RUN apt update && apt install -y \
    vim \
    curl \
    wget \
    telnet \
    iproute2 \
    netcat-openbsd \ 
    iputils-ping \
    dnsutils  \
    net-tools \
    htop \
    lsof \
    && apt-get clean
  
WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]