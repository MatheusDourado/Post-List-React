import { Component } from 'react';

import './styles.css';

import { Post } from '../../components/Post';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { InputSearch } from '../../components/InputSearch';

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 9,
        searchValue: ''
    }

    async componentDidMount() {
        await this.loadPost()
    }

    loadPost = async () => {
        const { page, postsPerPage } = this.state
        const postsAndPhotos = await loadPosts()
        
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos   
        })
    }

    loadMorePosts = () => {
        const {
            page,
            postsPerPage,
            allPosts,
            posts
        } = this.state

        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

        posts.push(...nextPosts)
        this.setState({ posts, page: nextPage })
    }

    handleChange = (e) => {
        const { value } = e.target
        this.setState({ searchValue: value })
    }

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state
        const noMorePosts = page + postsPerPage >= allPosts.length
        const filteredPosts = !!searchValue ? allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase())
        }) : posts

        return (
            <>
                <section className='container'>                
                    <InputSearch searchValue={searchValue} handleChange={this.handleChange}/>
                    
                    {filteredPosts.length > 0 && (
                        <Post posts={ filteredPosts }/> 
                    )}

                    {filteredPosts.length === 0 && (
                        <p className='notFound'>not found</p> 
                    )}

                    <div className="button-container">
                        {!searchValue && (
                            <Button disabled={noMorePosts} text={"load posters"} onClick={this.loadMorePosts}/>
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
}