import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlDistributedGatewayModule } from '@graphqlcqrs/graphql-gateway';
import { HeadersDatasource } from '@graphqlcqrs/common/helpers/headers.datasource';

@Module({
  imports: [
    CacheModule.register(),
    GraphqlDistributedGatewayModule.forRoot({
      subscriptions: false,
      path: '/graphql',
      context: context => context,
      serviceList: [
        { name: 'project', url: 'http://localhost:9100/graphql' },
        // more services
      ],
      buildService({ url }) {
        return new HeadersDatasource({ url });
      },
      cors: {
        preflightContinue: true,
        credentials: true,
      },
      playground: {
        workspaceName: 'Admin Gateway',
        settings: {
          'editor.theme': 'light',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
