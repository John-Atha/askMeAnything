# generates the sql insertions for 50 users

import random
import hashlib
import string
import os
from datetime import datetime

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

def birthDateGen():
    year = random.randrange(1980, 2003)
    month = random.randrange(1, 13)
    day = random.randrange(1, 29)
    return str(datetime(year, month, day))[:-9]

def dateGen():
    year = random.randrange(2020, 2022)
    if year==2020:
        month = random.randrange(1, 13)
        day = random.randrange(1, 29)
    else:
        month = random.randrange(1, 6)
        day = random.randrange(1, 29)  
    return str(datetime(year, month, day))[:-9]

prefix = "INSERT INTO public.\"User\"(username, email, password, date_of_birth, github_username, first_name, last_name, member_since) VALUES("

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
    birthDate = birthDateGen()
    date = dateGen()
    out1 = f"{prefix}'{username}', '{email}', '{password}', '{birthDate}', '{github}', '{first}', '{last}', '{date}');\n"
    out2 = f"{prefix}'{username}', '{email}', '{passwordHashed}', '{birthDate}', '{github}', '{first}', '{last}', '{date}');\n"
    f.write(out1)
    f2.write(out2)