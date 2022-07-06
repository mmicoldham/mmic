import random, string

# -*- coding: utf-8 -*-
# Import Monkey module from gevent for monkey-patching
from gevent import monkey
# Monkey-patching standart Python library for async working
monkey.patch_all()
# Import WSGI server from Gevent
from gevent.pywsgi import WSGIServer
# Import Compress module from Flask-Compress for compress static
# content (HTML, CSS, JS)
from flask_compress import Compress

from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder='templates',  # Name of html file folder
    static_folder='static'  # Name of directory for static files
)
ok_chars = string.ascii_letters + string.digits

# Create Compress with default params
compress = Compress()
# Init compress for our Flask app
compress.init_app(app)


@app.route('/')  # What happens when the user visits the site
def base_page():
    from bs4 import BeautifulSoup
    import requests
    URL = "https://mmic.org.uk"
    r = requests.get(URL)

    soup = BeautifulSoup(r.content, 'html5lib')

    file = open("mmic2.html", "w")
    file.write(soup.prettify())
    file.close

    URL2 = "https://westwoodmosque.org"
    r2 = requests.get(URL2)

    soup2 = BeautifulSoup(r2.content, 'html5lib')

    file2 = open("mmic3.html", "w")
    file2.write(soup2.prettify())
    file2.close

    import linecache
    date = linecache.getline(r"mmic2.html", 956)
    date = date.replace(" - Oldham, UK", "")

    fajr = linecache.getline(r"mmic2.html", 973)
    fajrj = linecache.getline(r"mmic2.html", 976)
    fajrj = fajrj.replace("Jama'at: ", "")
    fajrj = "4:00 AM"
  
    mysun = linecache.getline(r"mmic3.html", 674)
    mysun = mysun+" AM"
    mysun = "5:00 AM"

    zuhr = linecache.getline(r"mmic2.html", 984)
    zuhrj = linecache.getline(r"mmic2.html", 987)
    zuhrj = zuhrj.replace("Jama'at: ", "")

    asr = linecache.getline(r"mmic2.html", 995)
    asrj = linecache.getline(r"mmic2.html", 998)
    asrj = asrj.replace("Jama'at: ", "")

    maghrib = linecache.getline(r"mmic2.html", 1006)
    maghribj = linecache.getline(r"mmic2.html", 1009)
    maghribj = maghribj.replace("Jama'at: ", "")

    isha = linecache.getline(r"mmic2.html", 1017)
    ishaj = linecache.getline(r"mmic2.html", 1020)
    ishaj = ishaj.replace("Jama'at: ", "")

    import datetime
    weekday = datetime.datetime.today().weekday()
    if weekday == 4:
      jumuah = "Jumu'ah"
    else:
      jumuah = "Zuhr"

    from datetime import datetime

    d = datetime.today().strftime("%b %d, %Y")

    def timeConversion(s):
      in_time = datetime.strptime(m2, "%I:%M %p")
      #print(in_time)
      out_time = datetime.strftime(in_time, "%H:%M:%S")
      return out_time
    m2 = " ".join(fajrj.split())
    fajrc = timeConversion(m2)
    m2 = " ".join(zuhrj.split())
    zuhrc = timeConversion(m2)
    m2 = " ".join(asrj.split())
    asrc = timeConversion(m2)
    m2 = " ".join(maghribj.split())
    maghribc = timeConversion(m2)
    m2 = " ".join(ishaj.split())
    ishac = timeConversion(m2)

    fajrc = d+" "+fajrc
    zuhrc = d+" "+zuhrc
    asrc = d+" "+asrc
    maghribc = d+" "+maghribc
    ishac = d+" "+ishac

    print(ishac)
    
    return render_template('base.html',
                           date=date,
                           fajr=fajr,
                           fajrj=fajrj,
                           mysun=mysun,
                           zuhr=zuhr,
                           zuhrj=zuhrj,
                           asr=asr,
                           asrj=asrj,
                           maghrib=maghrib,
                           maghribj=maghribj,
                           isha=isha,
                           ishaj=ishaj,
                           jumuah=jumuah,
                           fajrc=fajrc,
                           zuhrc=zuhrc,
                           asrc=asrc,
                           maghribc=maghribc,
                           ishac=ishac)


@app.route('/2')
def page_2():
    rand_ammnt = random.randint(10, 100)
    random_str = ''.join(random.choice(ok_chars) for a in range(rand_ammnt))
    return render_template('site_2.html', random_str=random_str)


if __name__ == '__main__':
    # Create WSGI server with params for Repl.it (IP 0.0.0.0, port 8080)
    # for our Flask app
    http_server = WSGIServer(('0.0.0.0', 8080), app)
    # Start WSGI server
    http_server.serve_forever()
