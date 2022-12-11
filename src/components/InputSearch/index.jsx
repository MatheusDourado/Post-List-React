import './styles.css'

export const InputSearch = ({searchValue, handleChange}) => {
    return (
        <>  
            <div className='header-list'>
                <h2 className='title-2'> Post list </h2>
                <input type="search" className='search' placeholder='Digite aqui...' onChange={handleChange} value={searchValue}/>
            </div>

            {!!searchValue && (
                <>
                    <h3 className='title-3'>Search value: { searchValue }</h3>
                </>
            )}
        </>
    )
}
