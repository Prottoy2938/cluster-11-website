export default (req, res) => {
  res.statusCode = 200;
  res.json({
    title: "MobileNet Image Recognition Starter",
    images: [
      "/imageRecognition/imageRecognitionEX.jpg",
      "/imageRecognition/imageRecognition.jpg",
      "/imageRecognition/imageRecognition1.jpg",
      "/imageRecognition/imageRecognition2.jpg",
      "/imageRecognition/imageRecognition3.jpg",
    ],
    githubURL:
      "https://github.com/cluster-11/mobileNet-image-recognition-starter",
    demoURL:
      "https://cluster-11.github.io/mobileNet-image-recognition-starter/",
    description:
      // "Basic image recognition web application starter, uses MobileNet model",
      "Basic image recognition web application, uses MobileNet model",
  });
};
