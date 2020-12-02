var path = require('path');

const sys = {
    // appRoot: path.resolve(__dirname),
    appHomepage: 'http://192.168.31.70:3001',
    graphql_endpoint: '/graphql'
}

const oauth_github = {
    client_id: 'ebae0c9426621b81909f',
    redirect_uri: 'http://purebbs.com/oauth/github/callback'
}

module.exports = {
    oauth_github,
    sys,
}