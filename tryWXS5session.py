import os
from flask import Flask, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
from flask import send_from_directory
#from werkzeug.utils import SharedDataMiddleware
from datetime import timedelta
from flask import make_response, current_app
from functools import update_wrapper
import json
from aip import AipSpeech
from chatterbot import ChatBot
import sqlite3
from time import gmtime, strftime
import http.client
import urllib
import imageio
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer
from chatterbot.comparisons import JaccardSimilarity
#from flask.ext.cors import CORS, cross_origin
from moviepy.editor import *
from moviepy.editor import VideoFileClip, concatenate_videoclips,AudioFileClip
import logging
import urllib.request
from pydub import AudioSegment
from time import gmtime, strftime



#database
sqlite_file = 'my_session_id_db2.sqlite'    # name of the sqlite database file
table_name = 'my_table_2'   # name of the table to be created
id_column = 'my_1st_column' # name of the PRIMARY KEY column
new_column1 = 'my_2nd_column'  # name of the new column
new_column2 = 'my_3nd_column'  # name of the new column
column_type = 'TEXT' # E.g., INTEGER, TEXT, NULL, REAL, BLOB
default_val = 'Hello World' # a default value for the new column rows
#second database
sqlite_file2 = 'my_second_db.sqlite'     # name of the sqlite database file
table_name3 = 'my_table_3'   # name of the table to be created
new_field = 'my_1st_column' # name of the column
field_type = 'INTEGER'  # column data type
new_field2 = 'my_2st_column'
#for session
mySessionID='test'


# Connecting to the database file
conn = sqlite3.connect(sqlite_file)
c = conn.cursor()

c.execute("UPDATE {tn} SET {cn}=(101) WHERE {idf}=('test')".\
        format(tn=table_name, cn=id_column, idf=new_column1))

c.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'.\
        format(coi=id_column, tn=table_name, cn=new_column1))
all_rows = c.fetchall()
#print('2):', all_rows)
print(all_rows[0][0])
conn.commit()
conn.close()

#connecting to second databse file
conn2 = sqlite3.connect(sqlite_file2)
c2 = conn2.cursor()
c2.execute("UPDATE {tn} SET {cn}=(0) WHERE {idf}=('test')".\
        format(tn=table_name3, cn=new_field, idf=new_field2))

c2.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'.\
        format(coi=new_field, tn=table_name3, cn=new_field2))
all2_rows = c2.fetchall()
#print('2):', all_rows)
print(all2_rows[0][0])
conn2.commit()
conn2.close()

#define first database update
def updateDb(ques, sessID):
    conn = sqlite3.connect(sqlite_file)
    c = conn.cursor()
    i = str(ques)

    sqlexe="UPDATE my_table_2 SET my_1st_column="+ i +" WHERE my_2nd_column=('"+sessID+"')"
    c.execute(sqlexe)

    sqlexe2='SELECT (my_1st_column) FROM my_table_2 WHERE my_2nd_column="'+sessID+'"'
    c.execute(sqlexe2)
    all_rows = c.fetchall()
    # print('2):', all_rows)
    print(all_rows[0][0])
    kValue=all_rows[0][0]
    conn.commit()
    conn.close()
    return kValue

#define second database update
def updateDb2(ques2):
    conn2 = sqlite3.connect(sqlite_file2)
    c2 = conn2.cursor()
    i=int(ques2)


    c2.execute("UPDATE {tn} SET {cn}={number} WHERE {idf}=('test')". \
              format(tn=table_name3, cn=new_field, number=i, idf=new_field2))

    c2.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'. \
              format(coi=new_field, tn=table_name3, cn=new_field2))
    all2_rows = c2.fetchall()
    # print('2):', all_rows)
    print(all2_rows[0][0])
    kValue2=all2_rows[0][0]
    conn2.commit()
    conn2.close()
    return kValue2



##################################################################


