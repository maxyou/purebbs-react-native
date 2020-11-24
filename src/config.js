var path = require('path');

const sys = {
    // appRoot: path.resolve(__dirname),
    appHomepage: 'http://localhost:3000',
    graphql_endpoint: '/graphql'
}

const oauth_github = {
    client_id: '91d108e1d6accd14039b',
    redirect_uri: 'http://localhost:3001/oauth/github/callback'
}

module.exports = {
    oauth_github,
    sys,
}