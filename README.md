🚀 URL Shortener on Kubernetes (Node.js + MongoDB)

A simple URL Shortener backend service built with Node.js, Express, and MongoDB, deployed on a Kubernetes (Minikube) cluster using Docker containers.

📌 Features
Shorten long URLs into unique short links
Redirect short URLs to original URLs
MongoDB database integration
Containerized using Docker
Deployed on Kubernetes (Minikube)
Configurable via ConfigMap
Scalable deployment using ReplicaSets
🧰 Tech Stack
Node.js (Express)
MongoDB
Docker
Kubernetes (Minikube)
kubectl
NanoID (for unique IDs)
📁 Project Structure
url-shortener/
│
├── index.js
├── package.json
├── Dockerfile
├── .dockerignore
│
└── k8s/
    ├── deployment.yml
    ├── service.yml
    ├── mongodb-deployment.yml
    ├── mongodb-service.yml
    ├── configmap.yml
⚙️ Environment Variables

Configured using Kubernetes ConfigMap:

Variable	Description
PORT	App running port (e.g. 3000)
BASE_URL	Base URL for short links
MONGO_URI	MongoDB connection string
🐳 Docker Setup
Build Image
docker build -t your-dockerhub-username/url-shortener:latest .
Push Image
docker push your-dockerhub-username/url-shortener:latest
☸️ Kubernetes Deployment (Minikube)
1. Create Namespace
kubectl create namespace url-shortener
2. Apply ConfigMap
kubectl apply -f k8s/configmap.yml -n url-shortener
3. Deploy MongoDB
kubectl apply -f k8s/mongodb-deployment.yml -n url-shortener
kubectl apply -f k8s/mongodb-service.yml -n url-shortener
4. Deploy App
kubectl apply -f k8s/deployment.yml -n url-shortener
kubectl apply -f k8s/service.yml -n url-shortener
🌐 Access Application
Option 1: Port Forward
kubectl port-forward svc/url-shortener-service 3000:80 -n url-shortener

Then open:

http://localhost:3000
Option 2: Minikube Service
minikube service url-shortener-service -n url-shortener
📊 Check Status
kubectl get all -n url-shortener
🧪 Logs
kubectl logs -f deployment/url-shortener -n url-shortener
⚠️ Common Issues Fixed
1. ImagePullBackOff

✔ Fixed by pushing correct Docker image to Docker Hub

2. MongoDB connection issues

✔ Solved using Kubernetes Service DNS:

mongodb://mongo-service:27017/urlShortener
3. Node.js ESM errors (nanoid)

✔ Fixed by using compatible version (nanoid v4)

4. mongoose/bson crash

✔ Fixed by aligning dependency versions

📈 Future Improvements
Add Kubernetes Ingress (custom domain)
Add Persistent Volume for MongoDB
CI/CD with GitHub Actions
Helm chart deployment
Authentication system
👨‍💻 Author

Built by elsa888
Kubernetes learning project 🚀
