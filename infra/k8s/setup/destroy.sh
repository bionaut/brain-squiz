# variables
source ./vars.sh

#echo "Delete rabbitmq-operator"
kubectl delete -f https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml --namespace rabbitmq-system

# Delete namespace
echo "Deleting $ENGETO_ENV namespace"
kubectl delete namespaces "$ENGETO_ENV"

echo "Destroying Postgres Operator UI..."
# Uninstall the postgres-operator-ui
helm uninstall postgres-operator-ui

echo "Destroying Postgres Operator..."
# Uninstall the postgres-operator
helm uninstall postgres-operator

echo "Removing Postgres Operator UI charts..."
# Remove the repo for postgres-operator-ui
helm repo remove postgres-operator-ui-charts

echo "Removing Postgres Operator charts..."
# Remove the repo for postgres-operator
helm repo remove postgres-operator-charts

echo "Cleanup complete!"
