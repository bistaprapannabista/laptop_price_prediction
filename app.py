import pickle
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import numpy as np
import stats
from stats import lr_r2_score, dt_r2_score, rf_r2_score, svm_r2_score, knn_r2_score
from stats import lr_mae, dt_mae, rf_mae, svm_mae, knn_mae

app = Flask(__name__)
CORS(app)

pipe = pickle.load(open('pipe.pkl','rb'))
pipe_lr = pickle.load(open('pipe_lr.pkl','rb'))
pipe_dt = pickle.load(open('pipe_dt.pkl','rb'))
pipe_rf = pickle.load(open('pipe_rf.pkl','rb'))
pipe_svm = pickle.load(open('pipe_svm.pkl','rb'))
pipe_knn = pickle.load(open('pipe_knn.pkl','rb'))

df = pickle.load(open('df.pkl','rb'))  

def make_json(arr):
    new_arr = []
    for item in arr:
        new_arr.append({"label":item,"value":item})
    return new_arr

@app.route("/api/options")
def options():
    company = make_json(list(set(df['Company'])))
    type = make_json(list(set(df["TypeName"])))
    ram = make_json(list(set(df["Ram"])))
    # weight = df["Weight"].unique()
    touchscreen = make_json(list(set(df["Touchscreen"])))
    ips = make_json(list(set(df["Ips"])))
    # screen_size = [11.6,12,13.3,14,15.6,17]
    resolution = make_json(['1920x1080','1366x768','1600x900','3840x2160','3200x1800','2880x1800','2560x1600','2560x1440','2304x1440'])
    cpu = make_json(list(set(df['Cpu brand'])))
    hdd = make_json(list(set(df["HDD"])))
    sdd = make_json(list(set(df["SSD"])))
    gpu = make_json(list(set(df["Gpu brand"])))
    os =make_json(list(set( df["os"])))

    data = {
        "company":company,
        "type":type,
        "ram":ram,
        "tocuhscreen":touchscreen,
        "ips":ips,
        "resolution":resolution,
        "cpu":cpu,
        "hdd":hdd,
        "sdd":sdd,
        "gpu":gpu,
        "os":os
    }
    return jsonify(data)

@app.route("/api/predict-price",methods=['POST'])
def predict():
    if request.method == "POST":
        data = request.get_json()
        company = data['company']
        cpu =  data['cpu']
        gpu = data['gpu']
        hdd = data['hdd']
        ips = data['ips']
        os = data['os']
        ram = data['ram']
        resolution = data['resolution']
        screen_size = data['screen_size']
        ssd = data['ssd']
        touchscreen = data['touchscreen']
        type = data['type']
        weight = data['weight']
        x_res = int(resolution.split('x')[0])
        y_res = int(resolution.split('x')[1])
        ppi = (x_res**2+y_res**2)**0.5/float(screen_size)
        query = np.array([company,type,ram,weight,touchscreen,ips,ppi,cpu,hdd,ssd,gpu,os],dtype=object)
        query = query.reshape(1,12)

        output = {
            "linear_regression":{"price":np.exp(pipe_lr.predict(query))[0],"r2_score":lr_r2_score,"mae":lr_mae},
            "decision_tree":{"price":np.exp(pipe_dt.predict(query))[0],"r2_score":dt_r2_score,"mae":dt_mae},
            "random_forest":{"price":np.exp(pipe_rf.predict(query))[0],"r2_score":rf_r2_score,"mae":rf_mae},
            "support_vector_machine":{"price":np.exp(pipe_svm.predict(query))[0],"r2_score":svm_r2_score,"mae":svm_mae},
            "k_nearest":{"price":np.exp(pipe_knn.predict(query))[0],"r2_score":knn_r2_score,"mae":knn_mae},
        }

        return {"data":output}

@app.route("/")
def home():
    return "Homepage"

if __name__ == '__main__':
    app.run(debug=True)