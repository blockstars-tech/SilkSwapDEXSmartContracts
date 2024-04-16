#!/usr/bin/env bash

SCRIPT=$1
NETWORK_NAME=$2

echo "script: $SCRIPT"
echo "network name: $NETWORK_NAME"

if [ -z $SCRIPT ]; then
	NEW_CODE=1
	echo "empty script"
	exit $NEW_CODE
fi

if [ -z $NETWORK_NAME ]; then
	NEW_CODE=1
	echo "empty network name, set to default value(hardhat)"
	NETWORK_NAME="hardhat"
fi

if [ -e $SCRIPT ]; then
	echo "ok"
else
	NEW_CODE=1
	echo "script '$SCRIPT' does not exist"
	exit $NEW_CODE
fi

echo "Installing dependencies..."
yarn

echo "Clean and compile..."
yarn clean && yarn compile

echo "Run the task"
yarn runAndVerify $SCRIPT --network $NETWORK_NAME
