export default (req, res) => {
  res.statusCode = 200;
  res.json({
    title: "Image Recognition Starter",
    images: [
      "/imageRecognition/imageRecognitionEX.jpg",
      "/imageRecognition/imageRecognition.jpg",
      "/imageRecognition/imageRecognition1.jpg",
      "/imageRecognition/imageRecognition2.jpg",
      "/imageRecognition/imageRecognition3.jpg",
    ],
    githubURL: "https://github.com/cluster-11/image-recognition-starter/",
    demoURL: "https://cluster-11.github.io/image-recognition-starter/",
    description:
      "Basic image recognition web application starter, uses MobileNet model",
  });
};
