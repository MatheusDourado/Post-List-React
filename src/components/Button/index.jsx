import './styles.css'

export const Button = (props) => (
    <button disabled={props.disabled} className='btn' onClick={props.onClick}>{props.text}</button>
)

