INSTALLATION:

npm install -g express

# wget "http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.9.tgz"
# tar -xzvpf mongodb-linux-x86_64-2.4.9.tgz

SETUP MONGO DB:
./install-mongo.sh
mkdir sellmeapp/data

DO A SIMPLE TEST FOR DB:
./start-mongo.sh
mongo

# mongo commands follow:
use tempsellme;

# insert one record to user collection
db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" });

# read the record
db.usercollection.find().pretty();

# add more records
newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]
db.usercollection.insert(newstuff);

# read the records
db.usercollection.find().pretty();


# MONGO SELL ME DB:
db.casesCollection.insert({ "question" : "test question" });


# schema
# insuranceSchema
{
  dest: '',
  date: '',
  adultcount: 0,
  childcount: 0
}

db.cases.insert({
  'userid': 'user_1',
  'casetype': 'insurance',
  'casetitle': 'title',
  'insurancecontent': {
    'dest': '',
    'date': '',
    'adultcount': 0,
    'childcount': 0
  }
});


db.cases.insert({
  'userid': 'user_2',
  'casetype': 'insurance',
  'casetitle': 'title 2',
  'insurancecontent': {
    'dest': '',
    'date': '',
    'adultcount': 0,
    'childcount': 0
  }
});