import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Post } from '../../components/Post';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { InputSearch } from '../../components/InputSearch';


export const Home = () => {
    const [posts, setPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [page, setPage] = useState(0)
    const [postsPerPage] = useState(10)
    const [searchValue, setSearchValue] = useState("")

    const noMorePosts = page + postsPerPage >= allPosts.length
    
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts()

        setPosts(postsAndPhotos.slice(page, postsPerPage))
        setAllPosts(postsAndPhotos)
    }, [])

    useEffect(() => {
        handleLoadPosts(0, postsPerPage)
    }, [handleLoadPosts, postsPerPage])

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

        posts.push(...nextPosts)

        setPosts(posts)
        setPage(nextPage)
    }

    const handleChange = (e) => {
        const { value } = e.target
        setSearchValue(value)
    }

    return (
        <>
            <section className='container'>                
                <InputSearch searchValue={searchValue} handleChange={handleChange}/>
                
                {filteredPosts.length > 0 && (
                    <Post posts={ filteredPosts }/> 
                )}

                {filteredPosts.length === 0 && (
                    <p className='notFound'>not found</p> 
                )}

                <div className="button-container">
                    {!searchValue && (
                        <Button disabled={noMorePosts} text={"load posters"} onClick={loadMorePosts}/>
                    )}
                </div>
            </section>

            <footer>
                <div>
                    <p>By <span>Matheus Dourado</span> {new Date().getFullYear()} </p>
                </div>
            </footer>
        </>
    )
}