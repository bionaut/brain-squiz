#!/bin/bash

echo "3 - Installing RabbitMQ Operator..."
kubectl apply -f https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml --namespace=rabbitmq-system
