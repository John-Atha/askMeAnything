# random datetime between two other: https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates

import random
import os
from datetime import datetime
from datetime import timedelta

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/answer_upvotes.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

users = [
    [1,	 "2021-04-19"],
    [2,	 "2020-10-08"],
    [3,	 "2020-04-20"],
    [4,	 "2021-01-15"],
    [5,	 "2020-11-05"],
    [6,	 "2021-02-01"],
    [7,	 "2021-01-19"],
    [8,	 "2020-12-18"],
    [9,	 "2021-01-04"],
    [10, "2021-03-07"],
    [11, "2020-05-08"],
    [12, "2020-07-04"],
    [13, "2021-05-28"],
    [14, "2021-04-20"],
    [15, "2021-05-18"],
    [16, "2020-06-27"],
    [17, "2020-02-15"],
    [18, "2021-05-02"],
    [19, "2021-02-17"],
    [20, "2020-04-11"],
    [21, "2021-02-18"],
    [22, "2021-01-01"],
    [23, "2020-09-13"],
    [24, "2020-02-13"],
    [25, "2021-05-26"],
    [26, "2021-03-06"],
    [27, "2021-04-09"],
    [28, "2020-12-03"],
    [29, "2020-11-07"],
    [30, "2021-03-28"],
    [31, "2020-11-12"],
    [32, "2021-05-28"],
    [33, "2020-04-17"],
    [34, "2020-02-16"],
    [35, "2021-03-28"],
    [36, "2021-02-16"],
    [37, "2021-02-28"],
    [38, "2021-05-13"],
    [39, "2021-01-19"],
    [40, "2021-01-02"],
    [41, "2020-09-15"],
    [42, "2021-04-12"],
    [43, "2020-03-15"],
    [44, "2021-05-11"],
    [45, "2020-12-25"],
    [46, "2020-10-09"],
    [47, "2020-04-11"],
    [48, "2021-04-11"],
    [49, "2020-10-17"]  ]

answers = [
    [1,	    "2021-05-05 08:57:51"],
    [2,	    "2021-06-13 02:35:14"],
    [3,	    "2020-09-14 14:10:02"],
    [4,	    "2021-06-26 23:52:43"],
    [5,	    "2021-03-14 13:34:10"],
    [6,	    "2021-05-23 05:23:09"],
    [7,	    "2021-06-03 11:39:47"],
    [8,	    "2021-06-17 21:40:00"],
    [9,	    "2021-04-10 01:39:01"],
    [10,	"2021-05-13 17:32:27"],
    [11,	"2021-06-29 11:37:38"],
    [12,	"2021-06-29 21:02:54"],
    [13,	"2021-05-17 15:04:30"],
    [14,	"2021-06-25 07:37:34"],
    [15,	"2021-01-29 22:13:35"],
    [16,	"2021-05-21 12:19:16"],
    [17,	"2021-03-01 13:24:54"],
    [18,	"2020-10-23 09:37:43"],
    [19,	"2021-06-20 18:03:59"],
    [20,	"2021-04-09 22:56:34"],
    [21,	"2021-06-23 21:44:29"],
    [22,	"2021-05-13 21:01:19"],
    [23,	"2021-06-11 19:54:58"],
    [24,	"2021-06-08 19:48:14"],
    [25,	"2021-05-24 11:21:46"],
    [26,	"2021-04-20 06:25:16"] ]

def dateTimeGen(datetim1, datetim2):
    datetim = max(datetim1, datetim2)
    date = datetim.split(' ')[0]
    time = datetim.split(' ')[1]
    dateparts = date.split('-')
    year = dateparts[0]
    month = dateparts[1]
    day = dateparts[2]
    timeparts = time.split(':')
    hours = timeparts[0]
    mins = timeparts[1]
    secs = timeparts[2]

    start = datetime(int(year), int(month), int(day), int(hours), int(mins), int(secs))
    end = datetime(2021, 6, 30, 22, 30, 30)
    delta = end-start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start+timedelta(seconds=random_second)

prefix = "INSERT INTO public.answerupvote(user_id, answer_id, date) VALUES("

for user in users:
    user_id = user[0]
    user_date = user[1]
    answers_up = random.sample(answers, random.randrange(1, 5))
    for answer in answers_up:
        answer_id = answer[0]
        answer_date = answer[1]
        date = dateTimeGen(answer_date, user_date+" 00:00:00")
        f.write(f"{prefix}{user_id}, {answer_id}, '{date}');\n")