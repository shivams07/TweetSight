import os
from flask import Flask, request, jsonify
import tweepy
import json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import pickle
from tensorflow.compat.v1 import get_default_graph
import tensorflow.compat.v1 as tf
import text2emotion as te
import nltk 
tf.disable_v2_behavior() 

# --------------------------------------
# BASIC APP SETUP
# --------------------------------------
app = Flask(__name__, instance_relative_config=True)

# Config
app_settings = os.getenv(
    'APP_SETTINGS',
    'main.config.DevelopmentConfig'
)
app.config.from_object(app_settings)

# Extensions
from flask_cors import CORS,cross_origin
CORS(app)

# Keras stuff
global graph
graph = get_default_graph()
model = load_model('main/Sentiment_CNN_model.h5')
MAX_SEQUENCE_LENGTH = 300

# Twitter
auth = tweepy.OAuthHandler(app.config.get('CONSUMER_KEY'), app.config.get('CONSUMER_SECRET'))
auth.set_access_token(app.config.get('ACCESS_TOKEN'), app.config.get('ACCESS_TOKEN_SECRET'))
api = tweepy.API(auth,wait_on_rate_limit=True)

nltk.download('omw-1.4')

# loading tokenizer
with open('main/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def predict(text, include_neutral=True):
    # Tokenize text
    x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=MAX_SEQUENCE_LENGTH)
    # Predict
    score = model.predict([x_test])[0]
    if(score >=0.4 and score<=0.6):
        label = "Neutral"
    if(score <=0.4):
        label = "Negative"
    if(score >=0.6):
        label = "Positive"

    return {"label" : label,
        "score": float(score)} 

@app.route('/')
def index():
    return 'Hello'

@app.route('/getsentiment', methods=['GET'])
def getsentiment():
    data = {"success": False}
    # if parameters are found, echo the msg parameter 
    if (request.args != None):  
        with graph.as_default():
            data["predictions"] = predict(request.args.get("text"))
        data["success"] = True
    return jsonify(data)

@app.route('/analyzehashtag', methods=['GET'])
def analyzehashtag():
    positive = 0
    neutral = 0
    negative = 0
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        with graph.as_default():
            prediction = predict(tweet.full_text)
        if(prediction["label"] == "Positive"):
            positive += 1
        if(prediction["label"] == "Neutral"):
            neutral += 1
        if(prediction["label"] == "Negative"):
            negative += 1
        emotion=te.get_emotion(tweet.full_text)
        final_emotion = max(emotion, key=emotion.get)
    return jsonify({"positive": positive, "neutral": neutral, "negative": negative, "emotion":final_emotion});

@app.route('/gettweets', methods=['GET'])
def gettweets():
    tweets = []
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        temp = {}
        temp["text"] = tweet.full_text
        temp["username"] = tweet.user.screen_name
        with graph.as_default():
            prediction = predict(tweet.full_text)
        temp["label"] = prediction["label"]
        temp["score"] = prediction["score"]
        temp["createdon"] = tweet.created_at
        emotion=te.get_emotion(tweet.full_text)
        temp["emotion"] = max(emotion, key=emotion.get)
        tweets.append(temp)
    return jsonify({"results": tweets});

@app.route('/getusertweets', methods=['GET'])
def getusertweets():
    tweets = []
    for tweet in tweepy.Cursor(api.user_timeline,screen_name=request.args.get("text"),lang="en", tweet_mode='extended').items(50):
        temp = {}
        temp["text"] = tweet.full_text
        temp["username"] = tweet.user.screen_name
        with graph.as_default():
            prediction = predict(tweet.full_text)
        temp["label"] = prediction["label"]
        temp["createdon"] = tweet.created_at
        temp["score"] = prediction["score"]
        emotion=te.get_emotion(tweet.full_text)
        temp["emotion"] = max(emotion, key=emotion.get)
        tweets.append(temp)
    return jsonify({"results": tweets});
    
