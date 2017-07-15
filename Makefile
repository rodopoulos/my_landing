BUILD_DIR := ./live

install:
	npm install

# Deploy tasks
prod: deploy
	@ git tag -f production
	@ echo "Production deploy complete"

build:
	@ cp -r LICENSE index.html
	@ echo "Build step finished"

# Sub-tasks
clean:
	@ rm -rf $(BUILD_DIR)/*
	@ echo "Stuff cleaned from 'live' folder"

deploy:
	@ cd $(BUILD_DIR) && \
	git add -A && \
	git commit -m "Release" && \
	git push -f origin +master:refs/heads/master
	@ echo "Deploy is done"

.PHONY: install build clean deploy git-prod git-staging prod staging
