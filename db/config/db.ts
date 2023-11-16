import { DataSource } from "typeorm";
import { Car } from "../../src/Entities/cars";
import { User } from "../../src/Entities/users";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "secret",
  database: "leo_cars",
  entities: [Car, User],
  synchronize: true,
  migrations: [],
});

export default AppDataSource;
