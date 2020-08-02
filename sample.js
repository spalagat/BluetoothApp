var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
// let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

const bucket = 'imagebucket180220-dev'; // the bucketname without s3://
const photo_source  = 'public/sandeeppalagati.jpeg';
const photo_target  = 'public/Bharadwaj_selfie.jpg';
const client = new AWS.Rekognition();
const params = {
    SourceImage: {
      S3Object: {
        Bucket: bucket,
        Name: photo_source
      },
    },
    TargetImage: {
      S3Object: {
        Bucket: bucket,
        Name: photo_target
      },
    },
    SimilarityThreshold: 10
  }
  client.compareFaces(params, async function(err, response) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
        console.log(response.FaceMatches.length);
        if(response.FaceMatches.length>0){
            response.FaceMatches.forEach(data => {
                let position   = data.Face.BoundingBox
                let similarity = data.Similarity
                console.log()
              }) // for response.faceDetails
        }
        else{
            console.log("simillarity is zero");
        }
     
    } // if
  });