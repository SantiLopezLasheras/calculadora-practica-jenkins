echo ${env.GITHUB_USERNAME}
echo ${env.GITHUB_TOKEN}
echo ${env.GITHUB_EMAIL}
echo ${env.executor}
echo ${env.motiu}
git remote set-url origin https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/SantiLopezLasheras/calculadora-practica-jenkins.git
git config --global user.email ${env.GITHUB_EMAIL}
git config --global user.name ${env.GITHUB_USERNAME}
git fetch origin
git add .
git status
git commit -m "Pipeline executada per ${env.executor}. Motiu: ${env.motiu}"
git push -v origin HEAD:main