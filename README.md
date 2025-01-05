# Emojibox 📦

Emojibox is a lightweight toolbox designed for debugging containers. It includes a unique Emoji REST API along with commonly used Linux tools to help developers and sysadmins quickly diagnose and manage containers.

Alternative to busybox with webserver.

```
docker pull ghcr.io/hicodersofficial/emojibox
```

```
docker run -d -p 9000:9000 --name emojibox emojibox
```

```
docker exec -it emojibox /bin/bash
```

## Available Tools

Emojibox comes with the following utilities:

### Emoji REST API:

Server runs on port 9000 by default or specified env PORT.

`/`: Just Hello page.

`/emoji`: Get Random Emoji

`/emoji/:index`: Get emoji by index. 0 - 1528

`/random`: Get random number, and emoji

### Core Utilities

```
vim
curl
wget
telnet
iproute2
netcat-openbsd
iputils-ping
dnsutils
net-tools
htop
lsof
```

> NOTE: It's just a tool for me to quickly debug or test other containers in same docker network. It may not contain tools for everyone. It's mostly for nodejs and networking stuff.
