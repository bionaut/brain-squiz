export ENVIRONMENT=brain_local

# Run other scripts
echo "Creating Kubernetes namespace..."
./1_create_namespace.sh

echo "Installing RabbitMQ operator..."
./2_install_rabbitmq_operator.sh

echo "Deployment complete!"
