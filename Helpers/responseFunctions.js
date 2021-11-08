const successHandler = (res, data) => {
    let resObj = {
        success: true,
        data: data || null,
        message: res.message || 'ok'
    }
    res.status(200).json(resObj)
}

const errorHandler = (res, err) => {
    let resObj = {
        success: false,
        data: null,
        message: err.message || 'Something went wrong!'
    }
    res.status(400).json(resObj)
}

const errorHandlerAuth = (res, err) => {
    let resObj = {
        success: false,
        data: null,
        message: err.message || 'missing authorization header!'
    }
    res.status(401).json(resObj)
}

export {
    successHandler,
    errorHandler,
    errorHandlerAuth
}