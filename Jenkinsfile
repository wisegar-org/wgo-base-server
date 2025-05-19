pipeline {
    agent any

    parameters {
         string(name: "targetserver", defaultValue: "192.168.1.104")
    }
    stages {
        stage('start') {
            steps {
                script {
                    echo 'Starting the pipeline...'
                    sh 'ls -s'
                    sh 'ssh root@$targetserver ls -l'
                    sh 'ssh root@$targetserver  mkdir -p /var/opt/wgo'
                    sh 'rsync -az build/ root@$targetserver:/var/opt/wgo/wgo-server-core'
                    sh 'ssh root@$targetserver pm2 list '
                }
            }
        }
    }
}