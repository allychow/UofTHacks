from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

app = ClarifaiApp("ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl","hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H")

#model = app.models.get('color', model_type='color')

image2 = ClImage(url='https://samples.clarifai.com/wedding.jpg')

#model.predict([image2])
#app.inputs.create_image_from_url(url='https://samples.clarifai.com/puppy.jpeg', concepts=['my puppy'])
#app.inputs.create_image_from_url(url='https://samples.clarifai.com/wedding.jpg', not_concepts=['my puppy'])
model = app.models.create(model_id="yay", concepts=["my puppy"])
model.train()
