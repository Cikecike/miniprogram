# -*-coding:utf-8-*-
"""
@author_    :   HP
@date       :   2020/10/21 19:29
@email      :   tsz1216@sina.com
@software   :   PyCharm
"""

import pymysql
import json

from Decorator.Loger import log


@log
def getArticle_Detail(conn=None,artic_key=None):
    """
    :param conn:Mysql Connection of DataBase
    :param artic_key: provide artic_key to get Detail of Article
    :return: Article:[
      {
        'Artic_Title':"7788",
        'Artic_content':"[本地测试内容]基于阿里云 Ubuntu 16.04.3 LTS 搭建 python+flask web 服务器",
        'Artic_summary':"[本地测试内容]1. 确认 Ubuntu 已正确安装 python 及 pip请参考《Linux Ubuntu 系统，python、pip 及virtualenv 安装》2. 通过 FileZilla 将 python+flask 工程部署于 Ubuntu 服务器3. 将工程中的启动文件 Application.py 中的 host 设置为 0.0.0.0",
      },
      ......
    ],
    """
    selfBulidLink=False
    if artic_key==None:
        return
    # 打开数据库连接
    if conn==None:
        conn = pymysql.connect(host='localhost', user='root', passwd='root', db='miniprogram',cursorclass = pymysql.cursors.DictCursor)
        selfBulidLink=True
    # 使用cursor()方法创建一个游标对象cursor
    cursor = conn.cursor()  # 游标对象用于执行查询和获取结果
    # 使用execute()方法执行SQL查询
    cursor.execute("SELECT a.artic_title,b.content,a.author,a.submit_time,c.like_sum,c.comments_num FROM article AS a,artic_content AS b,artic_info_active AS c WHERE a.artic_key=%d AND b.artic_key=%d AND c.artic_key=%d;"%(artic_key,artic_key,artic_key))
    # 使用fetchone()方法获取单条数据
    data = cursor.fetchall()
    # print('data: ', data)
    # 打印
    l=[]
    p={
        'Title': None,
        'Content': None,
        'Author': None,
        'Time': None,
        'counter':{
            'like':None,
            'comment':None,
      },
    }
    for d in data:
        # print(d)
        p['Title']=d['artic_title']
        p['Content']=d['content']
        p['Author']=d['author']
        p['Time']=str(d['submit_time'])
        p['counter']['like']=d['like_sum']
        p['counter']['comment']=d['comments_num']
        """deep copy"""
        c=p.copy()
        # l.append(p)
        l.append(c)

    # 关闭数据库连接
    # [print(i)for i in l]
    if selfBulidLink:
        conn.close()

    return json.dumps(l)


# getArticle_Detail(artic_key=3)