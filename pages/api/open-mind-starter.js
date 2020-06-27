export default (req, res) => {
  res.statusCode = 200;
  res.json({
    title: "Open Mind Starter",
    images: ["/openMindStarter/openMindStarter1.jpg"],
    githubURL:
      "https://github.com/cluster-11/open-mind-starter-vanilla-javascript",
    demoURL:
      "https://cluster-11.github.io/open-mind-starter-vanilla-javascript/",
    description:
      "A web application that you can use to train and recognize your own images",
  });
};
