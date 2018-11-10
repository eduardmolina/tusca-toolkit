let post = (url, user, pass) => {
    return fetch(url,
    {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            pass: pass,
        })
    }).then((response) => {
        return response.status;
    });
}

export const makePostRequest = (user, pass) => {
    let req = post('/request', user, pass);
    return req;
}
