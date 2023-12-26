import {useCreateUser} from "../../../../../application/useCreateUser.ts";

export const AddUserPage = () => {
    const {
            loading,
            error,
            email,
            setEmail,
            name,
            setName,
            createUser
    } = useCreateUser()

    return (
        <div className="container">
            <h2>Crear User:</h2>
            <form>
                <label>
                    Name:<br/>
                    <input value={name} type="text" name="email" onChange={(e)=>setName(e.target.value)} />
                </label>
                <br/>
                <label>
                    Email:<br/>
                    <input value={email} type="text" name="email" onChange={(e)=>setEmail(e.target.value)} />
                </label>
                <br/>
                <br/>
                <p style={{color:"red"}}>{error}</p>
                <input className="button" type="button" value={`Crear User ${loading ? "..." : ""}` } onClick={()=>createUser()} style={{margin:"20px"}} />
            </form>
        </div>
    )
}
