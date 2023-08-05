# SETUP
load('ext://nerdctl', 'nerdctl_build')
load('ext://helm_resource', 'helm_resource', 'helm_repo')

if k8s_namespace() != 'engeto-brainsquiz':
    fail("This script is only for engeto-brainsquiz namespace.")

# output the current namespace
print(
    'Deploying to namespace: ' + k8s_namespace()
)


## BUILD IMAGES
nerdctl_build(
    ref = 'k8s.io/questions',
    context = '.',
    dockerfile = 'Dockerfile.dev',
    ignore=[
        "*",
        "!apps/services/questions/**",
    ],
    entrypoint='npm run nx -- serve services-questions',
    live_update=[
        sync('./apps/services/questions', '/repo/apps/services/questions'),
        run('npm install', trigger='./package.json'),
    ]
)

# Services
k8s_yaml(
    helm(
        './infra/k8s/system',
        values=['./infra/k8s/system/values-dev.yaml']
    )
)

k8s_resource(
    workload='questions',
    labels=['NestJS']
)
