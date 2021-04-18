import os
import random
from datetime import datetime
from datetime import timedelta

prefix1 = "INSERT INTO public.team(name) VALUES("
prefix2 = "INSERT INTO public.user_team(user_id, team_id, date) VALUES("
teams = [
    "thundercars",
    "decoders",
    "data pirates",
    "software chasers"
]
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

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/user_teams.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

def dateTimeGen(datetim):
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

for team in teams:
    f.write(f"{prefix1}'{team}');\n")

for user in users:
    user_id = user[0]
    user_date = user[1]
    if random.randrange(10)>7:
        teamSample = random.sample([1,2,3,4], 2)
        date = dateTimeGen(user_date+" 00:00:00")
        f.write(f"{prefix2}{user_id}, {teamSample[0]}, '{date}');\n")
        date = dateTimeGen(user_date+" 00:00:00")
        f.write(f"{prefix2}{user_id}, {teamSample[1]}, '{date}');\n")
    else:   
        team = random.randrange(1, 5)
        date = dateTimeGen(user_date+" 00:00:00")
        f.write(f"{prefix2}{user_id}, {team}, '{date}');\n")


