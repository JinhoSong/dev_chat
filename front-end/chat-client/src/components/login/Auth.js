const users = [
    {  name: "t",password: "123", role: "professor" },
    {  name: "a",password: "123", role: "student" },
    {  name: "b",password: "123", role: "student" },
    {  name: "c",password: "123" ,role: "student" },
]

export function signIn({ name, password }) {
    const user = users.find(
        (user) => user.name === name && user.password === password
    )
    if (user === undefined) {
        throw new Error()
    } else {
        console.log(user);
        return user
    }
}

