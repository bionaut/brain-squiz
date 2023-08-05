#!/bin/bash

echo "1 - Setting up Kubernetes namespace..."
# create a new namespace
kubectl create namespace $ENGETO_ENV

# switch to the new namespace
kubectl config set-context --current --namespace=$ENGETO_ENV
