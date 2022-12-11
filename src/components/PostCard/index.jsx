import './styles.css'

export const PostCard = ({cover, title, body, id}) => {
    return (
        <div className='post'>
            <img className='post-img' src={cover} alt={title}/>
            <div className='post-content'>
                <h2 className='title-1'>{title} {" " + id}</h2>
                <p className='text'>{body}</p>   
            </div>
        </div>
    )
}