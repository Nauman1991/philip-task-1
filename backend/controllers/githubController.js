const axios = require('axios');
const GithubIntegration = require('../models/githubIntegrationModel');

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/github/callback';

exports.initiateAuth = (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user,repo`;
  res.json({ authUrl });
};

exports.handleCallback = async (req, res) => {
    const { code } = req.query;
    
    try {
      // Exchange code for access token
      const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }, {
        headers: { Accept: 'application/json' }
      });
  
      const accessToken = tokenResponse.data.access_token;
  
      // Fetch user data from GitHub
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
  
      const userId = userResponse.data.id.toString();
      const githubUsername = userResponse.data.login;
  
      // Save or update the integration in the database
      await GithubIntegration.findOneAndUpdate(
        { userId },
        { 
          userId,
          githubUsername,
          accessToken,
          integrationDate: new Date()
        },
        { upsert: true, new: true }
      );
  
      // Redirect to the frontend with the GitHub user ID
      res.redirect(`http://localhost:4200/github-success?userId=${userId}`);
    } catch (error) {
      console.error('Error handling GitHub callback:', error);
      res.redirect('http://localhost:4200/github-error');
    }
  };

exports.getStatus = async (req, res) => {
  try {
    const integration = await GithubIntegration.findOne({ userId: req.query.userId });
    res.json({ 
      connected: !!integration,
      integrationDate: integration ? integration.integrationDate : null 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get integration status' });
  }
};

exports.removeIntegration = async (req, res) => {
  try {
    await GithubIntegration.findOneAndDelete({ userId: req.query.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove integration' });
  }
};