---
title: "FastAPI 基础入门：虚拟环境与异步编程"
date: 2026-05-13T10:00:00+08:00
draft: false
tags: ["FastAPI", "Python", "异步编程"]
categories: ["后端开发"]
description: "从零开始学习 FastAPI，掌握 Python 虚拟环境管理、异步编程（async/await）概念，以及基本的 API 开发。"
---

[FastAPI](https://fastapi.tiangolo.com/zh/) 是一个现代、快速（高性能）的 Python Web 框架，基于标准 Python 类型提示构建。本文记录了从环境搭建到第一个 API 运行的完整学习过程。

## 虚拟环境

参考：[虚拟环境 - FastAPI 官方文档](https://fastapi.tiangolo.com/zh/virtual-environments/)

Python 虚拟环境可以为每个工程隔离依赖包，避免不同项目之间的包版本冲突。这是每个 Python 项目的第一步。

### 创建工程目录

```bash
# 进入主目录
cd
# 创建一个用于存放所有代码工程的目录
mkdir code
# 进入 code 目录
cd code
# 创建一个用于存放这个工程的目录
mkdir awesome-project
# 进入这个工程的目录
cd awesome-project
```

### 创建虚拟环境

开始一个 Python 工程的时候，第一时间创建一个内部的虚拟环境。使用 Python 自带的 `venv` 模块，`.venv` 表示在当前目录创建一个名为 `.venv` 的虚拟环境目录：

```bash
python -m venv .venv
```

### 激活虚拟环境

```bash
.venv\Scripts\Activate.ps1
```

> **注意**：以上是 Windows PowerShell 的激活方式。macOS/Linux 用户应使用 `source .venv/bin/activate`。

激活新的虚拟环境后，运行的任何 Python 命令或安装的包都只会作用于当前项目。每次打开新的终端会话都需要重新激活。安装新包后也需要重新激活，以确保使用的是虚拟环境中的程序版本。

### 检查虚拟环境是否已激活

```bash
Get-Command python
```

### 升级 pip

保持 pip 为最新版本可以避免很多安装问题：

```bash
python -m pip install --upgrade pip
```

如果遇到 `No module named pip` 错误，可以先运行：

```bash
python -m ensurepip --upgrade
```

### 添加 .gitignore

在 `.venv` 目录中添加 `.gitignore` 文件，将虚拟环境排除在版本控制之外：

```bash
echo "*" > .venv/.gitignore
```

- `echo "*"`：将文本 `*` 打印到标准输出
- `>`：重定向操作符，将输出写入文件而非显示在终端
- `.gitignore`：目标文件名

`*` 在 Git 中表示"所有内容"，所以该文件会让 Git 忽略 `.venv` 目录中的全部文件。

### 安装软件包

**直接安装：**

```bash
pip install "fastapi[standard]"
```

**从 `requirements.txt` 安装：**

```bash
pip install -r requirements.txt
```

### 退出虚拟环境

```bash
deactivate
```

环境搭建完成后，接下来了解 FastAPI 的核心特性之一——异步编程。

## 并发与 async/await

FastAPI 支持两种方式定义路由处理函数：`async def` 和普通 `def`。**如果函数体内需要使用 `await`（如调用异步数据库驱动、发送异步 HTTP 请求），就用 `async def`；否则用普通 `def` 即可。** FastAPI 会自动将同步函数放入线程池执行，不会阻塞事件循环。

### 协程（Coroutine）

**协程是一种比线程更轻量级的并发单元**，也叫做"用户态线程"或"微线程"。它是 Python 中实现并发的一种具体技术：

| 并发单元 | 定位 | 内存开销 | 切换开销 |
|---------|------|---------|---------|
| **进程** | 资源分配的最小单位 | 独立内存空间 | 最大 |
| **线程** | CPU 调度的最小单位 | 共享进程内存 | 适中（需要内核参与） |
| **协程** | 用户态调度单元 | 同一线程内共享 | 极小（只保存/恢复少量寄存器） |

一个线程内可以创建成千上万个协程，切换开销几乎可以忽略不计。

### 异步代码

异步编程的核心思想是：**程序不等待慢速任务完成，而是在等待期间去做其他工作**。当慢速任务完成后，程序会回来继续处理结果。

常见的慢速操作主要是 I/O 操作：

- 通过网络发送/接收数据
- 通过磁盘写入/读取数据
- API 远程调用
- 数据库操作（查询、删除等）

由于执行时间主要花在等待 I/O 上，这些操作被称为 **I/O 密集型** 操作。

### 并发与并行

这两个概念经常被混淆，但含义不同：

- **并发（Concurrency）**：系统在同一时间段内交替处理多个任务（如单核 CPU 通过时间片轮转），任务不必真正同时运行，但整体看起来像在"一起进行"。解决的是"如何组织多个任务"的问题。
- **并行（Parallelism）**：多个任务在同一时刻真正同时执行，需要多核或多 CPU 的硬件支持。解决的是"如何利用多核加速计算"的问题。

> **并发是并行的基础**。没有多核时，并发通过分时复用实现；有了多核，并发程序才可能真正并行运行。**并发是关于"如何对付多个任务"，并行则是关于"如何利用多个硬件"。**

### async 和 await

Python 通过 `async` 和 `await` 关键字实现异步代码。使用这两个关键字写出来的代码看起来是正常的顺序执行，实际在底层实现了并发调度。

## 实例

下面的示例包含两个路由：

- `GET /`：根路径，返回一个简单的 JSON 对象
- `GET /items/{item_id}`：带**路径参数** `{item_id}` 的路由，URL 中的值会传入函数的 `item_id` 参数；同时支持可选的**查询参数** `q`（如 `/items/5?q=search`）

### 同步版本

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

### 异步版本

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

两个版本的唯一区别在于：异步版本使用了 `async def`，这使得 FastAPI 能够在处理请求时更好地利用异步特性。

### 运行

```bash
fastapi dev main.py
```

启动后终端会显示服务地址和自动重载（auto-reload）提示——当你修改代码并保存后，FastAPI 会自动重新加载，无需手动重启。

- 访问 [http://127.0.0.1:8000](http://127.0.0.1:8000) 查看 API 响应
- 访问 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) 查看自动生成的交互式 API 文档（Swagger UI）
- 按 `Ctrl + C` 停止服务

## 参考资料

- [FastAPI 中文文档](https://fastapi.tiangolo.com/zh/)
- [虚拟环境 - FastAPI](https://fastapi.tiangolo.com/zh/virtual-environments/)

---

> 本文由 **达主编** 整理润色，**达审稿** 审阅，**达发布** 发布。
