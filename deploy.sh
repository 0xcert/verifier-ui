set -e
npm install
npm run generate
cd dist
echo 'verify.0xcert.org' > CNAME
git init
git add -A
git commit -m "Deploy website"
git push -f git@github.com:0xcert/verify-ui.git master:gh-pages
cd -
echo ''
echo '-----------------------'
echo '  Deployment complete. '
echo '-----------------------'