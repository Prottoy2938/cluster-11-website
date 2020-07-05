export default (req, res) => {
  res.statusCode = 200;
  res.json({
    title: "KNN Image Recognition Starter",
    images: ["/openMindStarter/openMindStarter1.jpg"],
    githubURL: "https://github.com/cluster-11/knn-image-recognition-starter",
    demoURL: "https://cluster-11.github.io/knn-image-recognition-starter/",
    description:
      "A starter application that you can use to train and recognize objects/beings/anything from image/video",
  });
};
