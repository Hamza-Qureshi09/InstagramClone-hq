module.exports = (cookieName, cookiePayload, options, res) => {
    return res.cookie(cookieName, cookiePayload, options)
}

