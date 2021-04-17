# generates the sql insertions for 50 users

import random
import hashlib
import string
import os

firstNames = ["John", "George", "Dora", "Thaleia", "Andrew", 
              "Thanos", "Antony", "Emily", "Nantia", "Penelope",
              "Steve", "Spyros", "Stamatis", "Leonidas", "Dimitris",
              "Panagiotis", "Peter", "Kyriakh", "Dimitra", "Harry"]

lastNames = ["Ingram","Whitehead","Zamora","Myers","Huff","Mcclure",
             "Hogan","Boyer","Benitez","Cooper","Schmitt","Parker",
             "Faulkner","Kirk","Blackwell","Allen","Simon","Kim",
             "Kirk","Arellano","Gill","Morse","Mayer","Maxwell",
             "Woods","Mullen","Pruitt","Henderson","Murphy"]

def OnePassGen():
    letters = list(string.ascii_letters)
    digits = list(string.digits)
    symbols = ["!", "@", "#", "$", "_"]
    all = letters * 4 + digits  * 4 + symbols
    passw = ""
    for i in range(random.randrange(10, 15)):
        passw+=random.choice(all)
    return passw

def oneEmailGen(name):
    orgs = ["@gmail.com", "@yahoo.com", "@mail.com", "@windowslive.com"]
    return name+str(random.randrange(1, 100))+random.choice(orgs)

def oneUsernameGen(firstName, lastName):
    return firstName+random.choice([".", "_"])+lastName[:random.randrange(2, 5)]

def hash(passw):
    return hashlib.md5(passw.encode('utf8')).hexdigest()

def githubGen(firstName, lastName):
    return firstName+"-"+lastName[:random.randrange(2, 5)]    

def dateGen():
    year = str(random.randrange(1980, 2003))
    month = str(random.randrange(1, 13))
    day = str(random.randrange(1, 29))
    if int(month)<10:
        month="0"+month
    if int(day)<10:
        day = "0"+day    
    return year+"-"+month+"-"+day

prefix = "INSERT INTO public.\"User\"(username, email, password, date_of_birth, github_username, first_name, last_name) VALUES("

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/users.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

filename2 = os.path.join(fileDir, '../sql/usersHashed.sql')
filename2 = os.path.abspath(os.path.realpath(filename2))
f2 = open(filename2, "a", encoding='utf-8')

for i in range(50):
    first = random.choice(firstNames)
    last = random.choice(lastNames)
    password = OnePassGen()
    passwordHashed = hash(OnePassGen())
    email = oneEmailGen(first)
    username = oneUsernameGen(first, last)
    github = githubGen(first, last)
    date = dateGen()
    out1 = f"{prefix}'{username}', '{email}', '{password}', '{date}', '{github}', '{first}', '{last}');\n"
    out2 = f"{prefix}'{username}', '{email}', '{passwordHashed}', '{date}', '{github}', '{first}', '{last}');\n"
    f.write(out1)
    f2.write(out2)