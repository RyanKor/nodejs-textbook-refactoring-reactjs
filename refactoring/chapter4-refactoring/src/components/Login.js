import React, {useState} from 'react'

const handleSubmit = (e)=>{
    const value = e.target.value
}

const Login = ()=>{
    const [value, setValue] = useState("")
    return (
        <form>
            <input
            value={value}
            />
        </form>
    )
}

export default Login