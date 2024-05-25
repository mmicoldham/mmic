# from flask import Flask

# app = Flask(__name__)


# @app.route("/")
# def hello_world():
#     return "Hello, World!"


# if __name__ == "__main__":
#     app.run()


# بسم الله الرحمن الرحيم

import pandas as pd
from flask import Flask, render_template
from flask_compress import Compress
from gevent.pywsgi import WSGIServer
import string

# -*- coding: utf-8 -*-
# Import Monkey module from gevent for monkey-patching
from gevent import monkey
# Monkey-patching standart Python library for async working
monkey.patch_all()
# Import WSGI server from Gevent
# Import Compress module from Flask-Compress for compress static
# content (HTML, CSS, JS)


app = Flask(
    __name__,
    template_folder='templates',  # Name of html file folder
    static_folder='static',  # Name of directory for static files
    static_url_path='/static')
ok_chars = string.ascii_letters + string.digits

# Create Compress with default params
compress = Compress()
# Init compress for our Flask app
compress.init_app(app)





@app.route('/')  # What happens when the user visits the site
def page_2():
    # IS IT YAWMUL-JUMUAH?
    import datetime
    weekday = datetime.datetime.today().weekday()
    if weekday == 4:
        jumuah = "Jumu’ah"
    else:
        jumuah = "Dhuhr"

    # TIMESTAMP OF WHEN EACH JAMAT HAPPENS
    from datetime import datetime, timedelta

    day_of_year = datetime.now().timetuple().tm_yday  # returns 1 for January 1st
    df = pd.read_csv('/static/times-REAL.csv')
    day_of_year = day_of_year - 1

    fajr = df.loc[day_of_year, 'fajr']
    mysun = df.loc[day_of_year, 'sunrise']
    dhuhr = df.loc[day_of_year, 'dhuhr']
    asr = df.loc[day_of_year, 'asr']
    maghrib = df.loc[day_of_year, 'maghrib']
    isha = df.loc[day_of_year, 'isha']

    fajrj = df.loc[day_of_year, 'fajrj']
    dhuhrj = df.loc[day_of_year, 'dhuhrj']
    asrj = df.loc[day_of_year, 'asrj']
    maghribj = df.loc[day_of_year, 'maghribj']
    ishaj = df.loc[day_of_year, 'ishaj']
    # isha2 = df.loc[day_of_year, 'isha2']

    tomorrow = day_of_year + 1
    fajrt = df.loc[tomorrow, 'fajrj']

    # print(df)

    d = datetime.today().strftime("%b %d, %Y")
    print("Today's date:")
    print(d)

    d2 = datetime.today() + timedelta(1)
    d2 = d2.strftime("%b %d, %Y")

    def timeConversion(s):
        in_time = datetime.strptime(m2, "%I:%M %p")
        # print(in_time)
        out_time = datetime.strftime(in_time, "%H:%M:%S")
        return out_time

    m2 = " ".join(fajr.split())
    fajrb = timeConversion(m2)
    m2 = " ".join(fajrj.split())
    fajrc = timeConversion(m2)

    m2 = " ".join(mysun.split())
    mysunc = timeConversion(m2)

    m2 = " ".join(dhuhr.split())
    dhuhrb = timeConversion(m2)
    m2 = " ".join(dhuhrj.split())
    dhuhrc = timeConversion(m2)

    m2 = " ".join(asr.split())
    asrb = timeConversion(m2)
    m2 = " ".join(asrj.split())
    asrc = timeConversion(m2)

    m2 = " ".join(maghrib.split())
    maghribb = timeConversion(m2)
    m2 = " ".join(maghribj.split())
    maghribc = timeConversion(m2)

    m2 = " ".join(isha.split())
    ishab = timeConversion(m2)
    m2 = " ".join(ishaj.split())
    ishac = timeConversion(m2)

    m2 = " ".join(fajrt.split())
    fajrt = timeConversion(m2)

    # m2 = " ".join(isha2.split())
    # isha2c = timeConversion(m2)

    fajrb = d + " " + fajrb
    fajrc = d + " " + fajrc

    mysunc = d + " " + mysunc

    dhuhrb = d + " " + dhuhrb
    dhuhrc = d + " " + dhuhrc

    asrb = d + " " + asrb
    asrc = d + " " + asrc

    maghribb = d + " " + maghribb
    maghribc = d + " " + maghribc

    ishab = d + " " + ishab
    ishac = d + " " + ishac

    fajrt = d2 + " " + fajrt
    # isha2c = d2 + " " + isha2c

    # print(date, fajr, fajrj, mysun, dhuhr, dhuhrj, asr, asrj, maghrib, maghribj,
    #       isha, ishaj, jumuah, fajrc, mysunc, dhuhrc, asrc, maghribc, ishac)

    return render_template('dsv.html',
                           fajr=fajr,
                           fajrb=fajrb,
                           fajrj=fajrj,
                           fajrc=fajrc,

                           mysun=mysun,
                           mysunc=mysunc,

                           dhuhr=dhuhr,
                           dhuhrb=dhuhrb,
                           dhuhrj=dhuhrj,
                           dhuhrc=dhuhrc,

                           asr=asr,
                           asrb=asrb,
                           asrj=asrj,
                           asrc=asrc,

                           maghrib=maghrib,
                           maghribb=maghribb,
                           maghribj=maghribj,
                           maghribc=maghribc,

                           isha=isha,
                           ishab=ishab,
                           ishaj=ishaj,
                           ishac=ishac,

                           jumuah=jumuah,

                           fajrt=fajrt)


