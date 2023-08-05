#!/bin/bash

echo "1 - Setting up Kubernetes namespace..."
# create a new namespace
kubectl create namespace $ENVIRONMENT
kubectl create namespace argocd

# swich to the new namespace
kubectl config set-context --current --namespace=$ENVIRONMENT
