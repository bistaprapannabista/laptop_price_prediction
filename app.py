import pickle
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import numpy as np
import stats
from stats import lr_r2_score, dt_r2_score, svm_r2_score
from stats import lr_mae, dt_mae, svm_mae
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key' 
db = SQLAlchemy(app)
jwt = JWTManager(app)

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
    touchscreen = make_json(list(set(df["Touchscreen"])))
    ips = make_json(list(set(df["Ips"])))
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

        output = [
                {"name":"Linear Regression","MAE":lr_mae,"R2 Score": lr_r2_score,"price": np.exp(pipe_lr.predict(query))[0]},
                {"name":"Decision Tree","MAE":dt_mae,"R2 Score": dt_r2_score,"price":np.exp(pipe_dt.predict(query))[0]},
                {"name":"SVM","MAE":svm_mae, "R2 Score": svm_r2_score,"price": np.exp(pipe_svm.predict(query))[0]}
        ]

        return {"data":output}

@app.route("/")
@jwt_required()
def home():
    return "Homepage"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Please provide username, email, and password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Please provide email and password'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token,'message':'Login successfully done.'}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'Access granted, this is a protected endpoint'}), 200
    
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)