git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/SantiLopezLasheras/jenkins-obligatoria-prueba.git
git config --global user.email sanloplas@alu.edu.gva.es
git config --global user.name santijll
git fetch origin
git add .
git status
git commit -m "Pipeline executada per ${env.executor}. Motiu: ${env.motiu}"
git push -v origin HEAD:main