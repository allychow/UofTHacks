# UofTHacks

whosface

What originally started as a high-tech facial recognition software, turned into a social media platform based on image recognition. We allow users to search by image for people, and return our Clarifai model's best match alongside the most relevant social information about the people. We include links to major social media applications, sentiment analysis (credit to https://github.com/tash-had/internet-thoughts), and custom spotify integration (search for Donald Trump if you like the Imperial Death March. 

Users can upload images of themselves, and train our Clarifai to recognize them, just as we've trained it to recognize a sample three people. The user's information would then be added to our database of 'concepts' and accessible when others try to search for them.

We had planned on using this web application to get information about our fellow hackers, and avoid that awkward scenario of "hey, have I met you before?". By running their image through our app, we would have more information about them, and therefore a higher chance of recognizing them.

In the future, we'd like to implement our app with VR and AR to dynamically search for content, and show results in something like the Google Glass in real time. We'd also like to expand our database of images, but that is heavily  dependent on Clarifai giving us more free usage (subtle hint to Clarifai if they ever read this).

Deployed on AWS, and written in JavaScript, Python by four first year students who had little to no experience with anything used this weekend; whosface.com is more than just a semi-permanent reminder of how bad our spelling gets at three in the morning, it is a triumph.
