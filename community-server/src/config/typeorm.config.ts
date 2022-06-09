import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeormconfig:TypeOrmModuleOptions={
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'community',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging:["error"]
}