# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/28 23:09
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""
import pymysql
import requests
import json
from Decorator.Loger import log

def Register_sql(conn=None,code=None,userInfo=None):
    """

    :param conn: Mysql Connection of DataBase
    :param code: user code to get openid
    :param userInfo: some userinfo like{
        'nickName':"",
        'language':"",
        'country':""，
        'province':"",
        'avatarUrl':"",
        'city':"",
        "language":"",
        "gender":,##1 stand for man another stand for women
    }
    :return:
    """


    # print(code,userInfo)



    selfBulidLink = False
    if code == None:
        return
    # 打开数据库连接
    if conn == None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',cursorclass=pymysql.cursors.DictCursor)
        selfBulidLink = True


    APPID="wx9f143c9bd89988fe"
    SECRET="e17354667524350d5b825a1977b85d11"
    URL="https://api.weixin.qq.com/sns/jscode2session?appid="+APPID+"&secret="+SECRET+"&js_code="+code+"&grant_type=authorization_code"
    re=requests.get(url=URL)
    # print(URL)
    # print(json.loads(str(re.text)))
    openid=json.loads(str(re.text))['openid']
    # print(openid)



    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询

    # print(userInfo["gender"])

    sql1="SELECT * FROM user WHERE openid='%s'"%(openid)
    cursor.execute(sql1)


    if cursor.fetchall():
        print("Exits")
        return
    sql2="INSERT INTO user(openid,nickname,gender,user_img_url,language,country,province,city)VALUES('%s','%s',%d,'%s','%s','%s','%s','%s')"%(openid,userInfo['nickName'],int(userInfo['gender']),userInfo['avatarUrl'],userInfo['language'],userInfo['country'],userInfo['province'],userInfo['city'])
    # print(sql2)

    cursor.execute(sql2)
    conn.commit()

    if selfBulidLink:
        conn.close()



# Register_sql(code='013SnGFa1F3hSz0bUvHa18UxkI0SnGF2')