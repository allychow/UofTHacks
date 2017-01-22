from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

app = ClarifaiApp("ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl","hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H")

model = app.models.get('TRUMP')
image = ClImage(url='http://i2.kym-cdn.com/entries/icons/facebook/000/017/663/cheeto.jpg')
print(model.predict([image]))
