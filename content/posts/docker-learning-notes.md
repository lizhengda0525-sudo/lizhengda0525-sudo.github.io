---
title: "Docker 学习笔记：从入门到日常实战"
date: 2026-07-24T10:00:00+08:00
draft: false
tags: ["Docker", "容器", "DevOps"]
categories: ["开发工具"]
description: "一份面向日常开发的 Docker 学习笔记，覆盖常用命令、容器生命周期、镜像与 Dockerfile、网络存储、Compose 以及基础原理。"
---
[40分钟的Docker实战攻略，一期视频精通Docker_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1THKyzBER6/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click&vd_source=8adfcf78eabf734b81a1d808df35a04d)

[B站应该没有这么细致的docker容器教学视频，从零基础入门到实战，不妨来看看_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1k1jc6EEqe/?spm_id_from=333.788.top_right_bar_window_history.content.click&vd_source=8adfcf78eabf734b81a1d808df35a04d)

[Get started | Docker Docs](https://docs.docker.com/get-started/)

# Docker 学习笔记

## 目录

- [速查表：日常开发常用指令](#速查表日常开发常用指令)
- [第一部分：理解 Docker](#第一部分理解-docker)
- [第二部分：单人本地最小闭环](#第二部分单人本地最小闭环)
- [第三部分：容器生命周期管理](#第三部分容器生命周期管理)
- [第四部分：镜像管理与 Dockerfile](#第四部分镜像管理与-dockerfile)
- [第五部分：网络与存储](#第五部分网络与存储)
- [第六部分：容器编排 (Compose)](#第六部分容器编排-compose)
- [第七部分：急救工具箱与运维](#第七部分急救工具箱与运维)
- [第八部分：原理与进阶](#第八部分原理与进阶)

---

# 速查表：日常开发常用指令

## 0. 安装与配置（只需一次）

```bash
# 腾讯云/Ubuntu 安装
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# 验证安装
docker --version
docker compose version
```

→ 详见 [第二部分：安装](#安装)

## 1. 镜像操作

```bash
docker pull nginx:latest                 # 拉取镜像
docker images                            # 列出本地镜像
docker rmi <image-id>                    # 删除镜像
docker system prune -f                   # 清理所有未使用的镜像、容器和网络
docker build -t [镜像名] [构建上下文路径]  # 构建一个docker镜像， -t 指定一个名称
								      # . 构建上下文路径，告诉 Docker 以当前目录为基础，去里面找 Dockerfile 和相关文件
doecker push DOCKER_USERNAME/getting-started-todo-app # 推送image到hub
```

→ 详见 [第四部分：镜像管理](#镜像管理-images)

## 2. 容器运行（最高频）

```bash
docker run -d --name my-app -p 8080:80 nginx   # 后台运行并映射端口
docker run -e MYSQL_ROOT_PASSWORD=123 mysql    # 传入环境变量
docker run -v /host/path:/container/path nginx # 挂载数据卷
docker ps                                      # 查看运行中的容器
docker ps -a                                   # 查看所有容器（含已停止）
```

→ 详见 [第三部分：容器运行](#run创建并运行容器)

## 3. 运维与调试

```bash
docker logs <container-name>               # 查看日志
docker logs <container-name> -f            # 实时滚动查看日志
docker exec -it <container-name> /bin/sh   # 进入容器内部调试
docker stop/start/restart <container-name> # 启停容器
docker rm <container-name>                 # 删除容器
```

→ 详见 [第七部分：急救工具箱](#第七部分急救工具箱与运维)

## 4. 编排与网络

```bash
docker compose up -d                       # 启动编排服务
docker compose down                        # 停止并删除服务
docker compose watch                       # 监听项目源代码更改，自动更新运行中的容器服务
docker network create my-net               # 创建自定义网络
docker volume list                         # 查看所有数据卷
```

→ 详见 [第六部分：容器编排](#第六部分容器编排-compose) · [第五部分：网络](#bridge桥接模式)

---

# 第一部分：理解 Docker 

## Docker 的设计理念

Docker 引入了**“轻量级虚拟机快递员”**的隐喻。你的目标是把“包裹”（应用代码）和“环境”（系统库、依赖）一起打包成一个标准化的单元（镜像），扔给快递员（Docker Engine），让他送到任何服务器上都能直接跑起来。

基于这种设计，Docker 解决了三个核心痛点：

- **解决“在我电脑上能跑”的问题**：通过操作系统层面的虚拟化，实现环境隔离与一致性。
- **极速启动与轻量级**：相比传统虚拟机，Docker 容器共享宿主机内核，秒级启动，资源占用极低。
- **标准化交付**：一次构建，到处运行（Build Once, Run Anywhere）。

## 核心概念类比

| 概念 | 英文 | 类比含义 |
|------|------|------|
| **镜像** | Image | “程序安装包”或“类”，是只读的模板 |
| **容器** | Container | “正在运行的软件”或“实例”，是镜像跑起来后的动态环境 |
| **Dockerfile** | Dockerfile | “制作图纸”，列出了镜像是如何一步步构建出来的 |
| **仓库** | Registry | “应用商店”，存放镜像的地方（主要是 Docker Hub） |

> **关系总结**：我们用 **Dockerfile** 制作出 **镜像**，把镜像存到 **仓库**，最后通过 `docker run` 把镜像变成 **容器** 跑起来。

## Docker 与虚拟机的区别

用容器化技术，给应用程序封装独立的运行环境。Docker 容器之间共享一个系统内核，而每个虚拟机都包含一个操作系统的完整内核。因此，Docker 容器比虚拟机更加轻量级，启动速度更快。

![Docker vs VM](/images/review/docker-learning-notes/image-20260625200410037.png)
![VM 结构](/images/review/docker-learning-notes/image-20260625200438361.png)

---

# 第二部分：单人本地最小闭环

这一部分的目标：走完 `install → pull → run → inspect` 的完整循环，让你能独立用 Docker 跑起一个服务。

## 安装

### 腾讯云/Ubuntu 安装流程

1. 清理可能冲突的包

```bash
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)
```

2. 更新系统包索引并安装依赖

```bash
sudo apt update
sudo apt install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
```

3. 导入 Docker GPG 密钥（使用腾讯云镜像）

```bash
sudo curl -fsSL https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

4. 添加 Docker APT 源

```bash
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu
Suites: noble
Components: stable
Architectures: amd64
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

5. 安装 Docker 及其核心组件

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
docker --version
```

## 第一次运行：Hello World

```bash
docker run hello-world
```

看到 "Hello from Docker!" 就算通关。这证明你的 Docker Engine 已经正常工作，并能从 Docker Hub 拉取镜像。

---

# 第三部分：容器生命周期管理

## run：创建并运行容器

这是 Docker 最核心的指令。如果本地没有镜像，它会自动先执行 `pull`。

```bash
sudo docker run nginx
```

![Run 示例](/images/review/docker-learning-notes/image-20260627174812850.png)

### 常用参数详解

#### -d：后台运行 (Detached mode)
```bash
sudo docker run -d nginx
```
![Detached Mode](/images/review/docker-learning-notes/image-20260627172922129.png)

#### -p：端口映射 (Port)
每个 Docker 容器都运行在一个独立的网络环境中，默认情况下外部无法访问。我们需要配置 `-p` 将宿主机的端口转发到容器内部。

```bash
sudo docker run -p 80:80 nginx
# 宿主机端口:容器内端口
```

<img src="/images/review/docker-learning-notes/image-20260628093953228.png" alt="Port Mapping" style="zoom:50%;" />
<img src="/images/review/docker-learning-notes/image-20260628094040678.png" alt="Port Forwarding" style="zoom:50%;" />

#### -e：环境变量 (Environment)
在启动时传入配置信息（如数据库密码）。具体参数需查阅 Docker Hub 官方文档。

```bash
sudo docker run -e MYSQL_ROOT_PASSWORD=123456 mysql
```
![Env Vars](/images/review/docker-learning-notes/image-20260628095529357.png)

#### --name：自定义容器名字
容器的名字和容器 ID 是等价的，但名字更好记。

```bash
sudo docker run --name my-nginx -d nginx
```

#### --restart：重启策略
```bash
--restart always         # 容器停止之后总是重启
--restart unless-stopped # 除非手动停止，否则总是重启
```

#### -it & --rm：临时调试
```bash
-it   # 进入宿主机内部进行交互式调试
--rm  # 容器停止运行时，自动把容器删除（适合一次性测试）
```
![Debug Mode](/images/review/docker-learning-notes/image-20260628100029890.png)

## 运维与状态查询

### ps：查看进程状态
```bash
sudo docker ps     # 查看正在运行的容器
sudo docker ps -a  # 查看所有容器（包含已停止的）
```
![PS Output](/images/review/docker-learning-notes/image-20260627172848564.png)

### start/stop/create：启停控制
- `create`：只创建容器但不启动。
- `start/stop/restart`：启动、停止或重启已经创建的容器。

![Start/Stop](/images/review/docker-learning-notes/image-20260628100525689.png)

---

# 第四部分：镜像管理与 Dockerfile

## 镜像管理 (Images)

### pull：拉取镜像
```bash
docker pull registry/namespace/tag:标签（版本号）
# 简化后就是: docker pull nginx
```

> **跨平台支持**：`docker pull --platform=xxx nginx`。一般情况下默认拉取最适合的 CPU 架构。

### images & rmi：列出与删除
```bash
sudo docker images          # 列出所有下载的镜像
sudo docker rmi nginx:latest # 删除指定的镜像
```

## Dockerfile 制作

Dockerfile 是镜像的构建蓝图。

[40分钟的Docker实战攻略，一期视频精通Docker_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1THKyzBER6/?spm_id_from=333.1391.0.0&vd_source=8adfcf78eabf734b81a1d808df35a04d) 26:33

> Container images are composed of layers. And each of these layers, once created, are immutable. 

Dockerfile 通常会按照以下步骤编写：

1. 确定基础镜像。
2. 安装应用程序依赖。
3. 复制相关源代码和二进制文件。
4. 配置最终镜像。

### Dockerfile 常见指令

- `FROM <image>`：指定构建镜像时使用的基础镜像，例如 `FROM node:22-alpine`。
- `WORKDIR <path>`：设置镜像中的工作目录，后续命令会在该目录下执行，例如 `WORKDIR /app`。
- `COPY <host-path> <image-path>`：将宿主机中的文件或目录复制到镜像中，例如 `COPY . /app`。
- `RUN <command>`：在构建镜像时执行指定命令，通常用于安装软件或应用依赖，例如 `RUN yarn install --production`。
- `ENV <name> <value>`：设置容器运行时可以使用的环境变量，例如 `ENV APP_ENV production`。
- `EXPOSE <port-number>`：声明容器应用计划使用的端口，例如 `EXPOSE 8080`。该指令不会自动将端口映射到宿主机。
- `USER <user-or-uid>`：设置后续构建指令以及容器运行时默认使用的用户，例如 `USER app`。
- `CMD ["<command>", "<arg1>"]`：设置容器启动时默认执行的命令，例如 `CMD ["node", "./src/index.js"]`。

### build cache

运行docker build创建新镜像时候，docker会按照dockerfile的指令出现顺序，以此执行每一条指令，并为每一条指令创建一个镜像层

对于每一条指令，Docker 都会检查是否能够复用之前构建时产生的结果。如果 Docker 发现之前已经执行过相同或类似的指令，就不需要再次执行，而是直接使用缓存中的结果。





# 第五部分：网络与存储

## 存储：数据持久化 (-v)

把宿主机目录和容器目录进行绑定。**如果不挂载，容器删除后数据就会消失。**

### 1. 绑定挂载 (Bind Mount)
```bash
-v 宿主机绝对路径:容器内路径
```
![Bind Mount](/images/review/docker-learning-notes/image-20260628094623806.png)

### 2. 命名挂载 (Named Volume)
由 Docker 管理的存储空间，通常位于 `/var/lib/docker/volumes/`。
```bash
-v 卷的名字:容器内路径
```
![Named Volume](/images/review/docker-learning-notes/image-20260628094953040.png)

**卷管理常用指令：**
```bash
sudo docker volume list      # 展示所有挂载卷
sudo docker volume rm xxx    # 删除指定的挂载卷
sudo docker volume prune -a  # 删除所有没有被容器使用的卷
```

## 网络 (Networks)

### bridge 桥接模式
Docker 每个容器采用 bridge 桥接模式连接，每一个容器分配一个内部的 IP 地址（一般是 172.17 开头）。内部子网里面，容器可以通过内部 IP 或容器名互相访问。

![Bridge Network](/images/review/docker-learning-notes/image-20260628230824771.png)

```bash
docker network create network1  # 创建自定义子网
```

### host 模式
Host 模式下，Docker 容器直接共享宿主机网络，无需 `-p` 参数进行端口映射。

![Host Network](/images/review/docker-learning-notes/image-20260628232234424.png)

---

# 第六部分：容器编排 (Compose)

Docker Compose 使用 YAML 文件管理多个容器，定义它们如何协同工作。

> One best practice for containers is that each container should do one thing and do it well.

![Compose Concept](/images/review/docker-learning-notes/image-20260628233154906.png)

### 常用指令

```bash
# 启动对应的 yml，创建、启动、网络配置
sudo docker compose up -d  

# 停止并删除容器
sudo docker compose down 

# 指定不同环境的配置文件
sudo docker compose -f docker-compose.prod.yaml up -d
```

![Compose Workflow](/images/review/docker-learning-notes/image-20260628234210470.png)

---

# 第七部分：急救工具箱与运维

## 日志查看 (Logs)

容器起不来？第一时间看日志！

```bash
sudo docker logs 容器id/名字
sudo docker logs 容器id/名字 -f  # 滚动查看日志，动态更新
```

## 进入容器内部 (Exec)

在容器内部执行 Linux 命令，用于深入调试。

```bash
sudo docker exec 容器id linux命令
sudo docker exec -it 容器id /bin/sh # 进入容器终端
```
![Exec Example](/images/review/docker-learning-notes/image-20260628224726725.png)

## 清理空间

Docker 很吃硬盘，定期清理无用镜像和容器。

```bash
docker system prune -f
```

---

# 第八部分：原理与进阶

## Docker 原理

利用 Linux 内核的两大原生功能，实现容器化：

1. **Cgroups**：用来限制和隔离进程的资源使用，为每个容器设定 CPU、内存、网络带宽等资源的使用上限。
2. **Namespaces**：用来隔离进程的资源视图，使得容器只能看到自己内部的进程 ID、网络资源和文件目录。

容器本质上还是一个特殊的进程。

<img src="/images/review/docker-learning-notes/image-20260628212104993.png" alt="Docker Architecture" style="zoom: 50%;" />
![image-20260714092738747](/images/review/docker-learning-notes/image-20260714092738747.png)

![image-20260714092823094](/images/review/docker-learning-notes/image-20260714092823094.png)
















