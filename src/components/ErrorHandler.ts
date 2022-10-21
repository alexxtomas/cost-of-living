
const ErrorHandler = (err: Errors): Error | string | void => {
    const { type } = err

    if (type === 'nullDOMelement') {
        const text = 'A html tag cannot be selected'
        throw new Error(text)
    }
    else if (type === 'throw') throw new Error(err.text)

    else if (type === 'default') {
        const { element } = err
        element.innerHTML = `<${err.tag} class="error-${err.tag}">${err.text}</${err.tag}>`
    }

    else if (type === 'catch') console.error(err.catchError)


}


export default ErrorHandler

