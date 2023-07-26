cd src/app
pnpm run build
cd ../../ 
rm -rf dist
mkdir dist
cd src
cp background.js contentScript.js manifest.json ../dist/
cp -r ./public/* ../dist/
cp -r app/dist/* ../dist