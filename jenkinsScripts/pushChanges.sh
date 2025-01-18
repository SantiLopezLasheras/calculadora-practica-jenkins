git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/SantiLopezLasheras/calculadora-practica-jenkins.git
git fetch origin
git add .
git commit -m "Pipeline executada per ${env.executor}. Motiu: ${env.motiu}"
git status
git push origin HEAD:ci_jenkins