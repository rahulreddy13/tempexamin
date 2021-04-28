pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'Hello World'
          }
        }

        stage('Testing') {
          steps {
            echo 'Hello World 2'
          }
        }

      }
    }

    stage('Building') {
      parallel {
        stage('Building') {
          steps {
            echo 'Hello Building'
          }
        }

        stage('Test') {
          steps {
            echo 'Hello'
          }
        }

      }
    }

    stage('Final') {
      steps {
        echo 'New Test'
      }
    }

  }
}
