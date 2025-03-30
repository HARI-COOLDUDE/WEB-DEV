from fastapi import FastAPI
import joblib
import numpy as np

model=joblib.load('loan/src/api/model.pkl')

class_names=np.array(['Loan type','Amount','Aadhar',"PAN",'Annual Income','Tenure'])

app=FastAPI()

@app.get('/')
def reed_root():
    return {'Message':'Iris Model API'}

@app.post('/predict')
def predict (data:dict):
    features=np.array(data[features].reshape(1,-1))
    prediction = model.predict(features)
    class_name=class_names[prediction][0]
    return{'predicted_class':class_name}


