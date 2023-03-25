import bcrypt from 'bcrypt';
import { sign } from '../../../auth';
const TABLA = 'auth';
// verificar existencia de la tabla

export function ControllerAuth (injectedStore: any) {
    let store = injectedStore;

    const login = async (username: string, password: string) => {
        const data = await store.query(TABLA, { username: username });
        if ( await bcrypt.compare(password, data.password) )  {
            const { password, ...rest } = data;
            return sign(rest);
        }
        throw new Error('Información inválida');
    }
}