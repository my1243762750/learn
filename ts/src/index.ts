interface Bird {
    name: string,
    fly(): void
}

interface Person {
    name: string
    eat(): void
}

interface Person1 {
    speak: (words: string) => void
}

interface Person2 {
    // interests: {name: string, level: number} []
    interests: Array<{name: string, level: number}>
}

interface Person3 {
    [propName: string]: any
}

interface Person4 {
    name: string,
    age: number
}

type person4Keys = keyof Person4;

interface Person5 {
    name: string,
    age: number,
    gender: 'male' | 'female'
}

type partialPerson = {
    [key in keyof Person4]?: Person4[key]
}

type partialPerson1 = {
    [key in keyof Person4]-?: Person4[key]
}

type partialPerson2<T> = {
    [key in keyof T]-?: T[key]
}

type partialPerson3<T> = {
    readonly [key in keyof T]-?: T[key]
}

type partialPerson4<T, K extends keyof T> = {
    [key in K]: T[key]
}



// Partial | Required | Readonly 例如: Partial<Person5>
// Pick 例如: Partial<Person5, 'name'>
// type Condition<T> = T extends Fish ? Water : Sky

interface AxiosConfig {
    url: string,
    method: string,
    params: Record<string, any>
}

interface Calculate {
    name: string
    <T>(a: T, b: T): T
}
