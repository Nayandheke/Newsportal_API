const showError = (error, next) => {
    console.log(error)
    next({
        message:'Problem while processing request.',
        status:400
    })
}

module.exports = {showError}