#define cross domain
def crossdomain(origin=None, methods=None, headers=None, max_age=21600,
                attach_to_all=True, automatic_options=True):
    """Decorator function that allows crossdomain requests.
      Courtesy of
      https://blog.skyred.fi/articles/better-crossdomain-snippet-for-flask.html
    """
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, list):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, list):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        """ Determines which methods are allowed
        """
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        """The decorator function
        """
        def wrapped_function(*args, **kwargs):
            """Caries out the actual cross domain code
            """
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] =  "http://127.0.0.1:5000/"
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

#end define cross domain

""" 你的 APPID AK SK """
APP_ID = '10580482'
API_KEY = 'xRpDVQIYTBi0SGOmeOLZDfGG'
SECRET_KEY = 'yESu2ScymbetbeUAkUsRlLFfwQg6kAGY'
client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


#chatbots ####################################################################################
#chatbot1 go anywhere
chatbot = ChatBot(
    "Test Bind",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="1dbn",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "sorry i didn't get you. Did you or didn't you go anywhere this chirstmas?"
        }
    ],
)

chatbot.read_only=True


#chatbot2 first time
chatbot2 = ChatBot(
    "first time",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="2dbn",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "sorry i didn't get you.  Is it or isn't it your fist time to go there?"
        }
    ],
)

chatbot2.read_only=True

#chatbot3 interesting people
chatbot3 = ChatBot(
    "Test bot 3",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="3dbn",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry I didn't get you.  Did you or didn't you see any interesting people there?"
        }
    ],
)

chatbot3.read_only=True

#chatbot4 homework
chatbot4 = ChatBot(
    "home work",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="4dbn",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry I didn't get you. Did you or didn't you finish your homework this holiday?"
        }
    ],
)
chatbot4.read_only=True

#chatbot 101 your name
chatbot101 = ChatBot(
    "101",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q1n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "sorry i didn't get you. Please tell me your english name."
        },
        {
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'nice to meet you',
            'output_text': 'sorry i did not get you. Please tell me your english name.'
        },
        {
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'i am fine',
            'output_text': 'sorry i did not get you. Please tell me your english name.'
        },
    ],
)
chatbot101.read_only=True

#chatbot 102 how are you
chatbot102 = ChatBot(
    "102",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q2n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you.How are you?"
        }
    ],
)
chatbot102.read_only=True

#chatbot 103 weather
chatbot103 = ChatBot(
    "103",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q3n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What is the weather like today?"
        },
    ],
)
chatbot103.read_only=True

#chatbot 104 ready?
chatbot104 = ChatBot(
    "104",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q4n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. Are you ready for English class?"
        }
    ],
)
chatbot104.read_only=True

#chatbot 105 what time get up
chatbot105 = ChatBot(
    "105",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q5n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What time do you get up?"
        },
    ],
)
chatbot105.read_only=True

#chatbot 106 what time breakfast
chatbot106 = ChatBot(
    "106",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q6n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What time do you have your breakfast?"
        },
    ],
)
chatbot106.read_only=True

#chatbot 107 what time lunnch
chatbot107 = ChatBot(
    "107",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q7n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What time do you have your lunch?"
        },
    ],
)
chatbot107.read_only=True

#chatbot 108 what time dinner
chatbot108 = ChatBot(
    "108",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q8",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.7, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What time do you have your dinner?"
        },
    ],
)
chatbot108.read_only=True

#chatbot 109 what time go to bed
chatbot109 = ChatBot(
    "109",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q9",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.5, #0.6 originally 0.75 not bad
            'default_response': "Sorry i didn't get you. What time do you go to bed every night?"
        },
    ],
)
chatbot109.read_only=True

#chatbot 110 favorite day
chatbot110 = ChatBot(
    "110",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q10",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.65, #0.6 originally 0.75 not bad
                'default_response': "Sorry i didn't get you. What is your favorite day of the week?"
        },
    ],
)
chatbot110.read_only=True

