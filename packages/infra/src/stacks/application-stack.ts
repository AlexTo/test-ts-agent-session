import {
  S3A2aAgent,
  S3AguiAgent,
  S3HttpAgent,
} from '@my-agent-project/common-constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const s3A2aAgent = new S3A2aAgent(this, 'S3A2aAgent');
    const s3AguiAgent = new S3AguiAgent(this, 'S3AguiAgent');
    const s3HttpAgent = new S3HttpAgent(this, 'S3HttpAgent');

    s3A2aAgent.grantInvokeAccess(s3AguiAgent);
    s3A2aAgent.grantInvokeAccess(s3HttpAgent);
  }
}
