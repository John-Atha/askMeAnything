import random
import os

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/user_keywords.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

prefix = "INSERT INTO public.\"user_keyword\"(user_id, keyword_id) VALUES("
for user_id in range(1, 52):
    keys = [i for i in range(1,27)]
    key1 = random.choice(keys)
    keys.remove(key1)
    key2 = random.choice(keys)
    f.write(f"{prefix}{str(user_id)}, {str(key1)});\n")
    f.write(f"{prefix}{str(user_id)}, {str(key2)});\n")