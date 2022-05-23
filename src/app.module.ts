import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_nest_autenticate',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    HelperModule,
  ],
})
export class AppModule {}
