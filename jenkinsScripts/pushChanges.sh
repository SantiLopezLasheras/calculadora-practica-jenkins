git remote set-url origin https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/SantiLopezLasheras/jenkins-obligatoria-prueba.git
git config --global user.email ${env.GITHUB_EMAIL}
git config --global user.name SantiLopezLasheras
git fetch origin
git add .
git status
git commit -m "Pipeline executada per ${env.executor}. Motiu: ${env.motiu}"
git push -v origin HEAD:main