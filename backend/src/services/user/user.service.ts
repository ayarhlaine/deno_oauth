import client from "../../connectors/mongo_db/mongo_db_connector.ts";
import { Collection, Database, ObjectId } from "../../deps.ts";
import { UserSchema } from "../../models/User.ts";
import { IdTokenClaims } from "../auth/auth_config.ts";

class UserService {

    private db: Database;
    private users: Collection<UserSchema>;

    constructor(){
        this.db = client.database("auth_db");
        this.users = this.db.collection<UserSchema>("users");
    }

    public async findUserByOidOrRegister(idTokenClaims: IdTokenClaims): Promise<UserSchema | undefined> {
        console.log(idTokenClaims)
        const user = await this.users.findOne({ ms_oid: idTokenClaims.oid });
        if(user) {
            return user;
        } else {
            const newUserId = await this.createUser({
                name: idTokenClaims.name,
                ms_oid: idTokenClaims.oid,
                email: idTokenClaims.email,
            })
            return await this.users.findOne({ _id: newUserId });
        }
    }

    public async createUser(user: UserSchema): Promise<ObjectId> {
        const insertId = await this.users.insertOne(user);
        return insertId;
    }

}

export default new UserService();