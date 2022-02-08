pipeline {

    agent {
        kubernetes(k8sAgent(name: 'base', idleMinutes: params.POD_IDLE_MINUTES))
    }

    options {
        ansiColor('xterm')
        timestamps()
    }

    parameters {
        string(name: 'POD_IDLE_MINUTES', defaultValue: '0', description: 'Number of minutes pod will stay idle post build')
    }

    stages {

        stage('Printenv') {
            steps {
                sh label: 'printenv',
                script: 'printenv'
            }
        }

    } // End of stages

} // End of pipeline
