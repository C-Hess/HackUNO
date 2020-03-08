#!./env/bin/python3

import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import SGD
from keras import regularizers
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
ntout = [list(map(float, row)) for row in ntout ]

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

print("Creating out index..." )

ntout = [[sum(row)] for row in ntout]

print("Biasing training data...")
combineout = []
combinein = []
last_was_accident = False
for inar, outar in zip(ntin, ntout):
    if not last_was_accident:
        # We want one with accident
        if sum(outar) > 0:
            combinein.append(inar)
            combineout.append(outar)
            last_was_accident = True
    else:
        if sum(outar) == 0:
            combinein.append(inar)
            combineout.append(outar)
            last_was_accident = False

# Split training-testing sets
trainend_ind = round(0.8 * len(combinein))
trainin = combinein[:trainend_ind]
trainout = combineout[:trainend_ind]
testin = combinein[trainend_ind:]
testout = combineout[trainend_ind:]

# split into input (X) and output (y) variables
#X = dataset[:,0:8]
#y = dataset[:,8]
# define the keras model
model = Sequential()
model.add(Dense(tothb*16, input_dim=6*tothb, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
model.add(Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
model.add(Dense(32, activation='relu'))
model.add(Dense(1, activation='relu'))
# compile the keras model
model.compile(loss='mean_squared_error', metrics=['accuracy'], optimizer="adamax")
# fit the keras model on the dataset
model.fit(np.array(combinein), np.array(combineout), epochs=10, batch_size=5, verbose=1, validation_split=0.1)
# evaluate the keras mode
_, accuracy = model.evaluate(np.array(testin), np.array(testout))
print('Accuracy: %.2f' % (accuracy*100))

print("NN Out: ", model.predict(np.array(testin[0:5])), " Actual out: ", testout[0:5])