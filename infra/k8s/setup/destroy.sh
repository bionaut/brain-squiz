#!/bin/bash

echo "Delete rabbitmq-operator release..."
kubectl delete -f https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml --namespace rabbitmq-system

# Delete namespace
echo "Deleting $ENVIRONMENT namespace..."
kubectl delete namespaces $ENVIRONMENT


echo "Cleanup complete!"
