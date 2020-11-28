const users = [
    {id : "t", name: "정인환", password: "123", role: "professor", authentication: true, studentId: 33333},
    {id : "a", name: "송진호", password: "123", role: "student", authentication: true, studentId: 1592018},
    {id : "b", name: "노윤호", password: "123", role: "student", authentication: true, studentId: 1592008},
    {id : "c", name: "신성식", password: "123", role: "student", authentication: true, studentId: 1592020},
]

export function signIn({name, password, settingUser}) {
    const user = users.find(
        (user) => user.id === name && user.password === password
    )
    if (user === undefined) {
        // 없으면 Error 처리
        throw new Error()
    } else {
        settingUser(user);
        return user
    }
}
