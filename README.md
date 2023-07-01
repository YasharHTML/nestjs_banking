NestJS Banking App

NestJS Banking is a monorepo microservices application designed for handling banking operations. It utilizes the NestJS framework and follows a microservices architecture pattern. The app utilizes NATS as a message broker, Firebase for authentication, and Stripe for banking operations. It is designed to be deployed on Kubernetes (K8s) and includes Dockerfiles for containerization.

Features

Microservices Architecture: The app is structured into multiple microservices to ensure modularity, scalability, and maintainability.
Message Broker (NATS): NATS is used as the messaging system to enable communication between the microservices.
Firebase Authentication: User authentication is handled through Firebase, providing a secure and reliable authentication mechanism.
Stripe Issuing Integration: Stripe is integrated into the app to handle banking operations and transactions securely.
Containerization (Docker): The app is containerized using Docker, making it easy to deploy and manage on Kubernetes or any container orchestration platform.
Requirements

Node.js (v14 or later)
Docker
Kubernetes (K8s)
Installation and Setup

Clone the repository:
```
$ git clone <repository_url>
```
Install dependencies for each microservice:
```
$ cd nestjs_banking
$ cd microservice_name
$ npm install
```
Set up environment variables:
You need to set up environment variables for each microservice to configure Firebase and Stripe credentials. Refer to the respective microservice's README.md file for specific instructions on configuring environment variables.

Build Docker images:
```
$ docker build -t <image_name> .
```
Deploying on Kubernetes

To deploy the app on Kubernetes, follow these steps:

Apply the Kubernetes manifests:
```
$ kubectl apply -f <path_to_manifests>
```
Make sure to update the manifests according to your specific requirements, such as image names and environment variables.

Monitor the deployment:
```
$ kubectl get pods
```
Ensure that all pods are running and have the desired state.

Access the app:
The app will be accessible based on the Kubernetes service or ingress configuration.

License

This project is licensed under the MIT License.

Feel free to modify and distribute this project as per the license terms.

For more information, see the LICENSE file.

Additional Information

Please refer to the individual microservice README.md files for more detailed information on each microservice's functionality, API endpoints, and specific setup instructions