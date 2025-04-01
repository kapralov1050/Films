type UserValues = 
    | string
    | number
    | boolean
    | null
    | undefined

export function useLocalStorage<UserValues>(key:string , defaultValue: UserValues): Ref<UserValues> {

    const isClient = typeof window !== 'undefined';

    const initialValue = isClient 
        ? JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
        : defaultValue;

    const value = ref(initialValue);

    watchEffect(() => {
        if(isClient) {
        localStorage.setItem(key, JSON.stringify(value.value));
        }
    })

    return value
}