import sys
import random

dice1 = [1, 2, 3, 4, 5, 6]
dice2 = [1, 2, 3, 4, 5, 6]

result = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
    }

for i in xrange(int(sys.argv[1])):
    result[random.choice(dice1) + random.choice(dice2)] += 1

print result

for k, v in result.items():
    print str(k) + "\t" + str(v) + "\t" + "#" * int(v/100)
    #print str(k) + "\t" + str(v)
