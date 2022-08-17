import * as path from 'path';
import {
  App, Stack, StackProps,
  aws_ec2 as ec2,
  aws_ecs as ecs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, 'newVpc', {
      natGateways: 0,
    });
    const cluster = new ecs.Cluster(this, 'cluster', {
      vpc,
    });
    const task = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition');
    task.addContainer('python', {
      portMappings: [{ containerPort: 5000 }],
      image: ecs.AssetImage.fromAsset(path.join(__dirname, '../image')),
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'python-print-env',
      }),
    });
    const svc = new ecs.FargateService(this, 'FargateService', {
      taskDefinition: task,
      cluster,
      assignPublicIp: true,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      enableExecuteCommand: true,
    });

    svc.connections.allowFromAnyIpv4(ec2.Port.tcp(5000));
  }
}

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'demo-print-ecs-env-dev', { env: devEnv });

app.synth();