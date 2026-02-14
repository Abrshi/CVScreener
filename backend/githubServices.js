const axios = require("axios");

const githubService = {
  async getInsights(username) {
    try {
      const user = await axios.get(`https://api.github.com/users/${username}`);
      const repos = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      );
      const events = await axios.get(
        `https://api.github.com/users/${username}/events/public?per_page=30`,
      );

      const u = user.data;
      const r = repos.data;
      const e = events.data;

      const totalRepos = u.public_repos;
      const followers = u.followers;
      const recentActivity = e.length;

      // Most active repo
      const repoCount = {};
      e.forEach((ev) => {
        if (ev.repo?.name) {
          repoCount[ev.repo.name] = (repoCount[ev.repo.name] || 0) + 1;
        }
      });
      const mostActiveRepo =
        Object.keys(repoCount).sort((a, b) => repoCount[b] - repoCount[a])[0] ||
        "No recent activity";

      // Top languages
      const langCount = {};
      r.forEach((repo) => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });
      const topLanguages = Object.keys(langCount)
        .sort((a, b) => langCount[b] - langCount[a])
        .slice(0, 5);

      // Activity level
      let activityLevel = "🌱 Low activity";
      if (recentActivity >= 15 || totalRepos >= 15) {
        activityLevel = "🚀 Highly active";
      } else if (recentActivity >= 6 || totalRepos >= 8) {
        activityLevel = "🔥 Moderately active";
      }

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
        followers,
        recentActivity,
        mostActiveRepo,
        topLanguages,
        activityLevel,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`GitHub username "${username}" not found`);
      }
      throw new Error("Could not fetch GitHub data. Try again later.");
    }
  },
};

module.exports = githubService;
