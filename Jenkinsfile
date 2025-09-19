pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        APP_SERVER = '98.88.24.53'   // yahan apna APP server ka public IP ya DNS lagao
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/enterprise-practice.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                docker build -t yourdockerhub/enterprise-frontend:latest ./frontend
                docker build -t yourdockerhub/enterprise-backend:latest ./backend
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh """
                echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                docker push yourdockerhub/enterprise-frontend:latest
                docker push yourdockerhub/enterprise-backend:latest
                """
            }
        }

        stage('Deploy to App Server') {
            steps {
                sshagent(['app-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no \$APP_SERVER '
                        docker pull yourdockerhub/enterprise-frontend:latest &&
                        docker pull yourdockerhub/enterprise-backend:latest &&
                        docker-compose -f /home/ubuntu/enterprise-app/docker-compose.deploy.yml up -d
                    '
                    """
                }
            }
        }
    }
}
