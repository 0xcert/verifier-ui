set -e
npm install
npm run generate
cd dist
echo 'verify.0xcert.org' > CNAME
cat 
echo '# 0xcert Verifier public website

This upublic generated website of https://github.com/0xcert/verifier-ui/' > README.md
git init
git add -A
git commit -m "Deploy website"
git push -f git@github.com:0xcert/verifier-ui.git master:gh-pages
cd -
echo '-----------------------'
echo '  Deployment complete. '
echo '-----------------------'