#chatbot 111
chatbot111 = ChatBot(
    "111",
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",  # 使用mongo存储数据
    database="Q11n",
    database_uri="mongodb://127.0.0.1:27017/",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            #"statement_comparison_function": "chatterbot.  ccomparisons.JaccardSimilarity",
            #"response_selection_method": "chatterbot.response_selection.get_first_response"
        },
        {
            'import_path': 'chatterbot.logic.LowConfidenceAdapter',
            'threshold': 0.1, #0.6 originally 0.75 not bad
                'default_response': "sorry i didn't get you.On which days you do not need to go to school"
        },
    ],
)
chatbot111.read_only=True


############################################################################################################


#UPLOAD_FOLDER = '/Users/champ/PycharmProjects/app'
UPLOAD_FOLDER = 'D:/PycharmProjects/test/static'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','pcm','wav'])


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#quesNum=1



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
@crossdomain(origin='*')
def upload_file():
    #quesNum from first database
    # conn = sqlite3.connect(sqlite_file)
    # c = conn.cursor()
    # c.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'. \
    #           format(coi=id_column, tn=table_name, cn=new_column1))
    # brows = c.fetchall()
    # print(brows[0][0])
    # quesNum = brows[0][0]
    # conn.commit()
    # conn.close()
    #sorNum from second database
    conn2 = sqlite3.connect(sqlite_file2)
    c2 = conn2.cursor()
    c2.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'. \
               format(coi=new_field, tn=table_name3, cn=new_field2))
    crows = c2.fetchall()
    print(crows[0][0])
    sorNum = crows[0][0]
    conn2.commit()
    conn2.close()
    if request.method == 'POST':
        file=False
        newstr = 'no'
        # print(quesNum)
        # app.logger.info("question number: " + str(quesNum))
        print(sorNum)
        app.logger.info("sorry number: " + str(sorNum))
        num = 0
        sen=["","",""]
        c801=[0,1,2]
        print(request.form['user'])
        print(request.form['sessionID'])


        #find quesnum for current user
        sessionID = request.form['sessionID']
        conn = sqlite3.connect(sqlite_file)
        c = conn.cursor()
        sqliteExe = 'SELECT (my_1st_column) FROM my_table_2 WHERE my_2nd_column=' + '"' + sessionID + '"'
        print(sqliteExe)
        c.execute(sqliteExe)
        brows = c.fetchall()
        print(brows)
        print(len(brows) == 0)
        if len(brows) == 0:
            sqliteExe2 = "INSERT INTO my_table_2 (my_1st_column, my_2nd_column) VALUES (101, " + "'" + sessionID + "')"""
            print(sqliteExe2)
            c.execute(sqliteExe2)
            quesNum=101
        if len(brows) != 0:
            print(brows[0][0])
            quesNum = brows[0][0]
        conn.commit()
        conn.close()
        # conn = sqlite3.connect(sqlite_file)
        # c = conn.cursor()
        # c.execute('SELECT ({coi}) FROM {tn} WHERE {cn}="test"'. \
        #           format(coi=id_column, tn=table_name, cn=new_column1))
        # brows = c.fetchall()
        # print(brows[0][0])
        # quesNum = brows[0][0]
        # conn.commit()
        # conn.close()
        # end finding quesnum


        print(quesNum)
        app.logger.info("question number: " + str(quesNum))


        if request.form['user'] == 'first':
            quesNum = updateDb(101, sessionID)
            newstr = 'yes'
            stringC = "initial done"
            return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})

        #return request.values
        #file = request.files['file']   #seems that don't use this files['file'] will not cause 400 probelm

        # if request.files['stringpost']:
        if request.form['user'] == 'no':
            print(request.form['user']);
            if quesNum == 700:
                newstr = 'yes'
                quesNum = updateDb(701, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 701:
                newstr = 'yes'
                quesNum = updateDb(702, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 702:
                newstr = 'yes'
                quesNum = updateDb(703, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 703:
                newstr = 'yes'
                quesNum = updateDb(704, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 704:
                newstr = 'yes'
                quesNum = updateDb(705, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 705:
                # generating clips
                audioclip1 = AudioFileClip("./static/ice1.mp3")
                audioclip2 = AudioFileClip("./static/ice2.mp3")
                audioclip3 = AudioFileClip("./static/ice3.mp3")
                audioclip4 = AudioFileClip("./static/ice4.mp3")
                audioclip5 = AudioFileClip("./static/ice5.mp3")
                clipp1 = VideoFileClip("./static/icep1.mp4")
                clipp2 = VideoFileClip("./static/icep2.mp4")
                clipp3 = VideoFileClip("./static/icep3.mp4")
                # final_clip = concatenate_videoclips([clipp1, clip11, clip12, clip13, clipp2, clip14, clip15, clipp3])
                # final_clip.write_videofile("./static/final.mp4", temp_audiofile="temp-audio.m4a",remove_temp=True, codec="libx264", audio_codec="aac")
                aclip1 = clipp1.audio
                aclip11 = audioclip1
                aclip12 = audioclip2
                aclip13 = audioclip3
                aclip2 = clipp2.audio
                aclip14 = audioclip4
                aclip15 = audioclip5
                aclip3 = clipp3.audio
                final_audio = concatenate_audioclips(
                    [aclip1, aclip11, aclip12, aclip13, aclip2, aclip14, aclip15, aclip3])
                final_audio.write_audiofile("C:/nginx-1.13.8/html/static/finalAudio.wav")
                # response
                newstr = 'yes'
                quesNum = updateDb(706, sessionID)
                stringC = "work fine"
                # print(request.values)
                print(request.form['user'])
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            if quesNum == 706:
                newstr = 'yes'
                quesNum = updateDb(707, sessionID)
                stringC = "work fine"
                return json.dumps({'status': stringC, 'new': newstr, 'quesNum': quesNum})
            # if request.values:
            #     if request.values['stringpost']:
            #         if request.values['stringpost'] == "new":

        if request.form['user'] == 'test':
            filename = "baidu.mp3"
            if quesNum == 700:
                filename="ice1.mp3"
            if quesNum == 701:
                filename="ice1.mp3"
            if quesNum == 702:
                filename="ice2.mp3"
            if quesNum == 703:
                filename="ice3.mp3"
            if quesNum == 704:
                filename="ice4.mp3"
            if quesNum == 705:
                filename="ice5.mp3"
            print("some file should be uploading")
            file = request.files['file']
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print("file is saved as mp3")
            #transform begins here
            print("begin trans from mp3 to wav:" + strftime("%Y-%m-%d %H:%M:%S", gmtime()))
            sound = AudioSegment.from_mp3("D:\\PycharmProjects\\test\\static\\baidu.mp3") #D:/PycharmProjects/test
            sound.export("D:\\PycharmProjects\\test\\static\\baidu.wav", format="wav") #D:/PycharmProjects/test
            print("end tansform:" + strftime("%Y-%m-%d %H:%M:%S", gmtime()))
            #end transform
            filesave=True
            print(app.config['UPLOAD_FOLDER'])
            app.logger.info('file is saved')
            # if filesave:
            #     print(client.asr('', 'wav', 16000, {
            #         'url': "{{ url_for('static', filename='baidu.wav') }}",
            #         'callback': 'http://xxx.com/receive',
            #     }))
            if filesave:

                Christmas = "Christmas is one of the most beautiful holidays of all time. " \
                            "On this day, many go to church, where they take part in special religious services. " \
                            "During the Christmas season, they also exchange gifts and decorate their homes " \
                            "with holly, mistletoe, and Christmas trees."
                # xmas = Christmas.split('.')
                num = 0

                if quesNum == 801:
                    app.logger.info('begin asr')
                    with urllib.request.urlopen('http://10.2.5.176:8080/webxunfei/Servlet2') as response:
                        html = response.read().decode('utf-8')
                        print(html)
                        baiduResult = html[8:-1]
                        print(baiduResult)
                        app.logger.info('end asr')
                #new add here2
                if quesNum != 801:
                    app.logger.info('begin asr')
                    conn = http.client.HTTPConnection("10.2.5.176", 8080)
                    conn.request("GET", "/webxunfei/Servlet1")
                    response = conn.getresponse()
                    print(response.status)
                    res = response.read().decode('utf-8')
                    print(len(res))
                    print(res)
                    baiduResult=res
                    app.logger.info('end asr')
                    if baiduResult=="":
                        app.logger.info('begin second asr')
                        with urllib.request.urlopen('http://10.2.5.176:8080/webxunfei/Servlet2') as response:
                            html = response.read().decode('utf-8')
                            print(html)
                            baiduResult = html[8:-1]
                            print(baiduResult)
                            app.logger.info('end second asr')
                        # conn = http.client.HTTPConnection("10.2.5.176", 8080)
                        # conn.request("GET", "/webxunfei/Servlet1")
                        # response = conn.getresponse()
                        # print(response.status)
                        # res = response.read().decode('utf-8')
                        # print(len(res))
                        # print(res)
                        # baiduResult = res
                        # app.logger.info('second end asr')

                app.logger.info("usr answer: " + baiduResult)
                inputThing = baiduResult
                inputThing2 = inputThing.split()
                # if len(inputThing2) > 7:
                #     newInput = inputThing2[0] + " " + inputThing2[1] + " " + inputThing2[2] + " " + \
                #                inputThing2[3] + " " + inputThing2[4] + " " + inputThing2[5] + " " + inputThing2[6]
                #     print(newInput)
                # else:
                #     newInput = inputThing
                newInput = inputThing

                if quesNum==1:
                    chatResponse = chatbot.get_response(newInput)
                    print(chatResponse)
                if quesNum==2:
                    chatResponse=chatbot2.get_response(newInput)
                    print(chatResponse)
                if quesNum==3:
                    chatResponse=chatbot3.get_response(newInput)
                    print(chatResponse)
                if quesNum==4:
                    chatResponse = chatbot4.get_response(newInput)
                    print(chatResponse)
                if quesNum==101:
                    chatResponse = chatbot101.get_response(newInput)
                    print(chatResponse)
                if quesNum==102:
                    chatResponse = chatbot102.get_response(newInput)
                    print(chatResponse)
                if quesNum==103:
                    chatResponse = chatbot103.get_response(newInput)
                    print(chatResponse)
                if quesNum==104:
                    chatResponse = chatbot104.get_response(newInput)
                    print(chatResponse)
                if quesNum==105:
                    chatResponse = chatbot105.get_response(newInput)
                    print(chatResponse)
                if quesNum==106:
                    chatResponse = chatbot106.get_response(newInput)
                    print(chatResponse)
                if quesNum==107:
                    chatResponse = chatbot107.get_response(newInput)
                    print(chatResponse)
                if quesNum==108:
                    chatResponse = chatbot108.get_response(newInput)
                    print(chatResponse)
                if quesNum==109:
                    chatResponse = chatbot109.get_response(newInput)
                    print(chatResponse)
                if quesNum==110:
                    chatResponse = chatbot110.get_response(newInput)
                    print(chatResponse)
                if quesNum==111:
                    chatResponse = chatbot111.get_response(newInput)
                    print(chatResponse)
                if quesNum == 700:
                    chatResponse = "movie audio added"
                    print(chatResponse)
                if quesNum==701:
                    # clip1 = VideoFileClip("./static/edit.mp4").subclip(t_start=0, t_end='00:00:03')
                    # audioclip3 = AudioFileClip("baidu.wav")
                    # clip2 = clip1.set_audio(audioclip3)
                    # clip2.write_videofile("avAudio.mp4", temp_audiofile="temp-audio.m4a", remove_temp=True, codec="libx264", audio_codec="aac")
                    chatResponse="movie audio added"
                    print(chatResponse)
                if quesNum == 702:
                    chatResponse = "movie audio added"
                    print(chatResponse)
                if quesNum == 703:
                    chatResponse = "movie audio added"
                    print(chatResponse)
                if quesNum == 704:
                    chatResponse = "movie audio added"
                    print(chatResponse)
                if quesNum == 705:
                    chatResponse = "movie audio added"
                    print(chatResponse)
                # if quesNum==801:
                #     chatResponse = "Great! now let's start the next section"

                if quesNum == 801:
                    chatResponse = ""
                    yuyin=""

                    yuyin = baiduResult.split(" ")
                    words = Christmas.split(" ")
                    lst = [words[i] == yuyin[i] for i in range(min(len(words), len(yuyin)))]
                    sen = Christmas.split(".")

                    lst0 = lst[:len(sen[0].split(" "))]
                    lst1 = lst[len(sen[0].split(" ")):len(sen[0].split(" ")) + len(sen[1].split(" ")) - 1]
                    lst2 = lst[len(sen[0].split(" ")) + len(sen[1].split(" ")) - 1:]
                    c801 = [lst0.count(False), lst1.count(False), lst2.count(False)]
                    c801.index(max(c801))
                    sen[c801.index(max(c801))]

                    # chatResponse = ""
                    # num=0



                    # glist = []
                    # f = [0, 0, 0]
                    #
                    #
                    # sen = Christmas.split('.')
                    # yuyin = baiduResult.split('.')
                    #
                    # words = Christmas.split()
                    # target = baiduResult.split()
                    #
                    # for item in target:
                    #     if item not in words:
                    #         glist.append(item)
                    #
                    # for i in range(0, len(yuyin)):
                    #     for item in glist:
                    #         if item in yuyin[i].split():
                    #             f[i] += 1
                    #
                    # num = f.index(max(f))
                    # print(f)
                    # print(num)

                    chatResponse = "You still mispronounce some words, please repeat after me" + ':' + sen[c801.index(max(c801))]
                    print(chatResponse)


                    ##########################


                if quesNum == 802:
                    chatResponse = "great!good job! We are moving on the next question." \
                              "What should we eat for Christmas? A.Roast Turkey  B.Roasted Suckling Pig  C.Apple"
                if quesNum == 803:
                    chatResponse = "a"
                stringC=""
                stringC=str(chatResponse)
                app.logger.info("AI reply: " + stringC)
                splitWords=""
                splitWords=stringC.split()
                if "Sorry" in splitWords or "sorry" in splitWords:
                    if quesNum != 1 and quesNum != 2 and quesNum != 3:
                        sorNum = sorNum + 1
                        tempSor=updateDb2(sorNum)
                        print(tempSor)
                # if "sorry" in splitWords and "you" in splitWords:
                #     sorNum=sorNum+1
                #     tempSor=updateDb2(sorNum)
                #     print(tempSor)
                # if "Sorry" in splitWords and "you" in splitWords:
                #     sorNum=sorNum+1
                #     tempSor=updateDb2(sorNum)
                #     print(tempSor)
                #test = {'test': 'Hellow!'}
                #test = {'test': chatResponse}
                #return render_template('example/encoderDecode7.html', test=test) #,test=test
                if quesNum==1:
                    if stringC == "that sounds cool":
                        newstr = 'yes'
                        quesNum = updateDb(2, sessionID)
                    if stringC == "I see. So you didn't go anywhere":
                        newstr = 'yes'
                        quesNum = updateDb(4, sessionID)
                    # if sorNum==2:
                    #     stringC == "that sounds cool"
                    #     newstr = 'yes'
                    #     quesNum = updateDb(2)
                    #     tempSor = updateDb2(0)
                if quesNum==2:
                    if stringC=="I see.  so it was your first time":
                        newstr = 'yes'
                        quesNum = updateDb(3, sessionID)
                    if stringC=="well, it is worth going there agian if it is fun":
                        newstr = 'yes'
                        quesNum = updateDb(3, sessionID)
                    # if sorNum==2:
                    #     stringC == "that sounds cool"
                    #     newstr = 'yes'
                    #     quesNum = updateDb(2)
                    #     tempSor = updateDb2(0)
                if quesNum==3:
                    if stringC=="Cool. it sounds like interesting experience":
                        newstr = 'yes'
                        quesNum = updateDb(4, sessionID)
                    if stringC=="Well. As long as you have a good time, meeting others is not that important":
                        newstr = 'yes'
                        quesNum = updateDb(4, sessionID)
                if quesNum==4:
                    if stringC=="Cool. you are a good kid":
                        newstr = 'yes'
                        quesNum = updateDb(801, sessionID)
                    if stringC=="ha. i think you should put more effort on your studies":
                        newstr = 'yes'
                        quesNum = updateDb(801, sessionID)
                    if sorNum==2:
                        stringC = "ha. i think you should put more effort on your studies"
                        newstr = 'yes'
                        quesNum = updateDb(801, sessionID)
                        tempSor = updateDb2(0)
                if quesNum==101:
                    if stringC=="You have a nice name! I like your name. Nice to meet you!":
                        newstr = 'yes'
                        quesNum = updateDb(102, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC = "You have a nice name! I like your name. Nice to meet you!"
                        newstr = 'yes'
                        quesNum = updateDb(102, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==102:
                    if stringC==" Well. That sounds great.":
                        newstr = 'yes'
                        quesNum = updateDb(103, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="Don't worry. You will be fine soon. ":
                        newstr = 'yes'
                        quesNum = updateDb(103, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC =" Well. That sounds great."
                        newstr = 'yes'
                        quesNum = updateDb(103, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==103:
                    if stringC=="Well, in my place, the weather is a bit unusual these days.I hope it becomes warm soon.":
                        newstr = 'yes'
                        quesNum = updateDb(104, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="Well, in my place, the weather is a bit unusual these days.I hope it becomes warm soon."
                        newstr = 'yes'
                        quesNum = updateDb(104, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==104:
                    if stringC==" All right. Let's begin our class.":
                        newstr = 'yes'
                        quesNum = updateDb(105, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="We should cherish time.Let's begin our class.":
                        newstr = 'yes'
                        quesNum = updateDb(105, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC =" All right. Let's begin our class."
                        newstr = 'yes'
                        quesNum = updateDb(105, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==105:
                    if stringC=="Oh. I'm not used to getting up early":
                        newstr = 'yes'
                        quesNum = updateDb(106, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="All right.  Let me correct a little mistake. You should say i get up 'at' seven a.m. not 'on'":
                        newstr = 'yes'
                        quesNum = updateDb(106, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="Oh. I'm not used to getting up early"
                        newstr = 'yes'
                        quesNum = updateDb(106, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==106:
                    if stringC=="All right.":
                        newstr = 'yes'
                        quesNum = updateDb(107, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="All right.Let me correct a little mistake.You can say i have breakfast 'at' eight a.m. not 'on' eight am":
                        newstr = 'yes'
                        quesNum = updateDb(107, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="OK.I see.":
                        newstr = 'yes'
                        quesNum = updateDb(107, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="All right."
                        newstr = 'yes'
                        quesNum = updateDb(107, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==107:
                    if stringC=="All right. Excellent.":
                        newstr = 'yes'
                        quesNum = updateDb(111, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="All right.Let me correct a little mistake.You can say i have lunch 'at' twelve p.m.":
                        newstr = 'yes'
                        quesNum = updateDb(111, sessionID)
                        sorNum = updateDb2(0)
                    if stringC=="Remember.The noon is twelve 'p.m.' You can say i have lunch at twelve p.m.":
                        newstr = 'yes'
                        quesNum = updateDb(111, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="All right. Excellent."
                        newstr = 'yes'
                        quesNum = updateDb(111, sessionID)
                        sorNum = updateDb2(0)
                if quesNum==108:
                    if stringC=="OK.":
                        newstr = 'yes'
                        quesNum = updateDb(109)
                        sorNum = updateDb2(0)
                    if stringC=="All right.however we should say that in this way.You can say i have dinner 'at' seven p.m.":
                        newstr = 'yes'
                        quesNum = updateDb(109)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="OK."
                        newstr = 'yes'
                        quesNum = updateDb(109)
                        sorNum = updateDb2(0)
                if quesNum==109:
                    if stringC=="Yes. Your answer is perfect":
                        newstr = 'yes'
                        quesNum = updateDb(110)
                        sorNum = updateDb2(0)
                    if stringC=="All right.Now we say it completely.You can say i go to bed 'at' eleven p.m.":
                        newstr = 'yes'
                        quesNum = updateDb(110)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="Yes. Your answer is perfect"
                        newstr = 'yes'
                        quesNum = updateDb(110)
                        sorNum = updateDb2(0)
                if quesNum==110:
                    if stringC=="Vey good.":
                        newstr = 'yes'
                        quesNum = updateDb(111)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="Vey good."
                        newstr = 'yes'
                        quesNum = updateDb(111)
                        sorNum = updateDb2(0)
                if quesNum==111:
                    if stringC=="Awesome. Nice.":
                        newstr = 'yes'
                        quesNum = updateDb(1, sessionID)
                        sorNum = updateDb2(0)
                    if sorNum==2:
                        stringC ="Awesome. Nice."
                        newstr = 'yes'
                        quesNum = updateDb(1, sessionID)
                        sorNum = updateDb2(0)
                if quesNum == 801:
                    if stringC == "You still mispronounce some words, please repeat after me" \
                            + ':' + sen[c801.index(max(c801))]:
                        newstr = 'yes'
                        quesNum = updateDb(802, sessionID)
                        if c801.index(max(c801))==0:
                            quesNum=8020
                        if c801.index(max(c801))==1:
                            quesNum=8021
                        if c801.index(max(c801))==2:
                            quesNum=8022

                # if quesNum == 802:
                #     if stringC =="You still mispronounce some words, please repeat after me":
                #         newstr = 'yes'
                #         quesNum = updateDb(803)

                if quesNum == 802:
                    if stringC == "great!good job! We are moving on the next question." \
                                  "What should we eat for Christmas? A.Roast Turkey  B.Roasted Suckling Pig  C.Apple":
                        newstr = 'yes'
                        quesNum = updateDb(803, sessionID)


                if quesNum == 803:
                     if stringC == "a":
                         newstr = 'yes'
                         quesNum = updateDb(700, sessionID)

                return json.dumps({'status': stringC,'new': newstr,'quesNum': quesNum})
            # return redirect(url_for('uploaded_file',
            #                          filename=filename))
    #return render_template('example/upload.html')
    #return render_template('example/encoderDecode7.html')
    return render_template('example/qianduanAISV5.html')
    #qianduan9.html

@app.route('/uploads/<filename>')
@crossdomain(origin='*')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

if __name__ == "__main__":
    handler = logging.FileHandler('flask.log', encoding='UTF-8')
    handler.setLevel(logging.DEBUG)
    logging_format = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(message)s')
    handler.setFormatter(logging_format)
    app.logger.addHandler(handler)
    app.run(host='0.0.0.0',debug=True)
    #host='0.0.0.0'
    #,debug=True
    #ssl_context='adhoc',



