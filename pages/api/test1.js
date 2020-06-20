export default (req, res) => {
  res.statusCode = 200;
  res.json({
    title: "Image Recognition MobileNet",
    images: [
      "/imageRecognition/imageRecognitionEX.jpg",
      "/imageRecognition/imageRecognition.jpg",
      "/imageRecognition/imageRecognition1.jpg",
      "/imageRecognition/imageRecognition2.jpg",
      "/imageRecognition/imageRecognition3.jpg",
    ],
    githubURL: "https://github.com/Prottoy2938/cluster-11-website",
    demoURL: "https://cluster-11.now.sh/",
    description:
      "Basic Image Recognition Application written for the web. To do this, it takes help from ML5 library and MobileNet",
  });
};
