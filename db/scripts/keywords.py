import os

prefix = "INSERT INTO public.\"keyword\"(name) VALUES("
keys = ["Django", "Spring boot", "Express js", "Node js", "Laravel",
        "Python", "c++", "algorithms", "data structures", "sql", 
        "databases", "postgres", "heroku", "vscode", "webstorm"
        "web developing", "html", "css", "vanilla js", "react", 
        "angular", "react-native", "vue", "flutter", "selenium"]

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/keywords.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

for key in keys:
    f.write(prefix+"'"+key+"');\n")