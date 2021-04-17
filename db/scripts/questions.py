import os
import random

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

def dateTimeGen():
    if random.randrange(10)>6:
        year = "2020"
        month = str(random.randrange(1, 13))
        day = str(random.randrange(1, 29))
        if int(month)<10:
            month="0"+month
        if int(day)<10:
            day = "0"+day
    else:
        year = "2021"
        month = "0"+str(random.randrange(1, 6))
        day = str(random.randrange(1, 29))
        if int(day)<10:
            day = "0"+day   
    hour = random.randrange(0, 24)
    if hour<10:
        hour = "0"+str(hour)
    mins = random.randrange(0, 60)
    if mins<10:
        mins="0"+str(mins)
    sec = random.randrange(0, 60)
    if sec<10:
        sec="0"+str(sec)        
    return year+"-"+month+"-"+day+" "+str(hour)+":"+str(mins)+":"+str(sec)

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
        user = random.randrange(1, 52)
        title = question["title"]
        text = question["question"]
        date = dateTimeGen()
        f.write(f"{prefix}{user}, '{title}', '{text}', '{date}');\n")

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
                
attachKeyWords()