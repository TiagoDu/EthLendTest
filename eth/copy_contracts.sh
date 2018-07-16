#!/usr/bin/env bash
DIR=../vue/ethlend/src/contracts

if [ -d "$DIR" ]; then
    printf '%s\n' "Removing folder ($DIR)"
    rm -rf "$DIR"
fi

mkdir $DIR
cp ./build/contracts/EthLendTestCore.json $DIR
cp ./build/contracts/EthLendTestStorage.json $DIR