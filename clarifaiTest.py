from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

app = ClarifaiApp("imzXb5rJLIb6sgPW_d-ju3uLz7BF79VnGqvGiMiA","iRorW20Xzhs9X1yhg9iaNIVIRYbo2BlAo5_6QJIc")

model = app.models.create(model_id="stuffID")
#model = app.models.get('stuffID')
#model.add_concepts(['cake'])
