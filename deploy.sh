#!/bin/bash

if [ $# -lt 2 ]
	then
		echo Please provide repository name and tag
		exit 1

	else
		SOURCE_IMAGE=kevinjain/$1:$2

		echo ======================== Building $SOURCE_IMAGE ========================
		
		docker build -t "$SOURCE_IMAGE" .

		echo ======================== Pushing $SOURCE_IMAGE to DockerHub ========================

		docker push $SOURCE_IMAGE
fi