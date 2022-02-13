import './form-input.styles.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />

        {/*
        Agr label provided h to classname waali condition chalegi else null.
        className me 2 classNames h ->
        (1) agr user kuch type karne k liye input field me click karega to value ki length mil
        jaayegi to shrink class apply hogi vrna empty string 
        (2) form-input-label hamesha apply hogi
        */}

        {label ?
            (<label
                className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)
            : null}
    </div>

)

export default FormInput