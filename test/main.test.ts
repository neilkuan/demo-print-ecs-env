import { App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  Template.fromStack(stack).findResources('AWS::ECS::Cluster');
  Template.fromStack(stack).findResources('AWS::ECS::Vpc');
  Template.fromStack(stack).hasResourceProperties('AWS::ECS::TaskDefinition', Match.objectLike({
    ContainerDefinitions: [{
      PortMappings: [
        {
          ContainerPort: 5000,
          Protocol: 'tcp',
        },
      ],
    }],
  }));

});