@app.route('/analyzeuserhashtag', methods=['GET'])
def analyzeuserhashtag():
    happy = 0
    angry = 0
    sad = 0
    fear=0
    suprise=0
    for tweet in tweepy.Cursor(api.user_timeline,screen_name=request.args.get("text"),lang="en", tweet_mode='extended').items(50):
        emotion=te.get_emotion(tweet.full_text)
        final_emotion = max(emotion, key=emotion.get)
        if(final_emotion == "Happy"):
            happy += 1
        if(final_emotion == "Angry"):
            angry += 1
        if(final_emotion == "Sad"):
            sad += 1
        if(final_emotion == "Fear"):
            fear += 1
        if(final_emotion == "Surprise"):
            suprise += 1
    return jsonify({"Happy": happy, "Angry": angry, "Sad": sad, "Fear":fear,"Suprise":suprise});

@app.route('/getuserdescription', methods=['GET'])
def getuserdescription():
    tweet=api.get_user(screen_name=request.args.get("text"))
    temp_use = tweet.name
    temp_des = tweet.description
    temp_url = tweet.profile_image_url
    return jsonify({"userdescription": temp_des,"username":temp_use,"userpicurl":temp_url});

@app.route('/getlocation', methods=['GET'])
def getlocation():
    tweets = []
    temp = {}
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(500):
        tweet_json=json.loads(json.dumps(tweet._json))
        if tweet_json['place'] is not None:
            i=tweet_json['place']
            j=i['country_code']
            if j in temp:
                temp[j] += 1
            else:
                temp[j] = 1
    tweets.append(temp)
    return jsonify({"results": tweets});

@app.route('/getuserlocation', methods=['GET'])
def getuserlocation():
    tweets = []
    temp = {}
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(500):
        tweet_json=json.loads(json.dumps(tweet._json))
        if tweet_json['place'] is not None:
            i=tweet_json['place']
            j=i['country_code']
            if j in temp:
                temp[j] += 1
            else:
                temp[j] = 1
    for t in temp.keys():
        location={}
        location["country"]=t
        location["count"]=temp[t]
        tweets.append(location)
    return jsonify({"results": tweets});

@app.route('/analyzeBarhashtag', methods=['GET'])
def analyzeBarhashtag():
    happy = 0
    angry = 0
    sad = 0
    fear=0
    suprise=0
    temp=[]
    BarData={}
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        emotion=te.get_emotion(tweet.full_text)
        final_emotion = max(emotion, key=emotion.get)
        if(final_emotion == "Happy"):
            happy += 1
        if(final_emotion == "Angry"):
            angry += 1
        if(final_emotion == "Sad"):
            sad += 1
        if(final_emotion == "Fear"):
            fear += 1
        if(final_emotion == "Surprise"):
            suprise += 1
    BarData["name"]="Sentimental Analysis Data"
    BarData["data"]=[happy,angry,sad,fear,suprise]
    temp.append(BarData)
    return jsonify({"results": temp});

@app.route('/analyzeEmotionhashtag', methods=['GET'])
def analyzeEmotionhashtag():
    happy = 0
    angry = 0
    sad = 0
    fear=0
    suprise=0
    for tweet in tweepy.Cursor(api.search,q=request.args.get("text") + " -filter:retweets",rpp=5,lang="en", tweet_mode='extended').items(50):
        emotion=te.get_emotion(tweet.full_text)
        final_emotion = max(emotion, key=emotion.get)
        if(final_emotion == "Happy"):
            happy += 1
        if(final_emotion == "Angry"):
            angry += 1
        if(final_emotion == "Sad"):
            sad += 1
        if(final_emotion == "Fear"):
            fear += 1
        if(final_emotion == "Surprise"):
            suprise += 1
    return jsonify({"Happy": happy, "Angry": angry, "Sad": sad, "Fear":fear,"Suprise":suprise});