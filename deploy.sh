#!/bin/bash
cd dist
rm -rf .git
git init
git add .
git commit -m "deploy"
git push --set-upstream git@github.com:brianchesko/brianchesko.github.io.git -f master
rm -rf .git