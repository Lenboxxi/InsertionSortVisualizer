export default function randomArray() {
    const array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 1000))
    }
    return array.join(", ");
}