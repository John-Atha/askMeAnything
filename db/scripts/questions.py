# random datetime between two other: https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates

import random
import os
from datetime import datetime
from datetime import timedelta

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

questions = []

def makeQuestions1(questions):
    prefix1 = "What is the fastest way to "
    actions1 = ["insert", "delete", "update", "read"]
    middle1 = " data in "
    techs1 = ["sql", "postgresql", "mongodb", "relational databases", "non-relational databases", "Django", "Spring boot", "Laravel"]
    for action in actions1:
        for tech in techs1:
            questions.append({
                "question": prefix1+action+middle1+tech+"?",
                "title": f"{action} in {tech}",
                "keywords": [tech, "databases"],
                })

def makeQuestions2(questions):
    prefix2 = "How can I implement "
    actions2 = ["an array", "a linked list", "a queue", "a priority queue", "a stack", "a graph", "a tree", "a set", "a dictionary", "a min heap", "a max heap"]
    middle2 = " in "
    techs2 = ["c++", "Python", "javascript", "java", "swipl"]
    for action in actions2:
        for tech in techs2:
            questions.append({
                "question": prefix2+action+middle2+tech+"?",
                "title": f"{action} in {tech}",
                "keywords": [tech, "algorithms", "data structures"],
            })

def makeQuestions3(questions):
    prefix3 = "How can I "
    actions3 = ["center text", "change background color", "create a form", "add dark mode", "add animation"]
    middle3 = " with "
    techs3 = ["html", "css", "javascript", "react", "angular"] 
    for action in actions3:
        for tech in techs3:
            questions.append({
                "question": prefix3+action+middle3+tech+"?",
                "title": f"{action} in {tech}",
                "keywords": [tech, "web developing"],
            })

def makeQuestions4(questions):
    prefix4 = "How can I "
    actions4 = ["change background", "install vscode", "delete a directory", "rename a directory", "download chrome", "keep a backup", "switch language"]
    middle4 = " in "
    techs4 = ["ubuntu", "linux", "windows"]
    for action in actions4:
        for tech in techs4:
            questions.append({
                "question": prefix4+action+middle4+tech+"?",
                "title": f"{action} in {tech}",
                "keywords": [tech],
            })

def dateTimeGen(datetim):
    date = datetim.split(' ')[0]
    dateparts = date.split('-')
    year = dateparts[0]
    month = dateparts[1]
    day = dateparts[2]

    start = datetime(int(year), int(month), int(day), 0, 0, 0)
    end = datetime(2021, 6, 30, 22, 30, 30)
    delta = end-start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start+timedelta(seconds=random_second)

makeQuestions1(questions)
makeQuestions2(questions)
makeQuestions3(questions)
makeQuestions4(questions)

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/questions.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename2 = os.path.join(fileDir, '../sql/question_keywords.sql')
filename2 = os.path.abspath(os.path.realpath(filename2))
f2 = open(filename2, "a", encoding='utf-8')

def insertQuestions():
    prefix = "INSERT INTO public.\"question\"(user_id, title, text, date) VALUES("
    for question in questions:
        user = random.choice(users)
        title = question["title"]
        text = question["question"]
        date = dateTimeGen(user[1])
        f.write(f"{prefix}{user[0]}, '{title}', '{text}', '{date}');\n")

def attachKeyWords():
    prefix = "INSERT INTO public.\"question_keyword\"(question_id, keyword_id) VALUES("
    keys = ["Django", "Spring boot", "Express js", "Node js", "Laravel",
        "Python", "c++", "algorithms", "data structures", "sql", 
        "databases", "postgres", "heroku", "vscode", "webstorm"
        "web developing", "html", "css", "vanilla js", "react", 
        "angular", "react-native", "vue", "flutter", "selenium",
        "ubuntu", "linux", "windows"]
    for i in range(len(questions)):
        questId = i+1
        keywords = questions[i]["keywords"]
        for key in keys:
            if key in keywords:
                f2.write(f"{prefix}{questId}, {keys.index(key)+1});\n")

insertQuestions()               
attachKeyWords()