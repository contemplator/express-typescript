import "reflect-metadata";
import { ConnectionOptions } from "typeorm";

// export let dbOptions: ConnectionOptions = {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "tudi01",
//     password: "tudi01",
//     database: "tudi_cn_his",
//     entities: [
//         "./entities/*.js"
//     ],
//     synchronize: true,
// }

export let dbOptions: any = {
    host: "localhost",
    port: 3306,
    user: "tudi01",
    password: "tudi01",
    database: "tudi_cn_his"
}