# -*-coding:utf-8-*-
"""
@author_=LegalHigh"
@date: 2020/10/21 11:47
@email:tsz1216@sina.com
"""
import functools

from flask import Flask,request
import pymysql
import json
from MySQL.Searcher.getArticle_List import getArticle_List
from MySQL.Searcher.getArticle_Detail import getArticle_Detail
from MySQL.Searcher.getComments import getComments
from MySQL.Writer.WriteComments import WriteComment as write_comment_sql
from MySQL.Writer.ClickLike import click_Article_Like
from MySQL.Writer.Artic_Writer import Artic_Writer
from MySQL.Writer.Register_sql import Register_sql

app = Flask(__name__)

# 打开数据库连接
conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',cursorclass = pymysql.cursors.DictCursor)

# 使用cursor()方法创建一个游标对象cursor
cursor = conn.cursor()  # 游标对象用于执行查询和获取结果




@app.route('/GetArticList',methods=['GET'])
def GetArticList():
    if request.method == 'GET':
        try:
            # print("\033[1;34m GetList \033[0m")
            return getArticle_List(conn=conn)
        except Exception as e:
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])



@app.route('/GetArticle',methods=['POST'])
def GetArticle():
    if request.method == 'POST':
        try:
            artic_key=int(request.form.get("article_key"))
            # print("\033[1;34m  Article_keys:%s \033[0m"%(artic_key))

            # a='s'-5
            js=json.loads(getArticle_Detail(artic_key=artic_key))
            # print("read:",js)
            js[0]['comments']=[json.loads(getComments(artic_key=artic_key))]
            return json.dumps(js)
        except Exception as e:
            print(e)
            false_res = {
                'status': 'false',
                'Warning': str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])



@app.route('/WriteComments',methods=['POST'])
def WriteComments():
    if request.method == 'POST':
        """解析多层嵌套JSON"""
        data=json.loads([i for i in request.form.to_dict().keys()][0])
        try:
            # print("\033[1;34m WriteComments \033[0m")
            write_comment_sql(artic_key=data['artic_key'],args=data['args'])
            return json.dumps(True)
        except Exception as e:
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])



@app.route('/Like_Article',methods=['GET'])
def Like_Article():
    if request.method == 'GET':
        artic_key=int(request.args.get('artic_key'))
        code=request.args.get('code')
        # print(code)
        try:
            # print("\033[1;34m WriteComments \033[0m")

            return json.dumps(click_Article_Like(artic_keys=artic_key,code=code))

        except Exception as e:
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])


@app.route('/Artic_Post',methods=['POST'])
def Artic_Post():
    if request.method == 'POST':
        try:
            args=request.form.to_dict()
            print(args)
            Artic_Writer(conn=conn,artic_args=args)
            return json.dumps(True)
        except Exception as e:
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])



@app.route('/Register',methods=['POST'])
def Register():
    if request.method == 'POST':
        try:
            # print("\033[1;34m GetList \033[0m")
            code=request.form.to_dict()['code']
            # print(request.form.to_dict())
            userInfo =request.form.to_dict()['userInfo']
            # print("userinfo:",userInfo)
            # print("Code:",code)
            Register_sql(conn=conn, code=code, userInfo=json.loads(userInfo))
            return json.dumps(True)
        except Exception as e:
            print(e)
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])

@app.route('/',methods=['GET'])
def test():
    if request.method == 'GET':
        try:
            return json.dumps(True)
        except Exception as e:
            false_res={
                'status':'false',
                 'Warning':str(e),
            }
            return json.dumps(false_res)

    else:
        return json.dumps([])





if __name__ == '__main__':
    # func1('ddd')
    app.run(host='localhost',port=8080,debug=True)
