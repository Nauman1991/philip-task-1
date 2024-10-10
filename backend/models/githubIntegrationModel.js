const mongoose = require('mongoose');

const githubIntegrationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  githubUsername: { type: String, required: true },
  accessToken: { type: String, required: true },
  integrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GithubIntegration', githubIntegrationSchema, 'github-integration');