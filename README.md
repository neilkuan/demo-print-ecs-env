# This project for demo print ecs env

# To Clone
```bash
git clone 
```

## To Install 
```bash
yarn
```

## To Diff 
```bash
npx cdk diff
```

## To Deploy 
```bash
npx cdk deploy
```

Go to ECS console get Task public ip: x.x.x.x
- http:x.x.x.x:5000/
  - `{"message": "pong!!!" }`
- http:x.x.x.x:5000/env
  - Listing environment variables
- http:x.x.x.x:5000/get
  - get task-arn via `ECS_CONTAINER_METADATA_URI_V4`

## To Destroy
```bash
npx cdk destroy
```