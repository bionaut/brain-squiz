# variables
source ./vars.sh

# Run scripts
./1_create_namespace.sh
./2_install_psql_operator.sh
./3_install_rabbitmq_operator.sh

echo "Deployment complete!"
