import { Injectable} from "@nestjs/common"
import * as bcrypt from 'bcrypt';

@Injectable()
export class Utils {

    private readonly SALT_ROUNDS = 10;

    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

}