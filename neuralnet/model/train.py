#!./env/bin/python3

import numpy as np
from keras.models import Sequential
from keras.layers import Dense
import csv
from statistics import mean, stdev

print("Reading csv into memory...")
ntin = []
ntout = []

with open('/Users/cameron/Downloads/nn-input-data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        if(len(row) != 11):
            print("BAD: ", row)
        else:
            ntin.append([0 if col == '' else col for col in row[1:7]])
            ntout.append([0 if col == '' else col for col in row[7:]])

print("Loaded ", len(ntin), " rows and ", len(ntin[0]), " input cols")

print("Converting data to float...")
ntin = [list(map(float, row)) for row in ntin ]

print("Centering data...")
col_means = list(map(mean, zip(*ntin)))
col_stds = list(map(stdev, zip(*ntin)))

print("Col means:", col_means)
print("Col stddevs:", col_stds)
ntin = [[(cval-cmean)/dev for cval, cmean, dev in zip(row, col_means,col_stds)] for row in ntin]

print("Extending input data to last few days...")
tothb= 8
extdat=[]
for i, row in enumerate(ntin):
    extrow=[]
    for curhb in range(1, tothb):
        extrow.extend(ntin[i - curhb])
    extrow.extend(row)
    extdat.append(extrow)
ntin = extdat

for inr, outr in zip(ntin, ntout):
    print("Inputs: ", inr, " Outputs: ", outr)

# split into input (X) and output (y) variables
#X = dataset[:,0:8]
#y = dataset[:,8]
# define the keras model
model = Sequential()
model.add(Dense(50, input_dim=6*tothb, activation='relu'))
model.add(Dense(30, activation='relu'))
model.add(Dense(10, activation='relu'))
model.add(Dense(4, activation='relu'))
# compile the keras model
model.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])
# fit the keras model on the dataset
model.fit(ntin, ntout, epochs=1000, batch_size=100)
# evaluate the keras mode
_, accuracy = model.evaluate(ntin[], ntout)
print('Accuracy: %.2f' % (accuracy*100))