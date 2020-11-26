var path = require('path');

const sys = {
    // appRoot: path.resolve(__dirname),
    appHomepage: 'http://purebbs.com',
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