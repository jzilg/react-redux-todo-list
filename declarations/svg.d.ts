// define ts modules for file imports
// otherwise ts compiler complains when importing some file types

declare module '*.svg' {
    const content: any
    export default content
}
