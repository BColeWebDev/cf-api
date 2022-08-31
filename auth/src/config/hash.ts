// Hashing Password using Bcrypt
import bcrypt  from "bcryptjs"

interface Hash{
rounds: number
password: string
}


// rounds - number of hashes
// password - client enter password 
const hash = async ({rounds, password}: Hash) => {
    const salt = await bcrypt.genSalt(rounds)

    return bcrypt.hash(password, salt)

}

// bodyPassword compared from client-side
// dbPassword compared from database
const compare = async (bodyPassword:string, dbPassword:string) => {
    return bcrypt.compare(bodyPassword, dbPassword)
}
export default { hash, compare }
