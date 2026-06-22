# 🚀 URL Shortener on Kubernetes

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Kubernetes-Minikube-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  A clean, scalable URL shortener backend built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>, then deployed on a <strong>Kubernetes (Minikube)</strong> cluster.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-kubernetes-deployment-minikube">Deployment</a> •
  <a href="#-common-issues-fixed">Troubleshooting</a>
</p>

---

## ✨ Features

- 🔗 Shorten long URLs into unique short links
- ↪️ Redirect short URLs to their original destination
- 🍃 MongoDB database integration
- 📦 Containerized with Docker
- ☸️ Deployed on Kubernetes (Minikube)
- ⚙️ Configurable via ConfigMap
- 📈 Scalable deployment using ReplicaSets

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js (Express) | Backend API |
| MongoDB | URL storage |
| Docker | Containerization |
| Kubernetes (Minikube) | Local orchestration |
| kubectl | Cluster management |
| NanoID | Unique short ID generation |

---

## 📁 Project Structure

```text
url-shortener/
├── index.js
├── package.json
├── Dockerfile
├── .dockerignore
└── k8s/
    ├── deployment.yml
    ├── service.yml
    ├── mongodb-deployment.yml
    ├── mongodb-service.yml
    └── configmap.yml
```

---

## ⚙️ Environment Variables

Configured using Kubernetes ConfigMap:

| Variable | Description |
|---|---|
| `PORT` | App running port (e.g. `3000`) |
| `BASE_URL` | Base URL for short links |
| `MONGO_URI` | MongoDB connection string |

---

## 🐳 Docker Setup

### Build the image

```bash
docker build -t your-dockerhub-username/url-shortener:latest .
```

### Push the image

```bash
docker push your-dockerhub-username/url-shortener:latest
```

---

## ☸️ Kubernetes Deployment (Minikube)

### 1) Create a namespace

```bash
kubectl create namespace url-shortener
```

### 2) Apply ConfigMap

```bash
kubectl apply -f k8s/configmap.yml -n url-shortener
```

### 3) Deploy MongoDB

```bash
kubectl apply -f k8s/mongodb-deployment.yml -n url-shortener
kubectl apply -f k8s/mongodb-service.yml -n url-shortener
```

### 4) Deploy the app

```bash
kubectl apply -f k8s/deployment.yml -n url-shortener
kubectl apply -f k8s/service.yml -n url-shortener
```

---

## 🌐 Access the Application

### Option 1: Port Forward

```bash
kubectl port-forward svc/url-shortener-service 3000:80 -n url-shortener
```

Then open:

```bash
http://localhost:3000
```

### Option 2: Minikube Service

```bash
minikube service url-shortener-service -n url-shortener
```

---

## 📊 Check Status

```bash
kubectl get all -n url-shortener
```

## 🧪 Logs

```bash
kubectl logs -f deployment/url-shortener -n url-shortener
```

---

## ⚠️ Common Issues Fixed

<details>
<summary><strong>1. ImagePullBackOff</strong></summary>

Fixed by pushing the correct Docker image to Docker Hub.

</details>

<details>
<summary><strong>2. MongoDB connection issues</strong></summary>

Solved using Kubernetes Service DNS:

```bash
mongodb://mongo-service:27017/urlShortener
```

</details>

<details>
<summary><strong>3. Node.js ESM errors (nanoid)</strong></summary>

Fixed by using a compatible version (`nanoid v4`).

</details>

<details>
<summary><strong>4. mongoose/bson crash</strong></summary>

Fixed by aligning dependency versions.

</details>

---

## 📈 Future Improvements

- Add Kubernetes Ingress with a custom domain
- Add a Persistent Volume for MongoDB
- Add CI/CD with GitHub Actions
- Create a Helm chart for deployment
- Add authentication

---

## 👨‍💻 Author

<p align="center">
  <strong>Built by aqsa890</strong><br />
  Kubernetes learning project 🚀
</p>