########################################################################


@app.route('/h')  # What happens when the user visits the site
def base_page():
    # IS IT YAWMUL-JUMUAH?
    import datetime
    weekday = datetime.datetime.today().weekday()
    if weekday == 4:
        jumuah = "Jumu’ah"
    else:
        jumuah = "Dhuhr"

    # TIMESTAMP OF WHEN EACH JAMAT HAPPENS
    from datetime import datetime, timedelta

    day_of_year = datetime.now().timetuple().tm_yday  # returns 1 for January 1st
    df = pd.read_csv('static/times-REAL.csv')
    day_of_year = day_of_year - 1

    fajr = df.loc[day_of_year, 'fajr']
    mysun = df.loc[day_of_year, 'sunrise']
    dhuhr = df.loc[day_of_year, 'dhuhr']
    asr = df.loc[day_of_year, 'asr']
    maghrib = df.loc[day_of_year, 'maghrib']
    isha = df.loc[day_of_year, 'isha']

    fajrj = df.loc[day_of_year, 'fajrj']
    dhuhrj = df.loc[day_of_year, 'dhuhrj']
    asrj = df.loc[day_of_year, 'asrj']
    maghribj = df.loc[day_of_year, 'maghribj']
    ishaj = df.loc[day_of_year, 'ishaj']
    # isha2 = df.loc[day_of_year, 'isha2']

    tomorrow = day_of_year + 1
    fajrt = df.loc[tomorrow, 'fajrj']

    # print(df)

    d = datetime.today().strftime("%b %d, %Y")
    print("Today's date:")
    print(d)

    d2 = datetime.today() + timedelta(1)
    d2 = d2.strftime("%b %d, %Y")

    def timeConversion(s):
        in_time = datetime.strptime(m2, "%I:%M %p")
        # print(in_time)
        out_time = datetime.strftime(in_time, "%H:%M:%S")
        return out_time

    m2 = " ".join(fajr.split())
    fajrb = timeConversion(m2)
    m2 = " ".join(fajrj.split())
    fajrc = timeConversion(m2)

    m2 = " ".join(mysun.split())
    mysunc = timeConversion(m2)

    m2 = " ".join(dhuhr.split())
    dhuhrb = timeConversion(m2)
    m2 = " ".join(dhuhrj.split())
    dhuhrc = timeConversion(m2)

    m2 = " ".join(asr.split())
    asrb = timeConversion(m2)
    m2 = " ".join(asrj.split())
    asrc = timeConversion(m2)

    m2 = " ".join(maghrib.split())
    maghribb = timeConversion(m2)
    m2 = " ".join(maghribj.split())
    maghribc = timeConversion(m2)

    m2 = " ".join(isha.split())
    ishab = timeConversion(m2)
    m2 = " ".join(ishaj.split())
    ishac = timeConversion(m2)

    m2 = " ".join(fajrt.split())
    fajrt = timeConversion(m2)

    # m2 = " ".join(isha2.split())
    # isha2c = timeConversion(m2)

    fajrb = d + " " + fajrb
    fajrc = d + " " + fajrc

    mysunc = d + " " + mysunc

    dhuhrb = d + " " + dhuhrb
    dhuhrc = d + " " + dhuhrc

    asrb = d + " " + asrb
    asrc = d + " " + asrc

    maghribb = d + " " + maghribb
    maghribc = d + " " + maghribc

    ishab = d + " " + ishab
    ishac = d + " " + ishac

    fajrt = d2 + " " + fajrt
    # isha2c = d2 + " " + isha2c

    # print(date, fajr, fajrj, mysun, dhuhr, dhuhrj, asr, asrj, maghrib, maghribj,
    #       isha, ishaj, jumuah, fajrc, mysunc, dhuhrc, asrc, maghribc, ishac)

    return render_template('base.html',
                           fajr=fajr,
                           fajrb=fajrb,
                           fajrj=fajrj,
                           fajrc=fajrc,

                           mysun=mysun,
                           mysunc=mysunc,

                           dhuhr=dhuhr,
                           dhuhrb=dhuhrb,
                           dhuhrj=dhuhrj,
                           dhuhrc=dhuhrc,

                           asr=asr,
                           asrb=asrb,
                           asrj=asrj,
                           asrc=asrc,

                           maghrib=maghrib,
                           maghribb=maghribb,
                           maghribj=maghribj,
                           maghribc=maghribc,

                           isha=isha,
                           ishab=ishab,
                           ishaj=ishaj,
                           ishac=ishac,

                           jumuah=jumuah,

                           fajrt=fajrt)


########################################################################


# @app.route('/2')
# def page_2():
#     return render_template('site_2.html')

# if __name__ == '__main__':
#     # Create WSGI server with params for Repl.it (IP 0.0.0.0, port 8080)
#     # for our Flask app
#     http_server = WSGIServer(('0.0.0.0', 8080), app)
#     # Start WSGI server
#     http_server.serve_forever()
# # old
# @app.route("/")
# def hello_world():
#     return "Hello, World!"
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
    #app.run()

