pipeline {
  agent any
  tools { nodejs 'Node'}

  environment {
    GITHUB_USERNAME = credentials('github-username') 
    GITHUB_TOKEN = credentials('token-github')
    GITHUB_EMAIL = credentials('github-email')

  stages{
    stage('Petició de dades') {
      steps {
        script {
          // En executar-se, demanarà tres valors per pantalla
          def userInput = input(
            message: 'Introduix els següents paràmetres:',
            parameters: [
              string(name: 'executor', defaultValue: 'user', description: 'Nom de la persona que executa la pipeline'),
              string(name: 'motiu', defaultValue: 'motiu', description: 'Motiu pel qual estem executant la pipeline'),
              string(name: 'chatID', defaultValue: 'num_chat', description: 'ChatID de telegram per a notificar els resultats')
            ]
          )
          // Assignació a variables d'entorn
          env.executor = userInput.executor
          env.motiu = userInput.motiu
          env.chatID = userInput.chatID
        }
      }
    }
    stage('Linter') {
      steps {
        script {
          try {
            sh "npm install"
            sh "npm run lint"
            env.LINTER_STATUS = 'success'
          } catch (e) {
            console.log(e)
            env.LINTER_STATUS = 'failure'
          }
        }
      }
    }
    stage('Test') {
      steps {
        script {
          try {
            sh "npm run test"
            env.TEST_STATUS = 'success'
          } catch (e) {
            console.log(e)
            env.TEST_STATUS = 'failure'
          }
        }
      }
    }
    stage('Build') {
      steps {
        sh "npm run build"
      }
    }
    stage('Update_Readme') {
      steps {
        script {
          try {
            sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'" 
            env.UPDATE_README_STATUS = 'success'
          } catch (e) {
            console.log(e)
            env.UPDATE_README_STATUS = 'failure'
          }
        }
      }
    }
    stage('Push_Changes') {
      steps {
        sh "./jenkinsScripts/pushChanges.sh"
      }
    }
  }
}