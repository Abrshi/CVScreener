// backend/services/githubService.js
const axios = require("axios");

const githubService = {
  async getInsights(username) {
    try {
      // 1. User basic info
      const user = await axios.get(`https://api.github.com/users/${username}`);

      // 2. Repositories
      const repos = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      );

      // 3. Recent activity (last ~30 events)
      const events = await axios.get(
        `https://api.github.com/users/${username}/events/public?per_page=30`,
      );

      const u = user.data;
      const r = repos.data;
      const e = events.data;

      // Simple calculations
      const totalRepos = u.public_repos;
      const followers = u.followers;

      // Recent activity count
      const recentActivity = e.length;

      // Most active repo recently
      const repoCount = {};
      e.forEach((ev) => {
        if (ev.repo)
          repoCount[ev.repo.name] = (repoCount[ev.repo.name] || 0) + 1;
      });
      const mostActiveRepo =
        Object.keys(repoCount).sort((a, b) => repoCount[b] - repoCount[a])[0] ||
        "No recent activity";

      // Top 5 languages
      const langCount = {};
      r.forEach((repo) => {
        if (repo.language)
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      });
      const topLanguages = Object.keys(langCount)
        .sort((a, b) => langCount[b] - langCount[a])
        .slice(0, 5);

      // Activity level (simple rule)
      let activityLevel = "🌱 Low activity";
      if (recentActivity >= 15 || totalRepos >= 15)
        activityLevel = "🚀 Highly active";
      else if (recentActivity >= 6 || totalRepos >= 8)
        activityLevel = "🔥 Moderately active";

      return {
        username: u.login,
        name: u.name || u.login,
        avatar: u.avatar_url,
        bio: u.bio || "",
        location: u.location || "",
        joined: new Date(u.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        publicRepos: totalRepos,
        followers: followers,
        recentActivity: recentActivity,
        mostActiveRepo: mostActiveRepo,
        topLanguages: topLanguages,
        activityLevel: activityLevel,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`GitHub username "${username}" not found`);
      }
      throw new Error("Could not fetch GitHub data. Try again later.");
    }
  },
};

module.exports = githubService;
