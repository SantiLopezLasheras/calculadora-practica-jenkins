pipeline {
  agent any
  tools { nodejs 'Node'}

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
  }
}