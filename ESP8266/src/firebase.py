import urequests

class Firebase:
  def __init__(self, firebase_url):
    self._url = firebase_url

  def authenticate(self, private_key):
    payload = {
      "token": private_key,
      "returnSecureToken": True
    }

    res = urequests.post("https://accounts.google.com/o/oauth2/auth", params={"key": pri})

    return




#  def __init__(self, key, url, path):
#    cred = credentials.Certificate(key)
#    firebase_admin.initialize_app(cred, { "databaseURL": url })
#    self._database = db.reference(path)

  def save(self, value):
    self._database.push(value)