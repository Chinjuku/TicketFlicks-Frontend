export const types = [
    "ALL MOVIES", "NOW SHOWING", "COMMING SOON", "FAVORITE", "RECCOMMANDED"
]

export const getRandomTypes = () => {
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}