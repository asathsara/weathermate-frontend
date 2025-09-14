export const fahrenheitToCelsius = (fahrenheit: number): number=> {

    if (!Number.isNaN(fahrenheit)) {
        return (fahrenheit - 32) * (5 / 9);
    }
    
    return fahrenheit
}