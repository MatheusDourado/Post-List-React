export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
    const [posts, photos] = await Promise.all([postsResponse, photosResponse])
    const postsJSON = await posts.json()
    const photosJSON = await photos.json()

    const  postsAndPhotos = postsJSON.map((post, index) => {
        return {...post, cover: photosJSON[index].url}
    })

    return postsAndPhotos
}