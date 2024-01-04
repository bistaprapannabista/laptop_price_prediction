import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import numpy as np

df = pickle.load(open('df.pkl','rb'))

X = df.drop(columns=["Price"])
y = np.log(df["Price"])

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=2)

pipe_lr = pickle.load(open('pipe_lr.pkl','rb'))
pipe_dt = pickle.load(open('pipe_dt.pkl','rb'))
pipe_rf = pickle.load(open('pipe_rf.pkl','rb'))
pipe_svm = pickle.load(open('pipe_svm.pkl','rb'))
pipe_knn = pickle.load(open('pipe_knn.pkl','rb'))


pipe_lr.fit(X_train,y_train)
y_pred = pipe_lr.predict(X_test)
lr_r2_score, lr_mae = r2_score(y_test,y_pred),mean_absolute_error(y_test,y_pred)

pipe_dt.fit(X_train,y_train)
y_pred = pipe_dt.predict(X_test)
dt_r2_score, dt_mae = r2_score(y_test,y_pred),mean_absolute_error(y_test,y_pred)

pipe_rf.fit(X_train,y_train)
y_pred = pipe_rf.predict(X_test)
rf_r2_score, rf_mae = r2_score(y_test,y_pred),mean_absolute_error(y_test,y_pred)


pipe_svm.fit(X_train,y_train)
y_pred = pipe_svm.predict(X_test)
svm_r2_score, svm_mae = r2_score(y_test,y_pred),mean_absolute_error(y_test,y_pred)


pipe_knn.fit(X_train,y_train)
y_pred = pipe_knn.predict(X_test)
knn_r2_score, knn_mae = r2_score(y_test,y_pred),mean_absolute_error(y_test,y_pred)
