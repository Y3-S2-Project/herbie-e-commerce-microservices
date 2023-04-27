# Instructions to Install and Run a Project using Minikube, Docker Desktop, Skaffold, WSL2

This README file provides step-by-step instructions to install and run a project using Minikube, Docker Desktop, Skaffold, and WSL2 on your local machine.

## Prerequisites

Before you proceed with the installation and running of the project, make sure you have the following prerequisites installed on your local machine:

- Docker Desktop
- Minikube
- Skaffold
- WSL2

## Installation

### Docker Desktop

1. Download and install Docker Desktop from the [official website](https://www.docker.com/products/docker-desktop).
2. Follow the installation instructions to complete the installation process.

### Minikube

1. Download and install Minikube by following the instructions provided on the [official website](https://minikube.sigs.k8s.io/docs/start/).
2. Verify that Minikube is installed correctly by running the following command in a terminal:

minikube version

If Minikube is installed correctly, you should see the version number displayed in the terminal.

### Skaffold

1. Download and install Skaffold by following the instructions provided on the [official website](https://skaffold.dev/docs/install/).
2. Verify that Skaffold is installed correctly by running the following command in a terminal:

skaffold version

If Skaffold is installed correctly, you should see the version number displayed in the terminal.

### WSL2

1. Download and install WSL2 by following the instructions provided on the [official website](https://docs.microsoft.com/en-us/windows/wsl/install).
2. Verify that WSL2 is installed correctly by running the following command in a terminal:

wsl --list

If WSL2 is installed correctly, you should see a list of available distributions displayed in the terminal.

## Running the Project

1. Start Docker Desktop and wait for it to initialize.
2. Start Minikube by running the following command in a terminal:

minikube start

3. Run the following command to start a tunnel to access the Kubernetes services:

minikube tunnel


4. In a separate terminal window, navigate to the root directory of the project.
5. Run the following command to deploy the application to Minikube:

skaffold dev


This command will build and deploy the application to the Minikube cluster. Skaffold will automatically watch for changes in your code and redeploy the application as needed.

## Conclusion

By following the instructions provided in this README file, you should now be able to install and run a project using Minikube, Docker Desktop, Skaffold, and WSL2 on your local machine. If you encounter any issues during the installation or running process, please refer to the official documentation for each tool or seek help from the community.
