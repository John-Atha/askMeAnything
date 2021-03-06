# random datetime between two other: https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates

import os
import random
from datetime import datetime
from datetime import timedelta

questions_keywords = [
    [1,	    10,	"2020-07-31 07:12:53"],
    [1,	    11,	"2020-07-31 07:12:53"],
    [2,	    11,	"2021-01-26 08:34:15"],
    [3,	    11,	"2021-03-11 23:30:13"],
    [4,	    11,	"2021-04-20 00:43:03"],
    [5,	    11,	"2021-05-23 13:32:22"],
    [6,	    1,	"2021-03-17 15:29:03"],
    [6,	    11,	"2021-03-17 15:29:03"],
    [7,	    2,	"2021-04-21 10:08:20"],
    [7,	    11,	"2021-04-21 10:08:20"],
    [8,	    5,	"2021-05-04 17:03:58"],
    [8,	    11,	"2021-05-04 17:03:58"],
    [9,	    10,	"2021-01-18 07:19:04"],
    [9,	    11,	"2021-01-18 07:19:04"],
    [11,	11,	"2021-05-12 01:52:33"],
    [10,	11,	"2021-03-22 08:15:52"],
    [12,	11,	"2021-06-16 06:25:36"],
    [13,	11,	"2020-10-21 02:47:06"],
    [14,	1,	"2021-06-07 14:21:40"],
    [14,	11,	"2021-06-07 14:21:40"],
    [15,	2,	"2021-02-25 11:40:20"],
    [15,	11,	"2021-02-25 11:40:20"],
    [16,	5,	"2021-06-20 01:50:54"],
    [16,	11,	"2021-06-20 01:50:54"],
    [17,	10,	"2021-05-05 20:30:20"],
    [17,	11,	"2021-05-05 20:30:20"],
    [18,	11,	"2021-02-17 03:40:36"],
    [19,	11,	"2021-06-05 14:15:37"],
    [20,	11,	"2021-05-27 19:11:05"],
    [21,	11,	"2021-05-02 09:27:03"],
    [22,	1,	"2020-07-02 06:51:08"],
    [22,	11,	"2020-07-02 06:51:08"],
    [23,	2,	"2021-05-12 16:50:53"],
    [23,	11,	"2021-05-12 16:50:53"],
    [24,	5,	"2020-11-14 16:00:59"],
    [24,	11,	"2020-11-14 16:00:59"],
    [25,	10,	"2021-06-19 18:30:44"],
    [25,	11,	"2021-06-19 18:30:44"],
    [26,	11,	"2021-05-14 04:54:13"],
    [27,	11,	"2020-12-15 20:29:29"],
    [28,	11,	"2021-05-27 05:37:01"],
    [29,	11,	"2021-04-24 21:21:38"],
    [30,	1,	"2021-06-23 15:55:57"],
    [30,	11,	"2021-06-23 15:55:57"],
    [31,	2,	"2021-06-06 09:59:15"],
    [31,	11,	"2021-06-06 09:59:15"],
    [32,	5,	"2020-11-17 07:29:56"],
    [32,	11,	"2020-11-17 07:29:56"],
    [33,	7,	"2020-09-23 04:18:58"],
    [33,	8,	"2020-09-23 04:18:58"],
    [33,	9,	"2020-09-23 04:18:58"],
    [34,	6,	"2021-05-21 00:32:49"],
    [34,	8,	"2021-05-21 00:32:49"],
    [34,	9,	"2021-05-21 00:32:49"],
    [35,	8,	"2021-04-02 08:22:16"],
    [35,	9,	"2021-04-02 08:22:16"],
    [36,	8,	"2021-05-16 21:53:43"],
    [36,	9,	"2021-05-16 21:53:43"],
    [37,	8,	"2021-03-16 19:35:33"],
    [37,	9,	"2021-03-16 19:35:33"],
    [38,	7,	"2020-05-30 15:14:52"],
    [38,	8,	"2020-05-30 15:14:52"],
    [38,	9,	"2020-05-30 15:14:52"],
    [39,	6,	"2021-06-07 18:02:39"],
    [39,	8,	"2021-06-07 18:02:39"],
    [39,	9,	"2021-06-07 18:02:39"],
    [40,	8,	"2021-06-24 11:25:23"],
    [40,	9,	"2021-06-24 11:25:23"],
    [41,	8,	"2021-03-17 02:40:08"],
    [41,	9,	"2021-03-17 02:40:08"],
    [42,	8,	"2021-06-29 15:36:42"],
    [42,	9,	"2021-06-29 15:36:42"],
    [43,	7,	"2021-04-05 05:56:26"],
    [43,	8,	"2021-04-05 05:56:26"],
    [43,	9,	"2021-04-05 05:56:26"],
    [44,	6,	"2021-03-23 01:45:41"],
    [44,	8,	"2021-03-23 01:45:41"],
    [44,	9,	"2021-03-23 01:45:41"],
    [45,	8,	"2021-04-26 22:52:01"],
    [45,	9,	"2021-04-26 22:52:01"],
    [46,	8,	"2020-12-31 13:09:55"],
    [46,	9,	"2020-12-31 13:09:55"],
    [47,	8,	"2021-02-03 23:17:19"],
    [47,	9,	"2021-02-03 23:17:19"],
    [48,	7,	"2021-06-04 07:26:07"],
    [48,	8,	"2021-06-04 07:26:07"],
    [48,	9,	"2021-06-04 07:26:07"],
    [49,	6,	"2021-06-27 06:36:31"],
    [49,	8,	"2021-06-27 06:36:31"],
    [49,	9,	"2021-06-27 06:36:31"],
    [50,	8,	"2021-06-19 06:32:33"],
    [50,	9,	"2021-06-19 06:32:33"],
    [51,	8,	"2021-06-24 07:42:10"],
    [51,	9,	"2021-06-24 07:42:10"],
    [52,	8,	"2021-01-21 12:04:38"],
    [52,	9,	"2021-01-21 12:04:38"],
    [53,	7,	"2021-02-20 23:38:54"],
    [53,	8,	"2021-02-20 23:38:54"],
    [53,	9,	"2021-02-20 23:38:54"],
    [54,	6,	"2021-05-21 23:39:07"],
    [54,	8,	"2021-05-21 23:39:07"],
    [54,	9,	"2021-05-21 23:39:07"],
    [55,	8,	"2021-05-14 15:17:55"],
    [55,	9,	"2021-05-14 15:17:55"],
    [56,	8,	"2021-05-04 19:47:18"],
    [56,	9,	"2021-05-04 19:47:18"],
    [57,	8,	"2021-02-17 13:24:32"],
    [57,	9,	"2021-02-17 13:24:32"],
    [58,	7,	"2020-12-18 21:44:42"],
    [58,	8,	"2020-12-18 21:44:42"],
    [58,	9,	"2020-12-18 21:44:42"],
    [59,	6,	"2021-05-14 06:59:49"],
    [59,	8,	"2021-05-14 06:59:49"],
    [59,	9,	"2021-05-14 06:59:49"],
    [60,	8,	"2021-05-11 16:42:33"],
    [60,	9,	"2021-05-11 16:42:33"],
    [61,	8,	"2021-04-16 09:48:56"],
    [61,	9,	"2021-04-16 09:48:56"],
    [62,	8,	"2021-04-29 10:52:47"],
    [62,	9,	"2021-04-29 10:52:47"],
    [63,	7,	"2021-02-02 04:17:53"],
    [63,	8,	"2021-02-02 04:17:53"],
    [63,	9,	"2021-02-02 04:17:53"],
    [64,	6,	"2020-09-27 05:36:34"],
    [64,	8,	"2020-09-27 05:36:34"],
    [64,	9,	"2020-09-27 05:36:34"],
    [65,	8,	"2021-02-19 07:00:29"],
    [65,	9,	"2021-02-19 07:00:29"],
    [66,	8,	"2021-03-03 16:33:30"],
    [66,	9,	"2021-03-03 16:33:30"],
    [67,	8,	"2021-06-27 03:52:00"],
    [67,	9,	"2021-06-27 03:52:00"],
    [68,	7,	"2021-05-02 04:12:01"],
    [68,	8,	"2021-05-02 04:12:01"],
    [68,	9,	"2021-05-02 04:12:01"],
    [69,	6,	"2021-04-01 00:09:30"],
    [69,	8,	"2021-04-01 00:09:30"],
    [69,	9,	"2021-04-01 00:09:30"],
    [70,	8,	"2021-02-21 10:58:07"],
    [70,	9,	"2021-02-21 10:58:07"],
    [71,	8,	"2021-06-02 15:09:43"],
    [71,	9,	"2021-06-02 15:09:43"],
    [72,	8,	"2021-06-30 15:56:43"],
    [72,	9,	"2021-06-30 15:56:43"],
    [73,	7,	"2021-06-22 05:03:43"],
    [73,	8,	"2021-06-22 05:03:43"],
    [73,	9,	"2021-06-22 05:03:43"],
    [74,	6,	"2021-05-09 17:09:20"],
    [74,	8,	"2021-05-09 17:09:20"],
    [74,	9,	"2021-05-09 17:09:20"],
    [75,	8,	"2020-12-15 13:54:43"],
    [75,	9,	"2020-12-15 13:54:43"],
    [76,	8,	"2021-05-24 22:44:23"],
    [76,	9,	"2021-05-24 22:44:23"],
    [77,	8,	"2021-02-05 07:56:12"],
    [77,	9,	"2021-02-05 07:56:12"],
    [78,	7,	"2021-05-19 02:31:44"],
    [78,	8,	"2021-05-19 02:31:44"],
    [78,	9,	"2021-05-19 02:31:44"],
    [79,	6,	"2021-03-23 18:25:51"],
    [79,	8,	"2021-03-23 18:25:51"],
    [79,	9,	"2021-03-23 18:25:51"],
    [80,	8,	"2021-05-18 19:04:59"],
    [80,	9,	"2021-05-18 19:04:59"],
    [81,	8,	"2021-05-15 07:44:36"],
    [81,	9,	"2021-05-15 07:44:36"],
    [82,	8,	"2020-09-15 09:25:44"],
    [82,	9,	"2020-09-15 09:25:44"],
    [83,	7,	"2021-05-08 06:20:04"],
    [83,	8,	"2021-05-08 06:20:04"],
    [83,	9,	"2021-05-08 06:20:04"],
    [84,	6,	"2021-04-15 17:00:31"],
    [84,	8,	"2021-04-15 17:00:31"],
    [84,	9,	"2021-04-15 17:00:31"],
    [85,	8,	"2021-05-25 13:16:30"],
    [85,	9,	"2021-05-25 13:16:30"],
    [86,	8,	"2021-03-19 02:05:59"],
    [86,	9,	"2021-03-19 02:05:59"],
    [87,	8,	"2020-11-28 16:25:01"],
    [87,	9,	"2020-11-28 16:25:01"],
    [88,	16,	"2021-05-17 10:54:20"],
    [89,	17,	"2021-04-01 22:41:17"],
    [91,	19,	"2021-04-09 07:27:10"],
    [92,	20,	"2021-06-14 19:02:29"],
    [93,	16,	"2021-04-04 18:03:17"],
    [94,	17,	"2021-04-20 12:24:15"],
    [96,	19,	"2020-08-05 02:28:22"],
    [97,	20,	"2021-05-26 19:08:38"],
    [98,	16,	"2021-01-03 18:19:25"],
    [99,	17,	"2021-05-24 02:18:17"],
    [101,	19,	"2020-11-09 20:12:13"],
    [102,	20,	"2021-06-13 16:05:39"],
    [103,	16,	"2021-04-17 01:23:52"],
    [104,	17,	"2021-06-15 01:09:53"],
    [106,	19,	"2020-07-21 03:32:35"],
    [107,	20,	"2021-05-30 11:30:20"],
    [108,	16,	"2021-06-07 02:08:08"],
    [109,	17,	"2021-02-28 09:07:33"],
    [111,	19,	"2021-06-22 19:56:32"],
    [112,	20,	"2020-10-03 22:33:25"],
    [113,	25,	"2021-05-18 18:18:47"],
    [114,	26,	"2021-05-01 23:59:20"],
    [115,	27,	"2021-02-05 22:32:13"],
    [116,	25,	"2021-05-19 08:13:08"],
    [117,	26,	"2021-04-19 12:49:07"],
    [118,	27,	"2021-06-29 07:37:55"],
    [119,	25,	"2021-06-17 09:57:15"],
    [120,	26,	"2021-04-24 12:32:41"],
    [121,	27,	"2021-05-10 04:14:46"],
    [122,	25,	"2021-01-30 08:12:25"],
    [123,	26,	"2021-06-11 12:13:37"],
    [124,	27,	"2020-09-01 00:06:23"],
    [125,	25,	"2021-02-25 15:50:09"],
    [126,	26,	"2021-01-31 09:35:58"],
    [127,	27,	"2021-01-29 08:15:48"],
    [128,	25,	"2021-04-15 07:50:42"],
    [129,	26,	"2021-06-04 04:47:25"],
    [130,	27,	"2021-05-31 00:41:45"],
    [131,	25,	"2021-06-24 12:10:07"],
    [132,	26,	"2021-06-23 01:02:54"],
    [133,	27,	"2021-01-28 23:51:35"]  ]

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

fileDir = os.path.dirname(os.path.realpath('__file__'))
filename = os.path.join(fileDir, '../sql/answers.sql')
filename = os.path.abspath(os.path.realpath(filename))
f = open(filename, "a", encoding='utf-8')

prefix = "INSERT INTO public.\"answer\" (user_id, question_id, text, date) VALUES("

for el in questions_keywords:
    if el[1]==1:
        user_id = random.randrange(1, 50)
        question_id = el[0]
        text = "Check out this link: https://docs.djangoproject.com/en/3.1/topics/db/queries/"
        date = dateTimeGen(el[2])
        f.write(f"{prefix}{user_id}, {question_id}, '{text}', '{date}');\n")
    elif el[1]==6:
        user_id = random.randrange(1, 50)
        question_id = el[0]
        text = "Check out this link: https://docs.python.org/3/"
        date = dateTimeGen(el[2])
        f.write(f"{prefix}{user_id}, {question_id}, '{text}', '{date}');\n")
    elif el[1]==7:
        user_id = random.randrange(1, 50)
        question_id = el[0]
        text = "Check out this link: https://devdocs.io/cpp/"
        date = dateTimeGen(el[2])
        f.write(f"{prefix}{user_id}, {question_id}, '{text}', '{date}');\n")